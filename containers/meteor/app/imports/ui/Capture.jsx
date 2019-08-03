import React          from 'react'

import Webcam         from 'react-webcam'
import { ReactMic }   from 'react-mic-plus'

import Container      from '@material-ui/core/Container'
import Grid           from '@material-ui/core/Grid'
import Box            from '@material-ui/core/Box'
import Button         from '@material-ui/core/Button'
import ButtonGroup    from '@material-ui/core/ButtonGroup'
import Icon           from '@material-ui/core/Icon'
import TextField      from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => (
{
  container :
  {
    display  : 'flex',
    flexWrap : 'wrap',
  },
  textField :
  {
    marginLeft  : theme.spacing(1),
    marginRight : theme.spacing(1),
  },
  dense :
  {
    marginTop : theme.spacing(2),
  },
  menu :
  {
    width : 200,
  },
}))

const css =
{
  root :
  {
    marginTop  : 8,
    background : '#3f51b5'
  },
  bag :
  {
    display  : 'flex',
    flexFlow : 'row wrap'
  },

  cam :
  {
    display    : 'flex',

    background : 'black',
    width      : 359,
    height     : 202,
    shrink     : true
  },
  mic :
  {
    background : 'lime',
    width      : 359,
    height     : 101,
    shrink     : true
  }
}

export default class Capture extends React.Component
{
  render = () =>
  {
    return (
      <Grid container style={css.root}>
        <Grid container item>
          <Grid container item direction="column" alignItems="center">
            <Grid item style={css.bag}>
              <Webcam style={css.cam}
                      audio={false}
                      height={202}
                      ref={this.setRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={this.videoConstraints} />
              <ReactMic style={css.mic}
                        className='mic'
                        record={this.state.record}
                        onStop={this.askQuestion}
                        nonstop={true}
                        duration={5}
                        backgroundColor={'#3f51b5'}
                        strokeColor={'white'}/>
              <TextField label='Question'
                         fullWidth
                         variant="filled"
                         InputLabelProps={{shrink: true,}}
                         value={this.state.question}
                         onChange={this.onChangeQuestion} />

            <Grid container item justify="center">
              <ButtonGroup variant="contained" color="primary" size="small" fullWidth>
                <Button onMouseDown={this.startAudioRecording}
                        onMouseUp={this.stopAudioRecording}>Microphone<Icon style={{marginLeft:8}}>microphone</Icon></Button>
                <Button onClick={this.getAnswers}>Ask Tiki!<Icon style={{marginLeft:8}}>question_answer</Icon></Button>
              </ButtonGroup>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  constructor (props)
  {
    super(props)

    this.onChangeQuestion = this.onChangeQuestion.bind(this)
    
    this.state =
    {
      record   : false,
      ready    : true,
      question : 'What objects are in the image?',
      answers  : null
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

  getAnswers = () =>
  {
    if (!this.state.ready)
    {
      console.log("Tiki Not Ready")
    }
    else
    {
      this.setState({ ready : false })
      console.log(`client > Capture > getAnswers`)
   
      const picture  = this.webcam.getScreenshot()
      var   question = this.state.question
  
      console.log('client > Capture > getAnswers : callin api_getAnswers')
  
      this.setState({ answers : null })

      Meteor.call('api_getAnswers', { query : question, image : picture }, (err, res) =>
      {
        console.log('client > Capture > getAnswers : return api_getAnswers')
        console.log(res)
        console.log(err || 'No Error')

        this.setState({ answers : res.image })
        this.setState({ ready   : true      })

        Session.set( 'ANSWERS', res.image )
      })
    }
  }
 
  askQuestion = (recording) =>
  {
    console.log(`client > Capture > askQuestion`)
    console.log(recording.blob)

    this.setState({ question : 'Interpreting Question, Please Wait...' })

    let reader = new FileReader()
    reader.onload = (e) =>
    {
      let audio = reader.result
      console.log(audio)

      console.log('client > Capture > askQuestion : callin api_askQuestion')
  
      Meteor.call('api_askQuestion', { audio : audio }, (err, res) =>
      {
        console.log('client > Capture > askQuestion : return api_askQuestion')
        console.log(res || 'No Response')
        console.log(err || 'No Error')

        if (res)
        {
          this.setState({ question : res.audio.interpretation })
        }
        else
        {
          this.setState({ question : 'Something Went Wrong, Try Again...' })
        }
      })
    }
    reader.readAsDataURL(recording.blob)
  }

  startAudioRecording = () =>
  {
    console.log(`client > Capture > startAudioRecording`)
    this.setState({ record : true })
  }
 
  stopAudioRecording = () =>
  {
    console.log(`client > Capture > stopAudioRecording`)
    this.setState({ record : false })
  }

  onChangeQuestion = (e) =>
  {
    console.log(`client > Capture > onChangeQuestion : ${e.target.value}`)
    this.setState({ question : e.target.value })
  }
}
