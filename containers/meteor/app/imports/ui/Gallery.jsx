import React           from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Sessions    } from '/imports/api/sessions'

import 'gestalt/dist/gestalt.css'
import
{
  Avatar,
  Box,
  Button,
  Card,
  Heading,
  Masonry,
  Image,
  Spinner,
  Text,
  TextField
} from 'gestalt'

/*
  Session Gallery
*/

class Picture extends React.PureComponent
{
  render()
  {
    const { data } = this.props

    console.log('Picture.render')

    return (
      <Box padding={2} width={320}>
        <Image src={data.picture} />
      </Box>
    )
  }
}

class Gallery extends React.Component
{
  constructor(props)
  {
    super(props)

    console.log(`Gallery.constructor : ${JSON.stringify(props)}`)
  }

  _setScroll = (scroll) => {
    this._scroll = scroll
  }

  _getScroll = () => {
    return this._scroll
  }

  render()
  {
    console.log(`Gallery.render : ${this.props.sessions}`)

    return (
      <Box color="navy">
      <Heading color="white">Session Gallery</Heading>
      <div
      ref={this._setScroll}
      style={{
        height: 500,
        width: "100%",
        display: "block",
        overflow: "auto",
        flexDirection: "column"
      }}
      >
        <Masonry
          comp={Picture}
          flexible={true}
          virtualize={true}
          items={this.props.sessions}
          minCols={1}
          scrollContainer={this._getScroll}
        />
      </div>
      </Box>
    )
  }
}

export default GalleryContainer = withTracker(() => {

  var sessions = Sessions.find().fetch()

  console.log(`GalleryContainer : ${JSON.stringify(sessions)}`)

  return {
    sessions: sessions
  }
})(Gallery)
