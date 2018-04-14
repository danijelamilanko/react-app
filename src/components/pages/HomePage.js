import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import TopNavigation from '../navigation/TopNavigation';

class HomePage extends React.Component {

    render() {
        return (
            <div className='home-page'>
                <TopNavigation/>
                <h1>REACT APP</h1>
            </div>
        )
    }
}

HomePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
