import { Meteor } from 'meteor/meteor'

import React      from 'react'
import Session    from './Session'
import GalleryContainer    from './Gallery'

import 'gestalt/dist/gestalt.css'
import
{
  Avatar,
  Box,
  Button,
  Card,
  Heading,
  Spinner,
  Container,
  Text,
  TextField
} from 'gestalt'

const Section = ({ children, title }) =>
(
  <Box padding={2}>
    <Box marginBottom={1}>
      <Heading size="xs">{title}</Heading>
    </Box>
    {children}
  </Box>
)

const App = () =>
(
  <Box>
    <Box alignContent="center" justifyContent="center" maxWidth={960}>
      <Session/>
      <GalleryContainer/>
    </Box>
  </Box>
)

const snapshot = new ReactiveDict()
const question = new ReactiveVar()

function callDivine(e)
{
  var snapshot = ''
  var question = ''

  Meteor.call('divine', {question: question, snapshot: snapshot}, (err, res) =>
  {
    console.log(res)
  })
}

function questionChanged(event)
{
  console.log(`questionChanged : ${event.value}`)
//Session.set('QUESTION', event.value)
  console.log(event)
}

function monitorClicked(e)
{
  console.log(`monitorClicked : ${event}`)
  console.log(event)
}

export default App
