import React          from 'react'

import Container      from '@material-ui/core/Container'
import Grid           from '@material-ui/core/Grid'
import Box            from '@material-ui/core/Box'
import Button         from '@material-ui/core/Button'
import ButtonGroup    from '@material-ui/core/ButtonGroup'
import Icon           from '@material-ui/core/Icon'
import TextField      from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

import Answers        from './Answers'

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
}

const rows = [
  { rank : 1, answer : 'A', probability : 20.0 },
  { rank : 2, answer : 'B', probability : 20.0 },
  { rank : 3, answer : 'C', probability : 20.0 },
  { rank : 4, answer : 'D', probability : 20.0 },
  { rank : 5, answer : 'E', probability : 20.0 },
]

function Tiki (props)
{
  const answers = props.answers

  console.log(`Tiki > ${answers}`)

  if (answers)
  {
    return <Answers answers={answers} />
  }
  else
  {
    return  <Grid container item justify="center" style={{background:'white'}} >
              <iframe src="circle.html" width="500" height="295" frameBorder="0"/>
            </Grid>
  }
}

export default class Auditor extends React.Component
{
  render = () =>
  {
    return (
      <Grid container style={css.root}>
        <Grid container item>
          <Grid container item direction="column" alignItems="center">
            <Grid item style={css.bag}>
               <TextField label='Question'
                         fullWidth
                         variant="filled"
                         InputLabelProps={{shrink: true,}}
                         value={this.state.question}
                         onChange={this.onChangeQuestion} />

            <Grid container item justify="center">
              <ButtonGroup variant="contained" color="primary" size="small" fullWidth>
                <Button onClick={this.getAllAnswers}>Ask Tiki!<Icon style={{marginLeft:8}}>question_answer</Icon></Button>
              </ButtonGroup>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item>
          <Tiki answers={this.state.answers} />
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

  }
 
  getAllAnswers = () => // Need to Write This Function
  {
    if (!this.state.ready)
    {
      console.log("Tiki Not Ready")
    }
    else
    {
      this.setState({ ready : false })
      console.log(`client > Auditor > getAnswers`)
   
      var   question = this.state.question
  
      console.log('client > Auditor > getAnswers : callin api_getAnswers')
  
      this.setState({ answers : null })

      Meteor.call('api_getAnswers', { query : question, image : picture }, (err, res) =>
      {
        console.log('client > Auditor > getAnswers : return api_getAnswers')
        console.log(res)
        console.log(err || 'No Error')

        this.setState({ answers : res.image })
        this.setState({ ready : true })
      })
    }
  }

  onChangeQuestion = (e) =>
  {
    console.log(`client > Auditor > onChangeQuestion : ${e.target.value}`)
    this.setState({ question : e.target.value })
  }
}
