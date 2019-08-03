import React           from 'react'
import Say             from 'react-say'


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
  top :
  {
    width      : '100%',
    marginTop  : 8,
    overflowX  : 'auto',
    background : 'magenta'
  },

  root :
  {
    display        : 'flex',
    flexWrap       : 'wrap',
    justifyContent : 'space-around',
    overflow       : 'hidden',
    background     : 'beige'
  },

  table :
  {
  },  
}

class TikiSayComponent extends React.Component
{
  constructor(props)
  {
    super(props)
    this.answers = props.answers // Initial State
    Session.set('ANSWERS', fake)
  }

  render = () =>
  {
    console.log(`client > TikiSay > render : Answers = ${JSON.stringify(this.answers)}`)

    if (this.answers)
    {
      return (
        <Paper style={css.top}>
          <Table style={css.root}>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Answer</TableCell>
                <TableCell align="right">Probability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.answers.map(row => (
                <TableRow key={row.rank}>
                  <TableCell component="th" scope="row">{row.rank}</TableCell>
                  <TableCell component="th" scope="row">{row.answer}</TableCell>
                  <TableCell align="right">{`${(row.probability * 100).toFixed(2)} %`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )
    }
    else
    {
      return (
        <Paper style={css.top}>
          <Grid container item justify="center" style={css.root}>
            <img style={{background:'white'}} src="tiki.gif" height={295} />
          </Grid>
        </Paper>
      )
    }
  }
}

export default TikiSay = withTracker(() =>
{
  let answers = Session.get('ANSWERS')
  
  console.log(`client > TikiSay > trackr : Answers = ${JSON.stringify(answers)}`)
  
  return { answers : answers } 

})(TikiSayComponent)