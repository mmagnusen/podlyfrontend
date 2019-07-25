import React, { Component } from 'react'; 
import userActionGenerators from '../../../redux/actions/user/userActionGenerators';
import { connect } from 'react-redux';
import { Link  } from 'react-router-dom';
import { Responsive} from 'semantic-ui-react';

class NavigationItems extends Component {

    updateDashboardTab = (newTabIndex) => {
        this.props.dispatch(userActionGenerators.updateTabIndex(newTabIndex));

        this.props.toggleMobileNavigation && this.props.toggleMobileNavigation();
    }

    render() {
        const { reduxPodcast } = this.props;

        return (
            <ul className='Dashboard-navigationItems'>
                <Responsive maxWidth={767}>
                    <Link to='/dashboard' onClick={() => this.updateDashboardTab(0)}><li>Your details</li></Link>
                    <Link to='/dashboard' onClick={() => this.updateDashboardTab(1)}><li > Podcasts</li></Link>
                    {reduxPodcast.podcasts &&  reduxPodcast.podcasts.length > 0 && <Link to='/dashboard' onClick={() => this.updateDashboardTab(2)}><li >Hosts</li></Link>}
                </Responsive>
                <Responsive minWidth={768}>
                    <li onClick={() => this.updateDashboardTab(0)}>Your details</li>
                    <li onClick={() => this.updateDashboardTab(1)}> Podcasts</li>
                    {reduxPodcast.podcasts && reduxPodcast.podcasts.length > 0  && <li onClick={() => this.updateDashboardTab(2)}>Hosts</li>}
                </Responsive>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        reduxPodcast: state.podcast
    }
};

export default connect(mapStateToProps)(NavigationItems);