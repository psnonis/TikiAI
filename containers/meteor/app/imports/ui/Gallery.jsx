import React           from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Sessions        from '../api/sessions'

/*
  Session Gallery
*/

class Gallery extends React.Component {
  render() {
    const sessions = this.props.sessions.map(
      session => this.makePicture(session)
    );

    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ sessions }</ul>
      </div>
    );
  }

  makePicture(session) {
    return (
      <img alt={session._id} src={session.picture} />
    )
  }
}

export default GalleryContainer = withTracker(() => {
  return {
    sessions: Sessions.find().fetch(),
  }
})(Gallery)
