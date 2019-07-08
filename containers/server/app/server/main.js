import { Meteor }   from 'meteor/meteor'

import superagent from 'superagent'

Meteor.startup(() =>
{
/*
  let   counter = 0
  const server  = http.createServer();
  const io      = socket_io(server);

  io.on('connection', (socket) =>
  {
    console.log('new socket client')
    socket.emit('counter', counter)
  })

  try {
    server.listen(3003)
  } catch (e) {
    console.error(e)
  }
*/  
})

Meteor.methods(
{
  'divine'(params)
  {
    console.log('divine called')

    var imagePath = '../../../../../public/camera-1.jpg'

    superagent
    .post('http://localhost:5000/api/divine')
    .query({question: params.question})
    .attach('image', imagePath)
    .end((err, res) =>
    {
      console.log(`res : ${JSON.stringify(res)}`)
      console.log(`err : ${err}`)
    })

    return 'ok'
  }
})
