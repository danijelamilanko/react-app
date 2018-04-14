import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Message} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({errors: err.response.data.errors, loading: false}));
        }
    };

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) {
            errors.email = 'Invalid email';
        }
        if (!data.password) {
            errors.password = "Can't be blank";
        }
        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;
        return (
            <div className='ui middle aligned center aligned grid'>
                <div className='column'>
                    <h2 className='ui teal image header'>
                        <div className='content'>
                            Log-in to your account
                        </div>
                    </h2>
                    <Form onSubmit={this.onSubmit} loading={loading} className='ui large form'>
                        { errors.global && <Message negative>
                            <Message.Header>Something went wrong</Message.Header>
                            <p>{errors.global}</p>
                        </Message>}
                        <div className='ui stacked segment'>
                            <Form.Field error={!!errors.email}>
                                <div className='field'>
                                    <div className='ui left icon input'>
                                        <i className='user icon'></i>
                                        <input type='email'
                                               id='email'
                                               name='email'
                                               placeholder='E-mail address'
                                               value={data.email}
                                               onChange={this.onChange}
                                        />
                                        {errors.email && <InlineError text={errors.email}/>}
                                    </div>
                                </div>
                            </Form.Field>
                            <Form.Field error={!!errors.password}>
                                <div className='field'>
                                    <div className='ui left icon input'>
                                        <i className='lock icon'></i>
                                        <input type='password'
                                               id='password'
                                               name='password'
                                               placeholder='Password'
                                               value={data.password}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                {errors.password && <InlineError text={errors.password}/>}
                            </Form.Field>
                            <Button className='ui fluid large teal submit button'>Login</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;