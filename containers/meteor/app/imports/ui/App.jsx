import { Meteor } from 'meteor/meteor'

import React          from 'react'

import NaviBar        from './NaviBar'
import Session        from './Session'
import Gallery        from './Gallery'
import Testing        from './Testing'

import Container      from '@material-ui/core/Container'

const App = () =>
{
  return (
    <Container>
      <NaviBar/>
      <Session/>
      <Gallery/>
    </Container>
  )
}

export default App