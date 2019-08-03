import React   from 'react'

import TikiBar from './TikiBar'
import Session from './Session'
import Gallery from './Gallery'
import Testing from './Testing'

import Container from '@material-ui/core/Container'

const css =
{
  root :
  {
    padding : 0
  }
}

const PrimeAsk = () =>
(
  <Container id="AskRoot" style={css.root}>
    <TikiBar id="TikiBar" />
    <Session id="Session" />
    <Gallery id="Gallery"/>
  </Container>
)

export default PrimeAsk