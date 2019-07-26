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

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => (
{
  root:
  {
    flexGrow: 1,
  },
  menuButton:
  {
    marginRight: theme.spacing(2),
  },
  title:
  {
    flexGrow: 1,
  },
}))

export default function NaviBar()
{
  const cls = useStyles()

  return (
    <Grid className={cls.root}>
      <AppBar position="static">
      <Toolbar>
          <IconButton edge="start" className={cls.menuButton} color="inherit" aria-label="menu"><MenuIcon /></IconButton>
          <Typography variant="h6" className={cls.title}>Greetings, how can Tiki help you ?</Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit" onClick={gitUpdate}>Git Update</Button>
      </Toolbar>
      </AppBar>
    </Grid>
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
