import React           from 'react'

import Webcam          from 'react-webcam'
import { ReactMic }    from 'react-mic-plus'

import Container       from '@material-ui/core/Container'
import Paper           from '@material-ui/core/Paper'
import Grid            from '@material-ui/core/Grid'
import Box             from '@material-ui/core/Box'

import QuizBox         from './QuizBox'

import { makeStyles  } from '@material-ui/core/styles'
import { primary,
         secondary   } from './Themes'

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
  roo :
  {
    padding    : 0,
//  marginTop  : 8,
    background : 'transparent',
  },

  pac :
  {
    display    : 'flex',
    width      : '100%',
    marginTop  : 8,
    alignItems : 'center',
    background : 'magenta',
  },

  cam :
  {
    display      : 'flex',
    background   : 'black',
    width        : '100%',
    borderRadius : 4
  },

  pam :
  {
    display    : 'flex',
    width      : '100%',
    marginTop  : 8,
    alignItems : 'center',
    background : 'magenta',

/*  width      : '100%',
    marginTop  : 8,
    overflowX  : 'auto',
    background : 'magenta'
*/    
  },

  mic :
  {
    display      : 'block',
    width        : '100%',
    background   : primary,
    borderRadius : 4
  },

  box :
  {
    marginTop   : 8,
  }
}

export default class Capture extends React.Component
{
  render = () =>
  {
    console.log(`client > Capture > render`)

    return (
      <Container style={css.roo}>
        <Paper style={css.pac}>
          <Webcam style={css.cam}
                  audio={false}
                  height={202}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={this.state.vidCon} />
        </Paper>
        <Paper style={css.pam}>
          <ReactMic style={css.mic}
                    className="mic"
                    record={this.state.record}
                    onStop={this.getInterpretation}
                    nonstop={false}
                    duration={5}
                    backgroundColor={primary}
                    strokeColor={'white'} />
        </Paper>
        <QuizBox style={css.box}
                  context={this.props.context}
                  question={this.state.question}
                  onTypeText={this.onTypeText}
                  onClickAsk={this.onClickAsk}
                  onClickCam={this.onClickCam}
                  onClickMic={this.onClickMic} />
      </Container>
    )
  }

  constructor (props)
  {
    super(props)

    this.getAnswers_prime  = this.getAnswers_prime.bind(this)
    this.getInterpretation = this.getInterpretation.bind(this)

    this.onClickAsk        = this.onClickAsk.bind(this)
    this.onClickCam        = this.onClickCam.bind(this)
    this.onClickMic        = this.onClickMic.bind(this)        

    this.ready = true
    this.state = 
    {
      question : 'What objects are there ?',
      record   : false,
      vidCon   :
      {
        facingMode : 'environment',
        height     : 240,
        width      : 360,
      }
    }
  }
 
  setRef = (webcam) =>
  {
    this.webcam = webcam
  }

  getAnswers_prime = () =>
  {
    if (!this.ready)
    {
      console.log(`client > Capture > getAnswers : Not Ready`)
    }
    else
    {
      this.ready = false

      console.log(`client > Capture > getAnswers`)

      const picture  = this.webcam.getScreenshot()
      var   question = this.state.question

      console.log('client > Capture > getAnswers : callin api_getAnswers_prime')
  
      Session.set(  'FIRST', false)
      Session.set('RESULTS',  null)

      Meteor.call('api_getAnswers_prime', { query : question, image : picture }, (err, res) =>
      {
        console.log('client > Capture > getAnswers : return api_getAnswers_prime')

        if (err) console.log(`ERR => ${err}`)
      //if (res) console.log(`RES => ${res}`)

        Session.set('RESULTS', res ? res.image : null)

        this.ready = true
      })
    }
  }

  getInterpretation = (recording) =>
  {
    if (!this.ready)
    {
      console.log(`client > Capture > getInterpretation : Not Ready`)
    }
    else
    {
      this.ready = false

      console.log(`client > Capture > getInterpretation`)
      console.log(recording.blob)
  
      this.setState({ question : 'Interpreting Question, Please Wait...' })
  
      let reader = new FileReader()
  
      reader.onload = (e) =>
      {
        let audio = reader.result
      //console.log(audio)
  
        console.log('client > Capture > getInterpretation : callin api_getInterpretation')
    
        Meteor.call('api_getInterpretation', { audio : audio }, (err, res) =>
        {
          console.log('client > Capture > getInterpretation : return api_getInterpretation')
  
          if (err) console.log(`ERR => ${err}`)
        //if (res) console.log(`RES => ${res}`)
  
          if (res && res.audio)
          {
            this.setState({ question : res.audio.interpretation })
          }
          else
          {
            this.setState({ question : 'Something Went Wrong, Try Again...' })
          }

          this.ready = true
        })
      }

      reader.readAsDataURL(recording.blob)
    }
  }

  onClickAsk = (e) =>
  {
    console.log(`client > Capture > onClickAsk`)

    this.getAnswers_prime()
  }

  onClickCam = (e) =>
  {
    console.log(`client > Capture > onClickCam`)

    var vidCon        = this.state.vidCon
    vidCon.facingMode = {'user' : 'environment', 'environment' : 'user'}[vidCon.facingMode]

    this.setState({ vidCon : vidCon })
  }

  onClickMic = (e) =>
  {
    console.log(`client > Capture > onClickMic`)

    this.setState({ record : !this.state.record })
  }

  onTypeText = (e) =>
  {
    console.log(`client > Capture > onTypeText`)

    this.setState({ question : e.target.value })
  }
}
