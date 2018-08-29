import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,
    Row,
    Col,
    Card,
    CardHeader, 
    CardBody,
    Table,
    Alert
} from 'reactstrap';
import moment from 'moment';

import AddClaimsForm from '../components/forms/AddClaimsForm';

import { setCandidateData } from '../actions'

class CandidatePage extends Component {

    componentDidMount(){

        let { setCandidateData } = this.props;

        setCandidateData(0);

        let counter = 0;
        this.intervalId = setInterval(function() {
            counter++;
            setCandidateData(counter);
        }, 5000);
    }

    componentWillUnmount(){

        clearInterval(this.intervalId);
    }

    render() {

        let { address, seed, candidateEthBalance, candidateTokenBalance, claims, addClaimsHash,
            candidateError } = this.props

        return (
            <section className="mb-5">
                <Container className="py-4">
                    <Row>
                        <Col md={7} lg={6}>
                            <Card className="my-4">
                                <CardHeader>Profile</CardHeader>
                                <CardBody>
                                    {candidateError && <Alert color="danger">{candidateError}</Alert>}
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Address</th>
                                                <td>{address}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Seed</th>
                                                <td>{seed}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Balance</th>
                                                <td>{candidateEthBalance}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Tokens</th>
                                                <td>{candidateTokenBalance}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={5} lg={6}>
                            <Card className="my-4">
                                <CardHeader>New Claims</CardHeader>
                                <CardBody>
                                    {addClaimsHash && <Alert color="success">There is <a href={"https://ropsten.etherscan.io/tx/"+addClaimsHash} target="_blanck" className="alert-link">hash</a> of the transaction</Alert>}
                                    <AddClaimsForm />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                        <Col md={10} lg={8}>
                            <Card className="my-4">
                                <CardHeader>All Claims</CardHeader>
                                <CardBody>
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
                                                    <td>{claim.status === "1" ? "Pending" : claim.status === "2" ? "Validated" : claim.status === "3" ? "Not Validated" : null }</td>
                                                    <td><a href={"https://ropsten.etherscan.io/address/"+claim.validator} target="_blank">{claim.validator.length > 7 ? claim.validator.slice(0, 7 - 1) + "…" : claim.validator}</a></td>
                                                    <td><a href={"https://ropsten.etherscan.io/address/"+claim.certifier} target="_blank">{claim.certifier.length > 7 ? claim.certifier.slice(0, 7 - 1) + "…" : claim.certifier}</a></td>
                                                    <td>{claim.date === "0" ? "N/N" : moment.unix(claim.date).format("YYYY-MM-DD HH:mm")}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        candidateEthBalance: state.candidatePage.candidateEthBalance,
        candidateTokenBalance: state.candidatePage.candidateTokenBalance,
        addClaimsHash: state.candidatePage.addClaimsHash,
        claims: state.candidatePage.claims,
        candidateError: state.candidatePage.candidateError,
        address: state.wallet.address,
        seed: state.wallet.seed
    }
}

export default connect(mapStateToProps, { setCandidateData })(CandidatePage);