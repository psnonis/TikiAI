import { Meteor        } from 'meteor/meteor'
import { writeFileSync } from 'fs'
import { readFileSync } from 'fs'
import   superagent      from 'superagent'
import { Sessions      } from '/imports/api/sessions'

const PYTHIA = 'http://158.175.150.58:5000'
const INTERP = 'http://158.175.150.58:5001'

console.log('server > main')

Meteor.startup(() =>
{
})

Meteor.methods(
{
    api_getAnswers : async function (params)
    {
        console.log('server > main > api_getAnswers called')
        console.log(params)

        var sample    = '../../../../../public/sample_image.jpg'
        var temporary = 'image.jpg'
        var image     = Buffer.from(params.image.split(',')[1], 'base64')

        writeFileSync(temporary, image) // save image to file

        let response  = await superagent
        .post(`${PYTHIA}/api/getAnswers`)
        .query({question: params.query})
        .attach('image',  temporary) // attach image from file

        console.log(`server > main > api_getAnswers return : ${response.text}`)

        Sessions.update({ _id : params.user }, { $set : {question : params.query, answer : response.body.image.answer, picture : params.image, createdAt : + new Date()} }, { upsert : true })

        return response.body
    },

    api_getAllAnswers : async function (params) // Need To Write This Function
    {
        console.log('server > main > api_getAllAnswers called')
        console.log(params)

        var sample    = '../../../../../public/sample_image.jpg'
        var temporary = 'image.jpg'
        var image     = Buffer.from(params.image.split(',')[1], 'base64')

        writeFileSync(temporary, image) // save image to file

        let response  = await superagent
        .post(`${PYTHIA}/api/getAnswers`)
        .query({question: params.query})
        .attach('image',  temporary) // attach image from file

        console.log(`server > main > api_getAnswers return : ${response.text}`)

        Sessions.update({ _id : params.user }, { $set : {question : params.query, answer : response.body.image.answer, picture : params.image, createdAt : + new Date()} }, { upsert : true })

        return response.body
    },

    api_askQuestion : async function (params)
    {
        console.log('server > main > api_askQuestion called')
        console.log(params)

        var sample    = '../../../../../public/sample_audio.wav'  // The Birch Canoe
        var temporary = 'audio.wav'
               
        let stringLength = params.audio.length
        let newString = params.audio.slice(22, stringLength) // Remove 'data:audio/wav;base64,'
        var audio     = Buffer.from(newString, 'base64') // CONFIRMED WORKING

        writeFileSync(temporary, audio) // save audio to file

        var sampleAudio = readFileSync(sample)
        console.log(sampleAudio)

        var writtenAudio = readFileSync(temporary)
        console.log(writtenAudio)

        // let response  = await superagent  // Test Works Correctly for sample_audio.wav
        // .post(`${INTERP}/api/interpret`)
        // .attach('audio',  sample)

        let response = await superagent  // Works Correctly
        .post(`${INTERP}/api/interpret`)
        .attach('audio',  temporary)
      
        console.log(`server > main > api_askQuestion return : ${response.text}`)

        return response.body
    }
})
