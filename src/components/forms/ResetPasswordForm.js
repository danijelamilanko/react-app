import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends React.Component {
    state = {
        data: {
            token: this.props.token,
            password: "",
            passwordConfirmation: ""
        },
        loading: false,
        errors: {}
    };

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
            this.props
                .submit(this.state.data)
                .catch(err =>
                    this.setState({errors: err.response.data.errors, loading: false})
                );
        }
    };

    validate = data => {
        const errors = {};
        if (!data.password) errors.password = "Can't be blank";
        if (data.password !== data.passwordConfirmation)
            errors.password = "Passwords must match";
        return errors;
    };

    render() {
        const {errors, data, loading} = this.state;

        return (
            <div className='login-page'>
                <div className='ui middle aligned center aligned grid'>
                    <div className='column'>
                        <h1 className='ui teal image header'>
                            <div className='content'>
                                Reset password
                            </div>
                        </h1>
                        <Form onSubmit={this.onSubmit} loading={loading} className='ui large form'>
                <div className='ui stacked segment'>
                    <Form.Field error={!!errors.password}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="your new password"
                            value={data.password}
                            onChange={this.onChange}
                        />
                        {errors.password && <InlineError text={errors.password}/>}
                    </Form.Field>

                    <Form.Field error={!!errors.passwordConfirmation}>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            placeholder="type it again, please"
                            value={data.passwordConfirmation}
                            onChange={this.onChange}
                        />
                        {errors.passwordConfirmation && (
                            <InlineError text={errors.passwordConfirmation}/>
                        )}
                    </Form.Field>

                    <Button className='ui fluid large teal submit button'>Submit</Button>
                </div>
            </Form>
                    </div>
                </div>
            </div>
        );
    }
}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
