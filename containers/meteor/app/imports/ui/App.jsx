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

const App = () => (
  <Box>
    <Section title="Cameras">
      <Box display="flex">
        <Box column={4} paddingX={3} paddingY={3}>
          <Card>
            <Avatar name="Camera 1" src="camera-1.jpg"/>
            <Box paddingX={3} paddingY={2}>
              <Text align="center" bold>
                {"Camera 1"}
              </Text>
            </Box>
            <Button id="camera-1" color="red" text="Monitor" onClick={monitor} />
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
            <Button id="camera-2" color="red" text="Monitor" onClick={monitor} />
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
            <Button id="camera-3" color="red" text="Monitor" onClick={monitor} />
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

    <Section title="Question" ref = "questionSection">
      <TextField id="question" name="question" onChange={() => {}} placeholder="Placeholder" />
    </Section>
  </Box>
);

function monitor(e)
{
  console.log('monitor called')
  var target   = e.event.target.id
  console.log(`target is ${target}`)

//var question = React.findDOMNode(this.refs.question).value

//console.log(`question is ${question}`)
  console.log(this)
  var question = 'what is this place ?'

  Meteor.call('divine', {question: question}, (err, res) =>
  {
    console.log(`divine returned : ${err}, ${res}`)
  })
}

export default App;
