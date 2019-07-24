import React  from 'react'
import Webcam from 'react-webcam'

import
{
  ReactMic
} from 'react-mic'

import
{
  Avatar,
  Column,
  Box,
  Card,
  Heading,
  Spinner,
  Text,
  Pulsar,
  TextField
} from 'gestalt'

import
{
  Button
} from 'grommet'

export default class Session extends React.Component
{
  constructor(props)
  {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    
    this.state =
    {
      record   : false,
      question : 'who is this person ?'
    }

    this.videoConstraints =
    {
      width      : 1280,
      height     : 720,
      facingMode : 'user'
    }
  }
 
  setRef = (webcam) =>
  {
    this.webcam = webcam
  }

  takeSnapshot = () =>
  {
    console.log(`session > takeSnapshot`)

    const picture  = this.webcam.getScreenshot()
    const user     = Math.floor(Math.random() * Math.floor(3))

    Meteor.call('addPicture', {user : user, picture : picture}, (err, res) =>
    {
    })
  }

  getAnswers = () =>
  {
    console.log(`session > getAnswers`)

    const picture  = this.webcam.getScreenshot()
    var   question = 'who is this person ?'

    console.log('callin apiDivine')

    Meteor.call('apiDivine', { query : question, image : picture }, (err, res) =>
    {
      console.log('return apiDivine')
      console.log(res)
      console.log(err || 'No Error')
    })
  }
 
  getQuestion = (recording) =>
  {
    console.log(`session > getQuestion`)
    console.log(recording.blob)

    let reader = new FileReader()
    reader.onload = (e) =>
    {
      let audio = reader.result
      console.log(audio)
      console.log('callin apiInterpret')
  
      Meteor.call('apiInterpret', { audio : audio }, (err, res) =>
      {
        console.log('return apiInterpret')
        console.log(res || 'No Response')
        console.log(err || 'No Error')
      })
    }
    reader.readAsDataURL(recording.blob)
  }

  startAudioRecording = () =>
  {
    console.log(`session > startAudioRecording`)
    this.setState({ record : true })
  }
 
  stopAudioRecording = () =>
  {
    console.log(`session > stopAudioRecording`)
    this.setState({ record : false })
  }

  handleChange = ({ value }) =>
  {
    this.setState( { value })
  }

  render = () =>
  {

    return (
    <Box>
      <Box color="navy" shape="roundedTop">
        <Heading color="white" margin={2}>Current Session</Heading>
      </Box>
      <Box display="flex" direction="row" paddingY={2}>
        <Column span={8}>
          <Box color="blue">
            <Box maxWidth={640}>
              <Card>
                <Webcam
                  audio={false}
                  width={640}
                  height={360}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={this.videoConstraints}
                />
                <ReactMic
                  record={this.state.record}
                  className="sound-wave"
                  mimeType="audio/wav;codecs=MS_PCM"
                  onStop={this.getQuestion}
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
                <Button onClick={this.takeSnapshot} label="Snapshot"/>
                <Button onMouseDown={this.startAudioRecording}
                        onMouseUp={this.stopAudioRecording} label="Ask Question"/>
                <Button onClick={this.getAnswers} label="Get Answers" />
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
