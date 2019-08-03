import React   from 'react'

import TikiBar from './TikiBar'
import TikiSay from './TikiSay'
import Capture from './Capture'
import Answers from './Answers'
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
    <Capture id="Capture" />
    <TikiSay id="TikiSay" />
    <Gallery id="Gallery"/>
  </Container>
)

export default PrimeAsk