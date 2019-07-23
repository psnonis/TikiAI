
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import React      from 'react'
import Tiki       from '/imports/ui/Tiki'

Meteor.startup(() =>
{
  render(<Tiki />, document.getElementById('react-target'))
})
