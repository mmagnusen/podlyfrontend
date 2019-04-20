import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../../redux/store/store'
import { ContactPage, PlayPage, DiscoverPage, DashboardPage, RegisterPage, LoginPage, PodcastPage, HomePage } from '../../components/'

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
                <Route path="/play/:slug" component={PlayPage}/> 
                <Route path="/contact" component={ContactPage}/> 

            </Switch>
        </BrowserRouter>
        </Provider>
    )
}

export default AppRouter