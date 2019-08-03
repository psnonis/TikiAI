import { Mongo  } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Captures = new Mongo.Collection('captures')

if (Meteor.isServer)
{
    Captures.remove({})
}
