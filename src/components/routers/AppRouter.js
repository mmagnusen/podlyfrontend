import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../../redux/store/store'
import HomePage from '../../pages/HomePage'
import PodcastPage from '../../pages/PodcastPage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import DashboardPage from '../../pages/DashboardPage'
import DiscoverPage from '../../pages/DiscoverPage'
import PlayPage from '../../pages/PlayPage'

const AppRouter  = (props) => {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={HomePage} exact={true}/>
                <Route path="/podcast/:slug" component={PodcastPage}/>  
                <Route path="/login" component={LoginPage}/> 
                <Route path="/register" component={RegisterPage}/> 
                <Route path="/dashboard" component={DashboardPage}/> 
                <Route path="/discover" component={DiscoverPage}/> 
                <Route path="/play" component={PlayPage}/> 

            </Switch>
        </BrowserRouter>
        </Provider>
    )
}

export default AppRouter