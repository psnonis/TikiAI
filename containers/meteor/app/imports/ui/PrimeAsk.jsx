import React     from 'react'

import TikiBar   from './TikiBar'
import TikiSay   from './TikiSay'
import Capture   from './Capture'
import Gallery   from './Gallery'

import Container from '@material-ui/core/Container'

const styling =
{
  roo :
  {
    padding : 0
  }
}

const context =
{
}

const PrimeAsk = () =>
(
  <Container   id="AskRoot"   style={styling.roo}>
      <TikiBar id="TikiBar" context={context}/>
      <Capture id="Capture" context={context}/>
      <TikiSay id="TikiSay" context={context}/>
      <Gallery id="Gallery" context={context}/>
  </Container>
)

export default PrimeAsk
