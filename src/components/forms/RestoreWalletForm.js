import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import lightwallet from 'eth-lightwallet'
import { Button, Form, FormGroup, Alert, Input, Row, Col } from 'reactstrap';

import { createWallet, changeToCreate } from '../../actions'

class RestoreWalletForm extends Component {

    constructor(props) {
        super(props) 

        this.submit = this.submit.bind(this);
        this.toCreate = this.toCreate.bind(this);
        this.isSeed = this.isSeed.bind(this);
        this.required = this.required.bind(this);
        this.minLength = this.minLength.bind(this);
        this.passwordsMatch = this.passwordsMatch.bind(this);
    }

    toCreate = () => {
        let { changeToCreate } = this.props;
        changeToCreate();
    }

  submit = (values) => {

      let { createWallet } = this.props;
      
      createWallet(values.seed, values.password, "restoreWalletForm");
  }

  renderField = ({ input, label, className, type, meta: { touched, error } }) => (
      <FormGroup className="mb-4">
          <Input {...input} placeholder={label} className={className} invalid={(touched && error) ? true : false } type={type} autoComplete="off" required/>
          {touched && error && <div className="text-danger"><small>{error}</small></div>}
      </FormGroup>
  )

  isSeed = (value) => (lightwallet.keystore.isSeedValid(value) ? undefined : 'Enter valid seed prase')

  required = (value) => (value ? undefined : 'It is required field')

  minLength = (value) => (value && value.length < 8 ? `Password must be at least 8 characters` : undefined)
  
  passwordsMatch = (value, allValues) => value !== allValues.password ? `Passwords don't match` : undefined;
  
  render() {

      let { error, handleSubmit, pristine, submitting, invalid } = this.props;
    
      return (
          <div>
              {error && <Alert className="mb-4" color="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit(this.submit)}>                 
                  <Field name="seed" type="textarea" 
                      component={this.renderField} label="Enter your secret twelve phrase here to restore your wallet" className="py-2 px-4"
                      validate={[ this.required, this.isSeed ]}
                  />
                  <Field name="password" type="password" 
                      component={this.renderField} label="Password" className="py-2 px-4"
                      validate={[ this.required, this.minLength ]}
                  />
                  <Field name="confirm-password" type="password" 
                      component={this.renderField} label="Confirm password" className="py-2 px-4"
                      validate={[ this.required, this.passwordsMatch ]}
                  />
                  <Row className="align-items-center">
                      <Col>
                          <Button type="button" disabled={submitting} onClick={this.toCreate} className="my-2" color="danger">Return</Button>{' '}
                          <Button type="submit" disabled={pristine || submitting || invalid} className="my-2" color="primary">Restore</Button> 
                      </Col>
                  </Row>
              </Form>
          </div>
      );
  }
};

RestoreWalletForm = connect(
    null,
    {
        createWallet,
        changeToCreate
    }
)(RestoreWalletForm);

export default reduxForm({
    form: 'restoreWalletForm'
})(RestoreWalletForm)