import { withTracker } from 'meteor/react-meteor-data'
import { Sessions    } from '/imports/api/sessions'

import React           from 'react'

import Container       from '@material-ui/core/Container'
import Paper           from '@material-ui/core/Paper'
import Grid            from '@material-ui/core/Grid'
import GridList        from '@material-ui/core/GridList'
import GridListTile    from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader   from '@material-ui/core/ListSubheader'
import IconButton      from '@material-ui/core/IconButton'
import StarBorderIcon  from '@material-ui/icons/StarBorder'

import { makeStyles }  from '@material-ui/core/styles'

const css = {
  top :
  {
    width      : '100%',
    marginTop  : 8,
    overflowX  : 'auto',
    background : 'transparent'
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

class GalleryComponent extends React.Component
{
  constructor(props)
  {
    super(props)
    this.sessions = props.sessions // Initial State
  }

  render = () =>
  {
    this.sessions = sessions

    return (
      <Paper style={css.top}>
        <Grid style={css.root}>
          <GridList style={css.list} cols={2.5}>
            {this.sessions.map(tile => (
              <GridListTile key={tile._id} style={{height:360}}>
                <img src={tile.picture} height={360}/>
                <GridListTileBar style={css.title} title={tile.answer} subtitle={tile.question} actionIcon={<IconButton style={css.icon}></IconButton>} />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Paper>
    )
  }
}

export default Gallery = withTracker(() =>
{
  const options = { sort: { createdAt: -1 }, limit : 10 };  // Reverse Order and Limit 10
  
  sessions = Sessions.find({}, options).fetch()
  
  console.log(`Gallery : ${JSON.stringify(sessions)}`)
  
  return { sessions: sessions } 

})(GalleryComponent)
