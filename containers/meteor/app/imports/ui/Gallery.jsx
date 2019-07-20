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

const img = 'http://www.cartoondistrict.com/wp-content/uploads/2017/03/Cute-Girl-Cartoon-Characters.jpg'

const tos = (o) => JSON.stringify(o)

class Picture extends React.PureComponent
{
  render()
  {
    const { data } = this.props

    return (

      <Box
      margin={2}
      padding={2}
      color="navy"
      width={640}
      height={480}
      >
        <Image
          src={data.picture}
          alt="picture"
          naturalWidth={640}
          naturalHeight={480}          
        />
      </Box>
    )
  }
}

class Gallery extends React.Component
{
  constructor(props)
  {
    super(props)

    this.makePicture = this.makePicture.bind(this)
    this.loadGallery = this.loadGallery.bind(this)
    this.state       =
    {
      sessions : props.sessions,
      pictures : props.pictures
    }

    console.log(`Gallery.constructor : ${tos(props)}`)
  }

  _setScroll = (scroll) => {
    this._scroll = scroll
  }

  _getScroll = () => {
    return this._scroll
  }

  render()
  {
    const sessions = this.props.sessions.map(
      session => this.makePicture(session)
    )

    console.log(`Gallery.render : ${sessions}`)

    return (
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
        <Heading>Session Gallery</Heading>
        <Masonry
          comp={Picture}
          flexible={true}
          virtualize={true}
          items={this.state.pictures}
          minCols={1}
          scrollContainer={this._getScroll}
        />
      </div>
    )
  }

  onClick()
  {
    console.log('Gallery.onClick')
  }

  loadGallery()
  {
    console.log(`Gallery.loadGallery`)

    const items = [
                    { _id : 1, picture : img },
                    { _id : 2, picture : img },
                    { _id : 3, picture : img },
                  ]

    this.setState({items})
  }

  makePicture(data, itemIdx, isMeasuring)
  {
    
    console.log(`Gallery.makePicture : ${itemIdx} : ${tos(data)}`)

    return (
        <Image
          src={img}
          alt="picture"
          naturalWidth={320}
          naturalHeight={180}
        />

    )
  }
}

export default GalleryContainer = withTracker(() => {

  const pictures = [
    { _id : 1, picture : img },
    { _id : 2, picture : img },
    { _id : 3, picture : img },
  ]

  var sessions = Sessions.find().fetch()

  console.log(`GalleryContainer : ${JSON.stringify(sessions)}`)

  return {
    sessions: sessions,
    pictures: pictures
  }
})(Gallery)
