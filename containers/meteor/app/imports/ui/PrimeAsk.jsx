import React     from 'react'

import TikiBar   from './TikiBar'
import TikiSay   from './TikiSay'
import Capture   from './Capture'
import Gallery   from './Gallery'

import Container from '@material-ui/core/Container'

const styling =
{
  root :
  {
    padding : 0
  }
}

var context =
{
  first   : true,
  results : null
}

const PrimeAsk = () =>
(
  <Container   id="AskRoot"   style={styling.root}>
      <TikiBar id="TikiBar" context={context}/>
      <Capture id="Capture" context={context}/>
      <TikiSay id="TikiSay" context={context}/>
      <Gallery id="Gallery" context={context}/>
  </Container>
)

export default PrimeAsk
