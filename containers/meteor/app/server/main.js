import { Meteor } from 'meteor/meteor'
import   request  from 'superagent'

const PYTHIA = 'http://localhost:5000'
const superagent = require('superagent')

Meteor.methods(
{
    divine: async function (params)
    {
        console.log('divine called')

        var imagePath = '../../../../../public/camera-1.jpg'
        var question  = 'what place is this ?'

        console.log('callin pythia')

        var response  = await request
        .post(`${PYTHIA}/api/divine`)
        .query({question: question})
        .attach('image', imagePath)

        console.log('divine return')

        return response
    }
})

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

console.log('main')