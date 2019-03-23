import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../Home'
import Blog from '../Blog'
import Post from '../Post'

const AppRouter  = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Home} exact={true}/>
                <Route path='/blog' component={Blog} exact={true}/>
                <Route path="/blog/:slug" component={Post}/>  
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter