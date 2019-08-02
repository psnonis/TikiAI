import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from "./App"
import NotFound from "./NotFound"
import GlobalAsk from "./GlobalAsk"

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/GlobalAsk/" component={GlobalAsk}/>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Router