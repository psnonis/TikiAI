
import { Session } from 'meteor/session'
import { Meteor  } from 'meteor/meteor'
import { render  } from 'react-dom'

import React      from 'react'
import Router     from '/imports/ui/Router'

Meteor.startup(() =>
{
  Session.set('RESULTS', null)
  Session.set('FIRST',   true)

  render(<Router />, document.getElementById('react-target'))
})
