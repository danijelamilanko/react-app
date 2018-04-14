import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth';

const TopNavigation = ({isAuthenticated, user, logout, history}) => (
    <div>
        <div className='ui pointing secondary menu'>
            { isAuthenticated &&
            <div className='right menu'>
                <img alt='' className='ui circular image' src='/img/patrick.png'/>
                <span className='item'>{user.username}</span>
                <a className='item' role='link' onClick={() => logout()}>Logout</a>
            </div>
            }
            { !isAuthenticated &&
            <div className='right menu'>
                <a className='item' onClick={() => history.push(`/login`)}>Login</a>
            </div>
            }
        </div>
    </div>
);

TopNavigation.defaultProps = {
    user: {
        email: '',
        username: ''
    }
};

TopNavigation.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape({
        email: PropTypes.string,
        username: PropTypes.string
    })
};

function mapStateToProps(state) {
    return {
        user: state.user,
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps, {logout: actions.logout})(withRouter(TopNavigation));
