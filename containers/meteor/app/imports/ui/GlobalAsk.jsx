import React   from 'react'

import TikiBar from './TikiBar'
import Filter from './Filter'
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

const GlobalAsk = () =>
(
  <Container id="GlobalRoot" style={css.root}>
    <TikiBar id="TikiBar" />
    <Filter id="Filter" />
    {/* <Gallery id="Gallery"/> */}
  </Container>
)

export default GlobalAsk