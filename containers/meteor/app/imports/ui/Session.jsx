import React  from 'react'
import Webcam from 'react-webcam'

import
{
  ReactMicPlus
} from 'react-mic-plus'

import
{
  Avatar,
  Column,
  Box,
  Button,
  Card,
  Heading,
  Spinner,
  Text,
  Pulsar,
  TextField
} from 'gestalt'

export default class Session extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      record: false,
      question: 'who is this person ?'
    }
  }
 
  setRef = webcam => {
    this.webcam = webcam
  }

  capturePicture = () => {

    const picture  = this.webcam.getScreenshot()
    var   question = 'who is this person ?'

    console.log('callin apiDivine')

    Meteor.call('apiDivine', {question: question, snapshot: picture}, (err, res) =>
    {
      console.log('Returned')
      console.log(res)
      console.log(err)
    })
  }

  startRecording = () => {
    this.setState({
      record: true
    })
  }
 
  stopRecording = () => {
    this.setState({
      record: false
    })
  }
 
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }

  handleChange({ value })
  {
    this.setState( { value })
  }

  triggerTesting = () =>
  {
    const picture  = this.webcam.getScreenshot()
    const user     = Math.floor(Math.random() * Math.floor(3))

    Meteor.call('addPicture', {user : user, picture : picture}, (err, res) =>
    {
    })
  }

  render() {

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    }

    return (
    <Box>
      <Box color="navy" shape="roundedTop">
        <Heading color="white" margin={2}>Current Session</Heading>
      </Box>
      <Box display="flex" direction="row" paddingY={2}>
        <Column span={8}>
          <Box color="navy">
            <Box maxWidth={640}>
              <Card>
                <Webcam
                  audio={false}
                  width={640}
                  height={360}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
                <ReactMicPlus
                  record={this.state.record}
                  className="sound-wave"
                  onStop={this.onStop}
                  strokeColor="#000000"
                  backgroundColor="#FF4081"
                  nonstop={true}
                  duration={5} />
                <TextField
                  id="question"
                  onChange={this.handleChange}
                  placeholder="Question"
                  value={this.state.question}
                  type="text"
                />
                <Box display="flex" direction="row" paddingY={2}>
                <Button onClick={this.capturePicture} text="Snap" />
                <Button onClick={this.startRecording} text="Ask" color="blue"/>
                <Button onClick={this.triggerTesting} text="Trigger" color="red"/>
                </Box>
              </Card>
            </Box>
          </Box>
        </Column>
        <Column span={4}>
          <Box color="watermelon" padding={4}>
            <Pulsar />
          </Box>
        </Column>
      </Box>
    </Box>
    )
  }
}
