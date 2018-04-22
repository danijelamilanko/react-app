import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";
import { createUserRequest } from "../../actions/users"

class SignupForm extends React.Component {
    state = {
        data: {
            email: "",
            password: ""
        },
        loading: false,
        errors: {}
    };

    componentWillRecieveProps(nextProps) {
        this.setState({ errors: nextProps.serverErrors });
    }

    onChange = e =>
        this.setState({
            ...this.state,
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props.submit(this.state.data);
        }
    };

    validate = data => {
        const errors = {};

        if (!isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";

        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;

        return (
            <div className='login-page'>
                <div className='ui middle aligned center aligned grid'>
                    <div className='column'>
                        <h1 className='ui teal image header'>
                            <div className='content'>
                                Sign Up
                            </div>
                        </h1>
                        <Form onSubmit={this.onSubmit} loading={loading} className='ui large form'>
                            <div className='ui stacked segment'>
                                <Form.Field error={!!errors.email}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="email@email.com"
                                        value={data.email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && <InlineError text={errors.email}/>}
                                </Form.Field>

                                <Form.Field error={!!errors.password}>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && <InlineError text={errors.password}/>}
                                </Form.Field>

                                <Button className='ui fluid large teal submit button'>Sign Up</Button>
                            </div>
                        </Form>

                        <div className="ui message">
                            <Link to="/login">Log-in</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        serverErrors: state.formErrors.signup
    };
}

export default connect(mapStateToProps, {submit: createUserRequest})(SignupForm);
