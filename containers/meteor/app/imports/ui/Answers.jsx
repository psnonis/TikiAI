import React          from 'react';

import Table          from '@material-ui/core/Table'
import TableBody      from '@material-ui/core/TableBody'
import TableCell      from '@material-ui/core/TableCell'
import TableHead      from '@material-ui/core/TableHead'
import TableRow       from '@material-ui/core/TableRow'
import Paper          from '@material-ui/core/Paper'

import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => (
{
  root :
  {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table :
  {
  },
}))

const rows = [
  { rank : 1, answer : 'A', probability : 20.0 },
  { rank : 2, answer : 'B', probability : 20.0 },
  { rank : 3, answer : 'C', probability : 20.0 },
  { rank : 4, answer : 'D', probability : 20.0 },
  { rank : 5, answer : 'E', probability : 20.0 },
]

export default function Answers() {
  const cls = styles()

  return (
    <Paper className={cls.root}>
      <Table className={cls.table}>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell align="right">Probability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.rank}>
              <TableCell component="th" scope="row">{row.rank}</TableCell>
              <TableCell component="th" scope="row">{row.answer}</TableCell>
              <TableCell align="right">{row.probability}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}