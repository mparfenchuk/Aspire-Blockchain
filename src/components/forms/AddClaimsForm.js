import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Alert, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { addClaims } from '../../actions'
class AddClaimsForm extends Component {

    constructor(props) {
        super(props) 

        this.submit = this.submit.bind(this);
        this.required5Claims = this.required5Claims.bind(this);
        this.required = this.required.bind(this);
    }

  submit = (values) => {

    let { addClaims } = this.props;
    addClaims(values.claims, "addClaimsForm");
  }

  renderField = ({ input, label, className, type, fields, index, meta: { touched, error } }) => (
    <FormGroup className="mb-4">
        <InputGroup>
            <Input {...input} placeholder={label} className={className} invalid={(touched && error) ? true : false } type={type} autoComplete="off" required/>
            <InputGroupAddon addonType="append"><Button type="button" title="Remove Claim" color="danger" onClick={() => fields.remove(index)}>x</Button></InputGroupAddon>
        </InputGroup>
        {touched && error && <div className="text-danger"><small>{error}</small></div>}
    </FormGroup>
  )

  required5Claims = (value) => (!value || !value.length || value.length > 5 ? 'Not more than 5 claim must be entered' : undefined)

  required = (value) => (value ? undefined : 'It is required field')

  renderAllFields = ({ fields, meta: { error } }) => (
    <div>
      <FormGroup className="mb-4">
        <Button type="button" color="success" onClick={() => fields.push()}>
           + Add
        </Button>
        {error && <div className="text-danger"><small>{error}</small></div>}
      </FormGroup>
      {fields.map((claim, index) => (
        <Field key={index} index={index} fields={fields} name={claim} type="text" component={this.renderField} 
            label={`Claim #${index + 1}`} className="py-2 px-4" validate={this.required} />
      ))}
    </div>
  )
  
  render() {

      let { error, handleSubmit, pristine, submitting, invalid } = this.props;
    
      return (
          <div>
              {error && <Alert className="mb-4" color="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit(this.submit)}>
                  <FieldArray name="claims" 
                    component={this.renderAllFields} 
                    validate={this.required5Claims}/>              
                  <FormGroup className="float-right">
                    <Button type="submit" disabled={pristine || submitting || invalid} color="primary">Save</Button>
                  </FormGroup>
              </Form>
          </div>
      );
  }
};

AddClaimsForm = connect(
    null,
    {
        addClaims
    }
)(AddClaimsForm);

export default reduxForm({
    form: 'addClaimsForm'
})(AddClaimsForm)