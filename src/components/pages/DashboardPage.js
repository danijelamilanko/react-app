import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import TopNavigation from '../navigation/TopNavigation';

class DashboardPage extends React.Component {

    render() {
        return (
            <div className='dashboard-page'>
                <TopNavigation/>
                <h1>REACT APP</h1>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }).isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardPage));
