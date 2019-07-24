import { Meteor        } from 'meteor/meteor'
import { writeFileSync } from 'fs'
import   superagent      from 'superagent'
import { Sessions      } from '/imports/api/sessions'

const PYTHIA = 'http://158.85.220.245:5000' // 'http://localhost:5000'
const INTERP = 'http://158.85.220.245:5001' // 'http://localhost:5000'

console.log('server > main')

Meteor.startup(() =>
{
})

Meteor.methods(
{
    addPicture : function (params)
    {
        console.log(`server > main > addPicture called : ${params.user}`)

        Sessions.update({ _id : params.user }, { $set : { picture : params.picture } }, { upsert : true })
    },

    apiDivine : async function (params)
    {
        console.log('server > main > apiDivine called')
        console.log(params)

        var tempo = '/tmp/image.jpg'
        var image = Buffer.from(params.image.split(',')[1], 'base64')
        writeFileSync(tempo, image) // save image to file
        console.log(image)

        let response  = await superagent
        .post(`${PYTHIA}/api/divine`)
        .query({question: params.query})
        .attach('image',  tempo) // attach image from file

        console.log(`server > main > apiDivine return : ${response.text}`)

        return response.body
    },

    apiInterpret : async function (params)
    {
        console.log('server > main > apiInterpret called')
        console.log(params)

        var sampa = '../../../../../public/sample_audio.wav'
        var tempo = '/tmp/audio.wav'
        var audio = Buffer.from(params.audio.split(',')[1], 'base64')
        writeFileSync(tempo, audio) // save audio to file
        console.log(audio)

        let response  = await superagent
        .post(`${INTERP}/api/interpret`)
        .attach('audio',  sampa) // attach audio from file

        console.log(`server > main > apiInterpret return : ${response.text}`)

        return response.body
    }
})
