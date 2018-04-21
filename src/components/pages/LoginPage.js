import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";

class LoginPage extends React.Component {
    submit = data =>
        this.props.login(data).then(() => this.props.history.push("/dashboard"));

    render() {
        return (
            <div className='login-page'>
                <div className='ui middle aligned center aligned grid'>
                    <div className='column'>
                        <h1 className='ui teal image header'>
                            <div className='content'>
                                Log-in to your account
                            </div>
                        </h1>

                        <LoginForm submit={this.submit}/>

                        <div className="ui message">
                            <Link to="/forgot_password">Forgot Password?</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, {login})(LoginPage);
