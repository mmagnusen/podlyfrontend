import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../../redux/store/store'
import HomePage from '../../pages/HomePage'
import PodcastPage from '../../pages/PodcastPage'

const AppRouter  = (props) => {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={HomePage} exact={true}/>
                <Route path="/podcast/:slug" component={PodcastPage}/>  
            </Switch>
        </BrowserRouter>
        </Provider>
    )
}

export default AppRouter