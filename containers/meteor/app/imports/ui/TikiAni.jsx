import React from 'react';

import Card           from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions    from '@material-ui/core/CardActions'
import CardContent    from '@material-ui/core/CardContent'
import CardMedia      from '@material-ui/core/CardMedia'
import Button         from '@material-ui/core/Button'
import Typography     from '@material-ui/core/Typography'

import Paper          from '@material-ui/core/Paper'
import Grid           from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => (
{
  card :
  {
    maxWidth: 345,
    padding: theme.spacing(1),
  },
}))

/*
export default function TikiAni() {

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="tiki.gif"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
*/

const css = {
  top :
  {
    width      : '100%',
    marginTop  : 8,
    overflowX  : 'auto',
    background : 'white'
  },

  root :
  {
    display        : 'flex',
    flexWrap       : 'wrap',
    justifyContent : 'space-around',
    overflow       : 'hidden',
    background     : 'transparent'
  },

  list :
  {
    flexWrap   : 'nowrap',
    transform  : 'translateZ(0)',
    background : 'transparent'
  },
  title :
  {
    color : 'white',
  },

  icon :
  {
    color : 'white'
  }
}

export default function TikiAni()
{
  let answers = null
  console.log(`Tiki > ${answers}`)

  if (answers)
  {
    return <Answers answers={answers} />
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

