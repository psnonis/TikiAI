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

function monitor(e)
{
  console.log('monitor')
  console.log(e)

  Meteor.call('divine', {question: 'where is this place ?'}, (err, res) =>
  {
    console.log(`divine returned : ${res}`)
  })
}

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
            <Button color="red" text="Monitor" onClick={monitor} />
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
            <Button color="red" text="Monitor" onClick={monitor} />
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
            <Button color="red" text="Monitor" onClick={monitor} />
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
      <TextField onChange={() => {}} id="textfield" placeholder="Placeholder" />
    </Section>
  </Box>
);

export default App;
