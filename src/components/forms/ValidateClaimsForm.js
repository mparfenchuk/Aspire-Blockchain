import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Alert, Input, Row, Col } from 'reactstrap';

class RadioGroup extends Component {
    render() {
        const { input, meta, options } = this.props
        const hasError = meta.touched && meta.error;

        return (
            <div className="py-2 px-4">
                {options.map(o => <label key={o.value}><input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}</label>)}
                {hasError && <div className="text-danger"><small>{meta.error}</small></div>}
            </div>
        );
    }
}

class ValidateClaimsForm extends Component {

    constructor(props) {
        super(props) 

        this.submit = this.submit.bind(this);
        this.required5Claims = this.required5Claims.bind(this);
        this.required = this.required.bind(this);
        this.isAddress = this.isAddress.bind(this);
    }

  submit = (values) => {


      console.log(values)
      //createWallet(randomSeed, values.password, "addClaimsForm");
  }

  renderField = ({ input, label, className, type, meta: { touched, error } }) => (
      <FormGroup className="mb-4">
          <Input {...input} placeholder={label} invalid={(touched && error) ? true : false } type={type} autoComplete="off" required/>
          {touched && error && <div className="text-danger"><small>{error}</small></div>}
      </FormGroup>
  )

  required5Claims = (value) => (!value || !value.length || value.length > 5 ? 'At least 5 claim must be entered' : undefined)

  required = (value) => (value ? undefined : 'It is required field')

  isAddress = (value) => (value ? undefined : 'It is required field')

  renderAllFields = ({ fields, meta: { error } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push()}>
            Add Claim
        </button>
        {error && <span>{error}</span>}
      </li>
      {fields.map((claim, index) => (
        <li key={index}>
          <button type="button" title="Remove Claim" onClick={() => fields.remove(index)}>
              Remove
          </button>
          <Field name={claim} type="text" component={this.renderField} 
            label={`Claim #${index + 1}`} className="py-2 px-4" validate={this.required}
          />
          <Field component={RadioGroup} name={`status-${index + 1}`} validate={this.required} options={[
                { title: 'True', value: 'true' },
                { title: 'False', value: 'false' }
            ]} />
        </li>
      ))}
    </ul>
  )
  
  render() {

      let { error, handleSubmit, pristine, submitting, invalid } = this.props;
    
      return (
          <div>
              {error && <Alert className="mb-4" color="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit(this.submit)}>
                  <Field name="candidate" type="text" 
                      component={this.renderField} label="Candidate" className="py-2 px-4"
                      validate={[ this.required, this.isAddress ]}
                  />
                  <Field name="certifier" type="text" 
                      component={this.renderField} label="Certifier" className="py-2 px-4"
                      validate={[ this.required, this.isAddress ]}
                  />
                  <FieldArray name="claims" 
                    component={this.renderAllFields} 
                    validate={this.required5Claims}/>              
                  <Row className="align-items-center">
                      <Col>
                          <Button type="submit" disabled={pristine || submitting || invalid} className="my-2" color="primary" size="lg">Push</Button>
                      </Col>
                  </Row>
              </Form>
          </div>
      );
  }
};

ValidateClaimsForm = connect(
    null,
    {
        //createWallet
    }
)(ValidateClaimsForm);

export default reduxForm({
    form: 'validateClaimsForm'
})(ValidateClaimsForm)