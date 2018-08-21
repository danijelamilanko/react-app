import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Segment } from "semantic-ui-react";
import Tabs from '../tabs/Tabs';
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";

class DashboardPage extends React.Component {
    render() {
        const {isConfirmed} = this.props;
        return (
            <div className='dashboard-page'>{!isConfirmed && <ConfirmEmailMessage />}
                <Grid container>
                    <Grid.Column className="stretched column" width={13}>
                        <Tabs>
                            <div label="Planete u kucama">
                                <div className="chat-list">Planete u kucama u izradi...</div>
                                <div className="users-list">
                                    <div className="users-list-menu">
                                        <span className="users-list-top">10 korisnika</span>
                                        <i className="search icon"></i>
                                        <i className="grid layout icon"></i>
                                    </div>
                                </div>
                            </div>
                            <div label="Vladari kuca">
                                <div className="chat-list">Vladari kuca u izradi...</div>
                                <div className="users-list">
                                    <div className="users-list-menu">
                                        <span className="users-list-top">20 korisnika</span>
                                        <i className="search icon"></i>
                                        <i className="grid layout icon"></i>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </Grid.Column>
                    <Grid.Column className="stretched column" width={3}><Segment></Segment></Grid.Column>
                </Grid>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isConfirmed: !!state.user.confirmed
    };
}

export default connect(mapStateToProps)(DashboardPage);
