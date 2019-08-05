import React           from 'react'

import Container       from '@material-ui/core/Container'
import Grid            from '@material-ui/core/Grid'
import Box             from '@material-ui/core/Box'
import Button          from '@material-ui/core/Button'
import ButtonGroup     from '@material-ui/core/ButtonGroup'
import Icon            from '@material-ui/core/Icon'
import TextField       from '@material-ui/core/TextField'

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

export default class Auditor extends React.Component
{
  render = () =>
  {
    return (
      <Grid container style={css.root}>
        <Grid container item>
          <Grid container item direction="column" alignItems="center">
            <Grid item style={css.bag}>
               <TextField label='General Question with YES|NO answer'
                         fullWidth

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
        </Grid>
    )
  }

  constructor (props)
  {
    super(props)

    this.onChangeQuestion = this.onChangeQuestion.bind(this)
    this.getAllAnswers    = this.getAllAnswers.bind(this)

    this.state =
    {
      ready    : true,
      question : 'who is smiling ?'
    }
  }
 
  getAllAnswers = (e) =>
  {
    if (!this.state.ready)
    {
      console.log(`Tiki Not Ready`)
    }
    else
    {
      this.setState({ ready : false })

      console.log(`client > Auditor > getAnswers`)
   
      var   question = this.state.question
  
      console.log('client > Auditor > getAnswers : callin api_getAllAnswers')
  
      Meteor.call('api_getAllAnswers', { query : question }, (err, res) =>
      {
        console.log('client > Auditor > getAnswers : return api_getAllAnswers')
        console.log(res)
        console.log(err || 'No Error')

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
