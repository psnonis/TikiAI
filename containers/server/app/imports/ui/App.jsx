import React from 'react';

import 'gestalt/dist/gestalt.css';

// npm i gestalt
// npm i antd

import {
    Avatar,
    Box,
    Button,
    Card,
    Heading,
    Link,
    Text,
    TextField
} from "gestalt";

const Section = ({ children, title }) => (
    <Box padding={2}>
        <Box marginBottom={1}>
            <Heading size="xs">{title}</Heading>
        </Box>
        {children}
    </Box>
);

console.log('App')

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
                        <Button color="red" text="Monitor" />
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
                        <Button color="red" text="Monitor" />
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
                        <Button color="red" text="Monitor" />
                    </Card>
                </Box>
            </Box>
        </Section>

        <Section title="Question">
            <TextField onChange={() => {}} id="textfield" placeholder="Placeholder" />
        </Section>
    </Box>
);

export default App;
