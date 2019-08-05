import { Meteor        } from 'meteor/meteor'
import { writeFileSync,
         readFileSync  } from 'fs'
import   superagent      from 'superagent'
import { Captures      } from '/imports/api/captures'

Meteor.startup(() =>
{
    console.log('server > main > startup')
})

GetAPIEndpoint = (type, resource) =>
{
    const servers =
    [
        { _id : '158.175.150.58', pythia : true, speech : true },
    ]

    if (type == 'pythia')
    {
        var server  = servers[0]._id
        var port    = '5000'

        return `http://${server}:${port}/api/${resource}`
    }
    else
    {
        var server  = servers[0]._id
        var port    = '5001'

        return `http://${server}:${port}/api/${resource}`
    }
}

Meteor.methods(
{
    api_getAnswers_prime : async function (params)
    {
        console.log('server > main > api_getAnswers_prime called')
        console.log(params)

        if (params.image && params.query)
        {
            var uri       = GetAPIEndpoint('pythia', 'getAnswers')

            var sample    = '../../../../../public/sample_image.jpg'
            var temporary = 'image.jpg'
            var image     = Buffer.from(params.image.split(',')[1], 'base64')

            writeFileSync(temporary, image)

            let response  = await superagent.post(uri)
            .query({ question : params.query})
            .attach(  'image' , temporary)

            Captures.update({ _id : params.user }, { $set : { question : params.query, answer : response.body.image.answer, picture : params.image, createdAt : new Date() } }, { upsert : true })

            console.log(`server > main > api_getAnswers_prime return : ${response.text}`)

            return response.body
        }

        throw new Meteor.Error(501, 'Error 501 : Invalid API Params', 'Invalid API Params')
    },

    api_getAnswers_group : async function (params) // Need To Write This Function
    {
        console.log('server > main > api_getAnswers_group called')
        console.log(params)

        if (params.query)
        {
            var uri       = GetAPIEndpoint('pythia', 'getAnswers')


            console.log(`server > main > api_getAnswers_group return : ${response.text}`)

            return response.body
        }

        throw new Meteor.Error(501, 'Error 501 : Invalid API Params', 'Invalid API Params')
    },

    api_getInterpretation : async function (params)
    {
        console.log('server > main > api_askQuestion called')
        console.log(params)

        var uri       = GetAPIEndpoint('speech', 'interpret') // TODO: rename interpret to speech and getInterpretation
        var sample    = '../../../../../public/sample_audio.wav' // The Birch Canoe
        var temporary = 'audio.wav'
               
        let stringLength = params.audio.length
        let newString    = params.audio.slice(22, stringLength) // Remove 'data:audio/wav;base64,'
        var audio        = Buffer.from(newString, 'base64') // CONFIRMED WORKING

        writeFileSync(temporary, audio) // save audio to file

        var sampleAudio = readFileSync(sample)
        console.log(sampleAudio)

        var writtenAudio = readFileSync(temporary)
        console.log(writtenAudio)

        // let response  = await superagent.post(url)
        // .attach('audio',  sample)

        let response = await superagent.post(uri)
        .attach('audio',  temporary)
      
        console.log(`server > main > api_askQuestion return : ${response.text}`)

        return response.body
    }
})
