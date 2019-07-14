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

console.log('methods')