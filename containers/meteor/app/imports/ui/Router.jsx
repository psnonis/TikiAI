import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrimeAsk from './PrimeAsk'
import GroupAsk from './GroupAsk'

import NotFound from './NotFound'

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/'          component={PrimeAsk}/>
            <Route exact path='/GroupAsk/' component={GroupAsk}/>
            <Route                         component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Router