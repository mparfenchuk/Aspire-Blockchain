import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Alert, Input } from 'reactstrap';

class ValidateClaimForm extends Component {

    constructor(props) {
        super(props) 

        this.submit = this.submit.bind(this);
        this.required = this.required.bind(this);
        this.isAddress = this.isAddress.bind(this);
    }

  submit = (values) => {

    console.log(values)
  }

  renderField = ({ input, label, className, type, meta: { touched, error } }) => (
      <FormGroup>
          <Input {...input} placeholder={label} className={className} invalid={(touched && error) ? true : false } type={type} autoComplete="off" required/>
          {touched && error && <div className="text-danger"><small>{error}</small></div>}
      </FormGroup>
  )

  renderSelect = ({ input, label, className, type, meta: { touched, error } }) => (
    <FormGroup>
        <Input {...input}  className={className} invalid={(touched && error) ? true : false } type={type} autoComplete="off" required>
            <option value="" disabled>{label}</option>
            <option value="true">True</option>
            <option value="false">False</option>
        </Input>
        {touched && error && <div className="text-danger"><small>{error}</small></div>}
    </FormGroup>
  )

  required = (value) => (value ? undefined : 'It is required field')

  isAddress = (value) => (value ? undefined : 'It is required field')
  
  render() {

      let { error, handleSubmit, pristine, submitting, invalid, claim, index } = this.props;

      return (
          <tr>
              {error && <Alert className="mb-4" color="danger">{error}</Alert>}
                <th scope="row">{index + 1}</th>
                <td>{claim}</td>
                <td><Form onSubmit={handleSubmit(this.submit)} id={`claimForm-${index}`}>
                    <Field name="certifier" type="text" 
                        component={this.renderField} label="Address of certifier" className="py-2 px-4"
                        validate={[ this.required, this.isAddress ]}
                    /> 
                    </Form>
                </td>
                <td>
                    <Field name="status" type="select" component={this.renderSelect} 
                        label="Choose status of claim" form={`claimForm-${index}`} className="py-2 px-4" validate={ this.required } 
                    />
                </td>
                <td>
                    <FormGroup>
                        <Button type="submit" form={`claimForm-${index}`} disabled={pristine || submitting || invalid} color="primary">Push</Button>
                    </FormGroup>
                </td>
          </tr>
      );
  }
};

ValidateClaimForm = connect(
    null,
    {
       
    }
)(ValidateClaimForm);

export default reduxForm()(ValidateClaimForm)