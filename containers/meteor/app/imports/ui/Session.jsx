import React          from 'react'

import Webcam         from 'react-webcam'
import { ReactMic }   from 'react-mic'

import Container      from '@material-ui/core/Container'
import Grid           from '@material-ui/core/Grid'
import Box            from '@material-ui/core/Box'
import Button         from '@material-ui/core/Button'
import ButtonGroup    from '@material-ui/core/ButtonGroup'
import Icon           from '@material-ui/core/Icon'
import TextField      from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

import Answers        from './Answers'

const useStyles = makeStyles(theme => (
{
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}))

const css =
{
  
}

export default class Session extends React.Component
{
  render = () =>
  {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item xs={12}>
              <Webcam audio={false}
                      width={640}
                      height={360}
                      ref={this.setRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={this.videoConstraints} />
              <ReactMic record={this.state.record}
                        className="sound-wave"
                        mimeType="audio/wav;codecs=MS_PCM"
                        onStop={this.getQuestion}
                        nonstop={true}
                        duration={5} />
              <TextField label="Question"
                         style={{ margin: 8 }}
                         placeholder="what is happening ?"
                         helperText="Question to Ask Tiki"
                         fullWidth
                         margin="normal"
                         variant="filled"
                         InputLabelProps={{shrink: true,}} />

            <Grid container justify="center">
              <ButtonGroup variant="contained" color="secondary" size="large" fullWidth>
                <Button onClick={this.takeSnapshot}>Take Snapshot<Icon style={{marginLeft:8}}>camera_alt</Icon></Button>
                <Button onMouseDown={this.startAudioRecording}
                        onMouseUp={this.stopAudioRecording}>Ask Question<Icon style={{marginLeft:8}}>microphone</Icon></Button>
                <Button onClick={this.getAnswers}>Get Answers<Icon style={{marginLeft:8}}>question_answer</Icon></Button>
              </ButtonGroup>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={1} direction="column" alignItems="center">
            <img src="tiki.gif" height={360} />
            <Answers/>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  constructor(props)
  {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    
    this.state =
    {
      record   : false,
      question : 'what is happening ?'
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

}
