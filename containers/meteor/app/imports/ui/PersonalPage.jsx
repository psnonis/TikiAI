import { Meteor } from 'meteor/meteor'
import   React    from 'react'

// npm i gestalt
// npm i antd

import 'gestalt/dist/gestalt.css'
import
{
  Avatar,
  Box,
  Button,
  Card,
  Heading,
  Spinner,
  Text,
  TextField
}
from 'gestalt'

const Section = ({ children, title }) =>
(
  <Box padding={2}>
    <Box marginBottom={1}>
      <Heading size="xs">{title}</Heading>
    </Box>
    {children}
  </Box>
)

const PersonalPage = () => (
  <Box>

  </Box>
);

function monitor(e)
{
  console.log('monitor called')
  var target   = e.event.target.id
  console.log(`target is ${target}`)

  var question = document.getElementById('question')

//var question = React.findDOMNode(this.refs.question).value

//console.log(`question is ${question}`)
  console.log(this)
  var question = 'what is this place ?'

  Meteor.call('divine', {question: question}, (err, res) =>
  {
    console.log(`divine returned : ${err}, ${res}`)
  })
}

export default PersonalPage;
