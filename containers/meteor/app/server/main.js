import { Meteor        } from 'meteor/meteor'
import { writeFileSync } from 'fs'
import   superagent      from 'superagent'
import { Sessions      } from '/imports/api/sessions'

const PYTHIA = 'http://158.85.220.245:5000' // 'http://localhost:5000'

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
