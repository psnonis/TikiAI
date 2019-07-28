import { Meteor }     from 'meteor/meteor'

import React          from 'react'

import Container      from '@material-ui/core/Container'
import Grid           from '@material-ui/core/Grid'
import Box            from '@material-ui/core/Box'
import AppBar         from '@material-ui/core/AppBar'
import Toolbar        from '@material-ui/core/Toolbar'
import Typography     from '@material-ui/core/Typography'
import Button         from '@material-ui/core/Button'
import IconButton     from '@material-ui/core/IconButton'
import MenuIcon       from '@material-ui/icons/Menu'
import Snackbar       from '@material-ui/core/Snackbar'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => (
{
  root :
  {
    flexGrow : 1,
  },
  menu :
  {
    marginRight : theme.spacing(2),
  },
  title :
  {
    flexGrow : 1,
  },
  snackbar :
  {
    [theme.breakpoints.down('xs')] :
    {
      bottom: 90,
    }
  }
}))

export default function TikiBar()
{
  const cls = useStyles()

  return (
    <React.Fragment>
    <Grid id="TikiBarRoot" className={cls.root}>
      <AppBar position="static">
      <Toolbar>
          <IconButton edge="start" className={cls.menu} color="inherit" aria-label="menu"><MenuIcon /></IconButton>
          <Typography variant="h6" className={cls.title}>TIKI.ai</Typography>
      </Toolbar>
      </AppBar>
    </Grid>
    </React.Fragment>
  )
}

function gitUpdate(e)
{
  console.log('Git Updating')

/*
  Meteor.call('gitUpdate', {}, (err, res) =>
  {
    console.log(res || 'No Response')
    console.log(err || 'No Error')
  })
*/
}
