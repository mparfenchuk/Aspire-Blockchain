import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button,
    Alert
} from 'reactstrap';

import ValidateClaims from '../components/ValidateClaims';

import { showCandidateToValidator, setValidatorData } from '../actions'

class ValidatorPage extends Component {

    constructor(props) {
        super(props) 

        this.toCandidate = this.toCandidate.bind(this);
    }

    toCandidate = (address) => {

        let { showCandidateToValidator } = this.props;
        showCandidateToValidator(address);
    }

    componentDidMount(){

        let { setValidatorData } = this.props;

        setValidatorData(0);

        let counter = 0;
        this.intervalId = setInterval(function() {
            counter++;
            setValidatorData(counter);
        }, 5000);
    }

    componentWillUnmount(){

        clearInterval(this.intervalId);
    }
    
    render() {

        let { page, candidate, validatorAddress, validatorEthBalance, validatorTokenBalance,
            candidates, validatorError } = this.props

        return (
            <section className="mb-5">
                <Container className="py-4">
                    <Row className="justify-content-center align-items-center">
                        <Col md={10} lg={8}>
                            <Card className="my-4">
                                <CardHeader>Validator</CardHeader>
                                <CardBody>
                                    {validatorError && <Alert color="danger">{validatorError}</Alert>}
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Address</th>
                                                <td>{validatorAddress}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Balance</th>
                                                <td>{validatorEthBalance}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Tokens</th>
                                                <td>{validatorTokenBalance}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                        <Col md={10} lg={8}>
                            {page === "all" ? 
                                <Card className="my-4">
                                    <CardHeader>Candidates with pending claims</CardHeader>
                                    <CardBody>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Address</th>
                                                    <th>Number of pending claims</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {candidates.map((candidate, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index +1}</th>
                                                        <td><a href={"https://ropsten.etherscan.io/address/"+candidate.address} target="_blank">{candidate.address.length > 7 ? candidate.address.slice(0, 7 - 1) + "…" : candidate.address}</a></td>
                                                        <td>{candidate.pending}</td>
                                                        <td><Button type="button" onClick={this.toCandidate.bind(this, candidate.address)} color="link">View</Button></td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            :
                                page === "candidate" ? 
                                    <ValidateClaims candidate={candidate} />
                                :
                                    null
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.validatorPage.page,
        candidate: state.validatorPage.candidate,
        candidates: state.validatorPage.candidates,
        validatorAddress: state.validatorPage.validatorAddress,
        validatorEthBalance: state.validatorPage.validatorEthBalance,
        validatorTokenBalance: state.validatorPage.validatorTokenBalance,
        validatorError: state.validatorPage.validatorError
    }
}

export default connect(mapStateToProps, { showCandidateToValidator, setValidatorData })(ValidatorPage);