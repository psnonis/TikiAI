import { Meteor } from 'meteor/meteor'

console.log('server > main')

Meteor.startup(() =>
{
})

function dataURItoBlob(dataURI)
{
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1])
  else
    byteString = unescape(dataURI.split(',')[1])

  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var byteBuffer = new Uint8Array(byteString.length)
  for (var i = 0; i < byteString.length; i++)
  {
    byteBuffer[i] = byteString.charCodeAt(i)
  }

  console.log(mimeString)

  return new Blob([byteBuffer], {type: mimeString})
}

import superagent from 'superagent'
import { writeFileSync } from 'fs'

const PYTHIA = 'http://158.85.220.245:5000' // 'http://localhost:5000'

Meteor.methods(
{
    apiDivine : async function (params)
    {
        console.log('server > main > apiDivine called')

        console.log(params)
        console.log(params.snapshot.split(',')[1])

        var question = params.question
        var snapshot = Buffer.from(params.snapshot.split(',')[1], 'base64')

        writeFileSync('snapshot.jpg', snapshot)

        console.log(snapshot)

        let response  = await superagent
        .post(`${PYTHIA}/api/divine`)
        .query({question: question})
        .attach('image',  'snapshot.jpg')

        console.log(`divine return : ${response.text}`)

        return response.body
    }
})
