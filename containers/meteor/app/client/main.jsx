
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import React        from 'react'
import PersonalPage from '/imports/ui/PersonalPage'

Meteor.startup(() =>
{

/*
  const io   = require('socket.io-client')
  let socket = io(`http://localhost:3003`)

  socket.on('connect', () =>
  {
    console.log('Client Connected')
  })
  
  socket.on('disconnect', () =>
  {
    console.log('Client Disconnected')
  })

  socket.on('counter', (value) =>
  {
    console.log(value)
  })
*/

    render(<PersonalPage />, document.getElementById('react-target'))
})
