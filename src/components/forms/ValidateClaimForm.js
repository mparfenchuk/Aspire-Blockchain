import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Alert, Input } from 'reactstrap';

import { web3 } from '../../utils/web3'

import { validateClaim } from '../../actions'
class ValidateClaimForm extends Component {

    constructor(props) {
        super(props) 

        this.submit = this.submit.bind(this);
        this.required = this.required.bind(this);
        this.isAddress = this.isAddress.bind(this);
    }

    isAddressValid = (address) => {
        // function isAddress(address) {
            if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return "true
            return true;
        } else {
            // Otherwise check each case
            address = address.replace('0x','');
            var addressHash = web3.sha3(address.toLowerCase());
            for (var i = 0; i < 40; i++ ) {
                // the nth letter should be uppercase if the nth digit of casemap is 1
                if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                    return false;
                }
            }
            return true;
        }
    }

  submit = (values) => {

    let { claim, index, candidate } = this.props;

    let { validateClaim } = this.props;
    validateClaim(claim, candidate, values.certifier, values.status, "validateClaimForm-"+index);
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

  isAddress = (value) => (this.isAddressValid(value) ? undefined : 'Enter valid address')
  
  render() {

      let { error, handleSubmit, pristine, submitting, invalid, claim, index } = this.props;

      return (
        <React.Fragment>
          {error && <tr><td colSpan={5}><Alert color="danger">{error}</Alert></td></tr>}
          <tr>
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
        </React.Fragment>
      );
  }
};

ValidateClaimForm = connect(
    null,
    {
        validateClaim
    }
)(ValidateClaimForm);

export default reduxForm()(ValidateClaimForm)