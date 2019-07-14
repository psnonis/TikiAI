import { Meteor } from 'meteor/meteor'
import superagent from 'superagent'

const PYTHIA = 'http://localhost:5000'

Meteor.methods(
{
    divine: function (params)
    {
        console.log('divine called')

        var imagePath = '../../../../../public/camera-1.jpg'

        const req = superagent
        .post(`${PYTHIA}/api/divine`)
        .query({question: params.question})
        .attach('image', imagePath)

        const res = Meteor.wrapAsync(req.end, req)()

        return res
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