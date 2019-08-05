import React          from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Paper          from '@material-ui/core/Paper'
import InputBase      from '@material-ui/core/InputBase'
import Divider        from '@material-ui/core/Divider'
import IconButton     from '@material-ui/core/IconButton'
import MenuIcon       from '@material-ui/icons/Menu'
import SearchIcon     from '@material-ui/icons/Search'
import DirectionsIcon from '@material-ui/icons/Directions'

const useStyles = makeStyles(
{
  root :
  {
    padding    : '2px 4px',
    display    : 'flex',
    alignItems : 'center',
    width      : 351,
  },

  input :
  {
    marginLeft : 8,
    flex       : 1,
  },

  iconButton :
  {
    padding : 10,
  },

  divider :
  {
    width  : 1,
    height : 28,
    margin : 4,
  },
})

export default function QuesBox() {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Ask a Question"
        inputProps={{ 'aria-label': 'ask a question' }}
      />
      <IconButton className={classes.iconButton} aria-label="ask">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  )
}