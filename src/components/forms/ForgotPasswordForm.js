import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends React.Component {
    state = {
        data: {
            email: ""
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
        if (!isEmail(data.email)) errors.email = "Invalid email";
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
                                Get new password
                            </div>
                        </h1>
                        <Form onSubmit={this.onSubmit} loading={loading} className='ui large form'>
                            {!!errors.global && <Message negative>{errors.global}</Message>}
                            <div className='ui stacked segment'>
                                <Form.Field error={!!errors.email}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="email"
                                        value={data.email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && <InlineError text={errors.email}/>}
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

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
