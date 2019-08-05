import React     from 'react'

import TikiBar   from './TikiBar'
import Auditor   from './Auditor'
import Gallery   from './Gallery'

import Container from '@material-ui/core/Container'

const styling =
{
  root :
  {
    padding : 0
  }
}

const context =
{
  first   : true,
  results : null
}

const GroupAsk = () =>
(
  <Container   id="AskRoot"   style={styling.root}>
      <TikiBar id="TikiBar" context={context}/>
      <Auditor id="Auditor" context={context}/>
      <Gallery id="Gallery" context={context}/>
  </Container>
)

export default GroupAsk
