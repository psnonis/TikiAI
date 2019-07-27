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
    gitUpdate : function (params)
    {
        console.log(`server > main > gitUpdate called : ${params}`)

        const { execSync } = require('child_process')
        const gitUp        = execSync('/final/gitUp.sh')
    },

    addPicture : function (params)
    {
        console.log(`server > main > addPicture called : ${params.user}`)

        Sessions.update({ _id : params.user }, { $set : { picture : params.picture } }, { upsert : true })
    },

    apiDivine : async function (params)
    {
        console.log('server > main > apiDivine called')
        console.log(params)

        var sample    = '../../../../../public/sample_image.jpg'
        var temporary = 'image.jpg'
        var image     = Buffer.from(params.image.split(',')[1], 'base64')

        writeFileSync(temporary, image) // save image to file

        let response  = await superagent
        .post(`${PYTHIA}/api/divine`)
        .query({question: params.query})
        .attach('image',  temporary) // attach image from file

        console.log(`server > main > apiDivine return : ${response.text}`)

        return response.body
    },

    apiInterpret : async function (params)
    {
        console.log('server > main > apiInterpret called')
        console.log(params)

        var sample    = '../../../../../public/sample_audio.wav'
        var temporary = 'audio.wav'
        var audio     = Buffer.from(params.audio.split(',')[1], 'base64')

        writeFileSync(temporary, audio) // save audio to file

        let response  = await superagent
        .post(`${INTERP}/api/interpret`)
        .attach('audio',  sample) // attach audio from file

        console.log(`server > main > apiInterpret return : ${response.text}`)

        return response.body
    }
})
