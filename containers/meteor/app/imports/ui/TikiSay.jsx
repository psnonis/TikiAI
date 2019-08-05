import React           from 'react'
import Say, { SayButton }             from 'react-say'


import Card            from '@material-ui/core/Card'
import CardActionArea  from '@material-ui/core/CardActionArea'
import CardActions     from '@material-ui/core/CardActions'
import CardContent     from '@material-ui/core/CardContent'
import CardMedia       from '@material-ui/core/CardMedia'
import Button          from '@material-ui/core/Button'
import Typography      from '@material-ui/core/Typography'

import Paper           from '@material-ui/core/Paper'
import Grid            from '@material-ui/core/Grid'

import Table          from '@material-ui/core/Table'
import TableBody      from '@material-ui/core/TableBody'
import TableCell      from '@material-ui/core/TableCell'
import TableHead      from '@material-ui/core/TableHead'
import TableRow       from '@material-ui/core/TableRow'

import { Session     } from 'meteor/session'
import { makeStyles  } from '@material-ui/core/styles'
import { withTracker } from 'meteor/react-meteor-data'

const useStyles = makeStyles(theme => (
{
  card :
  {
    maxWidth: 345,
    padding: theme.spacing(1),
  },
}))

const fake = [
  { rank : 1, answer : 'A', probability : 20.0 },
  { rank : 2, answer : 'B', probability : 20.0 },
  { rank : 3, answer : 'C', probability : 20.0 },
  { rank : 4, answer : 'D', probability : 20.0 },
  { rank : 5, answer : 'E', probability : 20.0 },
]

const css =
{
  roo :
  {
    width           : '100%',
    marginTop       : 8,
    backgroundColor : 'beige'
  },

  tab :
  {
  },

  gif :
  {
  },
}

class TikiSayComponent extends React.Component
{
  constructor(props)
  {
    super(props)

    console.log(`client > TikiSay > constr : ${this.props.context.hello}`)

    this.onSay = this.onSay.bind(this)
    this.state = 
    {
      speak : ''
    }
  }

  onSay = () =>
  {
    if (this.state.speak)
    {
      console.log(`client > TikiSay > onSay : clearing`)
      this.setState({ speak : '' })
    }
    else
    {
      console.log(`client > TikiSay > onSay : setting hello world`)
      this.setState({ speak : 'hello world' })
    }
    
  }

  render = () =>
  {
    console.log(`client > TikiSay > render`)

  //const results = this.props.context.results // this does not work
  //const results = Session.get('RESULTS')     // this does not work without withTracker
    const results = this.props.results
    const first   = this.props.first

    console.log(`client > TikiSay > render : Answers = ${results}`)

    if (results && results.answers)
    {
      return (
        <Paper style={css.roo}>
          <Table style={css.tab}>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Answer</TableCell>
                <TableCell align="right">Probability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.answers.map(row => (
                <TableRow key={row.rank}>
                  <TableCell              >{row.rank}</TableCell>
                  <TableCell              >{row.answer}</TableCell>
                  <TableCell align="right">{`${(row.probability * 100).toFixed(2)} %`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Say speak={`tiki say ${results.answer}`} />
        </Paper>
      )
    }
    else
    {
      if (first)
      {
        return (
          <Paper style={css.roo}>
            <Grid container item justify="center" style={css.roo}>
              <iframe src="circle.html" height={261} frameBorder="0" />
            </Grid>
            <Say speak={`Welcome, how can Tiki help ?`} />
          </Paper>
        )
      }
      else
      {
        return (
          <Paper style={css.roo}>
            <Grid container item justify="center" style={css.roo}>
              <img style={css.gif} src="tiki.gif" height={261} />
            </Grid>
            <Say speak={`tiki ask`} />
          </Paper>
        )
      }
    }
  }
}

export default TikiSay = withTracker(() =>
{
  let results = Session.get('RESULTS')
  let first   = Session.get('FIRST'  )
  
  console.log(`client > TikiSay > trackr : RESULTS = ${results}, FIRST = ${first}`)

  return { results : results, first : first }

})(TikiSayComponent)