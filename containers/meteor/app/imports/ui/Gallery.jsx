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

    console.log('Picture.render')

    return (
      <Box padding={2} width={320}>
        <Image src={data.picture} />
      </Box>
    )


    return (

      <Box
      margin={2}
      padding={2}
      color="navy"
      width={640}
      height={480}
      maxWidth={640}
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

  const pictures = [
/*  { _id : 1, picture : img },
    { _id : 2, picture : img },
    { _id : 3, picture : img },*/
  ]

  var sessions = Sessions.find().fetch()

  console.log(`GalleryContainer : ${JSON.stringify(sessions)}`)

  return {
    sessions: sessions,
    pictures: pictures
  }
})(Gallery)
