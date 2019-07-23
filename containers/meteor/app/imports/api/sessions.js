import { Mongo  } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Sessions = new Mongo.Collection('sessions')

if (Meteor.isServer)
{
    Sessions.remove({})
}

console.log('sessions')