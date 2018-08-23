import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Alert, Input } from 'reactstrap';
import lightwallet from 'eth-lightwallet'

import { createWallet, changeToRestore } from '../../actions'

class CreateWalletForm extends Component {

    constructor(props) {
        super(props) 

        this.submit = this.submit.bind(this);
        this.toRestore = this.toRestore.bind(this);
        this.required = this.required.bind(this);
        this.minLength = this.minLength.bind(this);
        this.passwordsMatch = this.passwordsMatch.bind(this);
    }

    toRestore = () => {
        let { changeToRestore } = this.props;
        changeToRestore();
    }

  submit = (values) => {

      let { createWallet } = this.props;
      let randomSeed = lightwallet.keystore.generateRandomSeed();

      createWallet(randomSeed, values.password, "createWalletForm");
  }

  renderField = ({ input, label, className, type, meta: { touched, error } }) => (
      <FormGroup className="mb-4">
          <Input {...input} placeholder={label} className={className} invalid={(touched && error) ? true : false } type={type} autoComplete="off" required/>
          {touched && error && <div className="text-danger"><small>{error}</small></div>}
      </FormGroup>
  )

  required = (value) => (value ? undefined : 'It is required field')

  minLength = (value) => (value && value.length < 8 ? `Password must be at least 8 characters` : undefined)
  
  passwordsMatch = (value, allValues) => value !== allValues.password ? `Passwords don't match` : undefined;
  
  render() {

      let { error, handleSubmit, pristine, submitting, invalid } = this.props;
    
      return (
          <div>
              {error && <Alert className="mb-4" color="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit(this.submit)}>                 
                  <Field name="password" type="password" 
                      component={this.renderField} label="Password" className="py-2 px-4"
                      validate={[ this.required, this.minLength ]}
                  />
                  <Field name="confirm-password" type="password" 
                      component={this.renderField} label="Confirm password" className="py-2 px-4"
                      validate={[ this.required, this.passwordsMatch ]}
                  />
                  <FormGroup>
                    <Button type="submit" disabled={pristine || submitting || invalid} className="my-2" color="primary">Create</Button>{' '}
                    <Button type="button" disabled={submitting} onClick={this.toRestore} className="my-2" color="link">Restore</Button>
                  </FormGroup>
              </Form>
          </div>
      );
  }
};

CreateWalletForm = connect(
    null,
    {
        createWallet,
        changeToRestore
    }
)(CreateWalletForm);

export default reduxForm({
    form: 'createWalletForm'
})(CreateWalletForm)