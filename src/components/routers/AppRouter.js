import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../../redux/store/store'
import { 
    ContactPage, 
    PlayPage, 
    DiscoverPage, 
    DashboardPage, 
    RegisterPage, 
    LoginPage, 
    PodcastPage, 
    HomePage, 
    BlogPage, 
    BlogPostPage ,
    BetaPage,
    CommunityPage,
    Navigation,
    Footer,
    NewsLetterPage,
} from '../../components/'

const AppRouter  = (props) => {
    return (
        
        <Provider store={store}>
      
        <BrowserRouter>
        <Navigation />
            <Switch>
                <Route path='/' component={HomePage} exact={true}/>
                <Route path="/podcast/:slug" component={PodcastPage}/>  
                <Route path="/login" component={LoginPage}/> 
                <Route path="/register" component={RegisterPage}/> 
                <Route path="/beta" component={BetaPage}/> 
                <Route path="/dashboard" component={DashboardPage}/> 
                <Route path="/discover" component={DiscoverPage}/> 
                <Route path="/play/:slug" component={PlayPage}/> 
                <Route path="/contact" component={ContactPage}/> 
                <Route path="/blog" exact={true} component={BlogPage} /> 
                <Route path="/community" exact={true} component={CommunityPage} /> 
                <Route path="/blog/:slug" exact={true} component={BlogPostPage}/> 
                <Route path="/newsletter" exact={true} component={NewsLetterPage}/> 
            </Switch>
        <Footer />
        </BrowserRouter>
        </Provider>
    )
}

export default AppRouter