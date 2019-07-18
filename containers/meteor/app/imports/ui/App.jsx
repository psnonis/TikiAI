import { Meteor } from 'meteor/meteor'

import React      from 'react'
import Webcam     from 'react-webcam'

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

const App = () => (
  <Box>
    <Section title="Cameras">
      <Box display="flex">
        <Box column={4} paddingX={3} paddingY={3}>
          <Card>
            <Webcam name="Camera 1"/>
            <Box paddingX={3} paddingY={2}>
              <Text align="center" bold>
                {"Camera 1"}
              </Text>
            </Box>
            <Button id="camera-1" color="red" text="Monitor" onClick={monitorClicked} />
          </Card>
        </Box>
        <Box column={4} paddingX={3} paddingY={3}>
          <Card>
            <Avatar name="Camera 1" src="camera-1.jpg"/>
            <Box paddingX={3} paddingY={2}>
              <Text align="center" bold>
                {"Camera 2"}
              </Text>
            </Box>
            <Button id="camera-2" color="red" text="Monitor" onClick={monitorClicked} />
          </Card>
        </Box>
        <Box column={4} paddingX={3} paddingY={3}>
          <Card>
            <Avatar name="Camera 1" src="camera-1.jpg"/>
            <Box paddingX={3} paddingY={2}>
              <Text align="center" bold>
                {"Camera 3"}
              </Text>
            </Box>
            <Button id="camera-3" color="red" text="Monitor" onClick={monitorClicked} />
          </Card>
        </Box>
      </Box>
    </Section>

    <Section>
      <Box display="flex">
        <Box column={4} paddingX={3} paddingY={3} justifyContent="center" alignItems="baseline">
          <Spinner show={true} />
        </Box>
        <Box column={4} paddingX={3} paddingY={3} justifyContent="center" alignItems="baseline">
          <Spinner show={false} />
        </Box>
        <Box column={4} paddingX={3} paddingY={3} justifyContent="center" alignItems="baseline">
          <Spinner show={false} />
        </Box>
      </Box>
    </Section>

    <Section title="Question">
      <TextField id="question" name="question" onChange={questionChanged} placeholder="Placeholder" />
    </Section>
  </Box>
);

Meteor.callWithPromise = (method, ...params) =>
new Promise((resolve, reject) =>
{
  Meteor.call(method, ...params, (err, res) =>
  {
    if (err)
    {
      reject(err)
    }
    resolve(res)
  })
})

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
