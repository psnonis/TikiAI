#!/usr/bin/env python3
# -*- encoding: utf-8

import requests
import re
import os
import errno
import sys

GH_API_BASE_URL           = 'https://api.github.com'
GH_REPO_CONTENTS_ENDPOINT = GH_API_BASE_URL + '/repos/{}/{}/contents'
BASE_NORMALIZE_REGEX      = re.compile(r'.*github\.com\/')

req = requests.Session()
req.headers.update({'User-Agent': 'gitUp'})

def up_f(url, path):
    print('up_f', url, path)

    res = req.get(url, stream = True)
    res.raise_for_status()

    os.makedirs(os.path.dirname(path), exist_ok = True)
    with open(path, 'wb') as out:
        for chunk in res.iter_content(chunk_size = 128):
            out.write(chunk)

def up_d(url, base, path, ref):

    print('up_d', url, base, path)

    res = req.get(os.path.join(url, path), params = { 'ref' : ref })
    res.raise_for_status()

    for item in res.json() :

        print(item['path'], item['type'])

        if  item['type'] == 'dir' : up_d(url, os.path.join(base, item['name']), item['path'], ref)
        else                      : up_f(item['download_url'], item['path'].replace(path, base))

def main():

    url   = sys.argv[1]
    base  = sys.argv[2]
    token = sys.argv[3]

    if  token:
        req.headers.update({'Authorization': 'token ' + token})

    url        = re.sub(BASE_NORMALIZE_REGEX, '', url).replace('/tree', '')
    url        = url.split('/')
    user, repo = url[:2]
    ref        = url[2]
    path       = os.path.join(*url[3:])

    url        = GH_REPO_CONTENTS_ENDPOINT.format(user, repo)

    up_d(url, base, path, ref)

if __name__ == '__main__':
    main()