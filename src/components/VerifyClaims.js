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
import moment from 'moment';

import { showCandidatesToEmployeer, setEmployeerClaims, verifyCandidate } from '../actions'

class VerifyClaims extends Component {

    constructor(props) {
        super(props) 

        this.toAll = this.toAll.bind(this);
        this.verify = this.verify.bind(this);

        this.claims = ["Teacher", "Singer"]
    }

    toAll = () => {
        let { showCandidatesToEmployeer } = this.props;
        showCandidatesToEmployeer();
    }

    verify = () => {
        let { verifyCandidate, candidate } = this.props;
        verifyCandidate(candidate);
    }

    componentDidMount(){

        let { setEmployeerClaims, candidate } = this.props;

        setEmployeerClaims(0, candidate);

        let counter = 0;
        this.intervalId = setInterval(function() {
            counter++;
            setEmployeerClaims(counter, candidate);
        }, 5000);
    }

    componentWillUnmount(){

        clearInterval(this.intervalId);
    }
    
    render() {

        let { candidate, employeerClaimHash, claims, isVerifier } = this.props

        return (
            <Card className="my-4">
                <CardHeader>Validated claims</CardHeader>
                <CardBody>
                    <CardTitle><a href={"https://ropsten.etherscan.io/address/"+candidate} target="_blank">{candidate}</a></CardTitle>
                    {employeerClaimHash && <Alert color="success">There is <a href={"https://ropsten.etherscan.io/tx/"+employeerClaimHash} target="_blanck" className="alert-link">hash</a> of the transaction</Alert>}
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Validator</th>
                                <th>Certifier</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.map((claim, index) => 
                                <tr key={index}>
                                    <th scope="row">{index +1}</th>
                                    <td>{claim.title}</td>
                                    <td>{claim.status === "Invisible" ? claim.status : claim.status === "1" ? "Pending" : claim.status === "2" ? "Validated" : claim.status === "3" ? "Not Validated" : null }</td>
                                    <td>{claim.validator === "Invisible" ? claim.validator : <a href={"https://ropsten.etherscan.io/address/"+claim.validator} target="_blank">{claim.validator.length > 7 ? claim.validator.slice(0, 7 - 1) + "…" : claim.validator}</a>}</td>
                                    <td>{claim.certifier === "Invisible" ? claim.certifier : <a href={"https://ropsten.etherscan.io/address/"+claim.certifier} target="_blank">{claim.certifier.length > 7 ? claim.certifier.slice(0, 7 - 1) + "…" : claim.certifier}</a>}</td>
                                    <td>{claim.date === "Invisible" ? claim.date : claim.date === "0" ? "N/N" : moment.unix(claim.date).format("YYYY-MM-DD HH:mm")}</td>
                                </tr>
                            )}       
                        </tbody>
                    </Table>
                    <Button type="button" onClick={this.toAll} className="my-2" color="danger">Cancel</Button>{" "}
                    {isVerifier ? null : <Button type="button" onClick={this.verify} className="my-2" color="primary">Buy</Button>}
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employeerClaimHash: state.employeerPage.employeerClaimHash,
        claims: state.employeerPage.claims,
        isVerifier: state.employeerPage.isVerifier
    }
}

export default connect(mapStateToProps, { showCandidatesToEmployeer, setEmployeerClaims, verifyCandidate })(VerifyClaims);