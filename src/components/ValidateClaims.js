import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Card,
    CardHeader, 
    CardTitle,
    CardBody,
    Table,
    Button,
    Alert
} from 'reactstrap';

import ValidateClaimForm from '../components/forms/ValidateClaimForm';

import { showCandidatesToValidator, setValidatorClaims } from '../actions'

class ValidateClaims extends Component {

    constructor(props) {
        super(props) 

        this.toAll = this.toAll.bind(this);

        this.claims = ["Teacher", "Singer"]
    }

    toAll = () => {
        let { showCandidatesToValidator } = this.props;
        showCandidatesToValidator();
    }

    componentDidMount(){

        let { setValidatorClaims, candidate } = this.props;

        setValidatorClaims(0, candidate);

        let counter = 0;
        this.intervalId = setInterval(function() {
            counter++;
            setValidatorClaims(counter, candidate);
        }, 5000);
    }

    componentWillUnmount(){

        clearInterval(this.intervalId);
    }
    
    render() {

        let { candidate, validateClaimHash, claims } = this.props

        return (
            <Card className="my-4">
                <CardHeader>Pending claims</CardHeader>
                <CardBody>
                    <CardTitle><a href={"https://ropsten.etherscan.io/address/"+candidate} target="_blank">{candidate}</a></CardTitle>
                    {validateClaimHash && <Alert color="success">There is <a href={"https://ropsten.etherscan.io/tx/"+validateClaimHash} target="_blanck" className="alert-link">hash</a> of the transaction</Alert>}
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Certifier</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.map((claim, index) => 
                                <ValidateClaimForm form={`validateClaimForm-${index}`} key={index} claim={claim.title} index={index} candidate={candidate} />
                            )}       
                        </tbody>
                    </Table>
                    <Button type="button" onClick={this.toAll} className="my-2" color="danger">Cancel</Button>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        validateClaimHash: state.validatorPage.validateClaimHash,
        claims: state.validatorPage.claims
    }
}

export default connect(mapStateToProps, { showCandidatesToValidator, setValidatorClaims })(ValidateClaims);