import React            from 'react'
import Webcam           from 'react-webcam'
import { ReactMicPlus } from 'react-mic-plus'

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
} from 'gestalt'

export default class Session extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      record: false
    }
   }
 
  setRef = webcam => {
    this.webcam = webcam
  }

  capturePicture = () => {
    const picture = this.webcam.getScreenshot()
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

  render() {

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    }

    return (
      <Box>
        <Heading>Current Session</Heading>
        <Box display="flex" direction="row">
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
            <Button onClick={this.capturePicture} text="Snap" />
            <Button onClick={this.startRecording} text="Ask" color="blue"/>
            <Button onClick={this.stopRecording}  text="Stop"/>
          </Card>
          </Box>
        </Box>
      </Box>
    )
  }
}
