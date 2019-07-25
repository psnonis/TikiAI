import { Meteor } from 'meteor/meteor'

import React            from 'react'
import Session          from './Session'
import GalleryContainer from './Gallery'

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

const App = () =>
(
  <Box>
    <Box alignContent="center" justifyContent="center" maxWidth={960}>
      <Session/>
      <GalleryContainer/>
      <Button onClick={gitUpdate} text="Git Pull"/>
    </Box>
  </Box>
)

const snapshot = new ReactiveDict()
const question = new ReactiveVar()

function gitUpdate(e)
{
  console.log('Git Updating')

  Meteor.call('gitUpdate', {}, (err, res) =>
  {
    console.log(res || 'No Response')
    console.log(err || 'No Error')
  })
}

export default App
