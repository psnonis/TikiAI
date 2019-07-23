import { Mongo  } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Sessions = new Mongo.Collection('sessions')

if (Meteor.isServer)
{
    Sessions.insert({ picture: 'https://t3.ftcdn.net/jpg/00/92/53/56/240_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg' })
    Sessions.insert({ picture: 'https://t3.ftcdn.net/jpg/00/92/53/56/240_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg' })
    Sessions.insert({ picture: 'https://t3.ftcdn.net/jpg/00/92/53/56/240_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg' })
}

console.log('sessions')