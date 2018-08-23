import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,
    Row,
    Col,
    Card,
    CardHeader, 
    CardTitle,
    CardBody,
    Table,
    Button
} from 'reactstrap';

import ValidateClaimForm from '../components/forms/ValidateClaimForm';

import { showCandidatesToValidator, showCandidateToValidator } from '../actions'
class ValidatorPage extends Component {

    constructor(props) {
        super(props) 

        this.toCandidate = this.toCandidate.bind(this);
        this.toAll = this.toAll.bind(this);

        this.claims = ["Teacher", "Singer"]
    }

    toCandidate = (address) => {

        let { showCandidateToValidator } = this.props;
        showCandidateToValidator(address);
    }

    toAll = () => {
        let { showCandidatesToValidator } = this.props;
        showCandidatesToValidator();
    }
    
    render() {

        let { page, candidate } = this.props

        return (
            <section className="mb-5">
                <Container className="py-4">
                    <Row className="justify-content-center align-items-center">
                        <Col md={10} lg={8}>
                            <Card className="my-4">
                                <CardHeader>Validator</CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Address</th>
                                                <td>0x3465...</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Balance</th>
                                                <td>0 ETH</td>
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
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>0x9456...</td>
                                                    <td>2</td>
                                                    <td><Button type="button" onClick={this.toCandidate.bind(this, "0x9456...")} color="link">View</Button></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>0x4354...</td>
                                                    <td>1</td>
                                                    <td><Button type="button" onClick={this.toCandidate.bind(this, "0x4354...")} color="link">View</Button></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>0x2433...</td>
                                                    <td>3</td>
                                                    <td><Button type="button" onClick={this.toCandidate.bind(this, "0x2433...")} color="link">View</Button></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            :
                                page === "candidate" ? 
                                    <Card className="my-4">
                                        <CardHeader>Pending claims</CardHeader>
                                        <CardBody>
                                            <CardTitle>{candidate}</CardTitle>
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
                                                    {this.claims.map((claim, index) => 
                                                        <ValidateClaimForm form={`validateClaimForm-${index}`} key={index} claim={claim} index={index} />
                                                    )}       
                                                </tbody>
                                            </Table>
                                            <Button type="button" onClick={this.toAll} className="my-2" color="danger">Cancel</Button>
                                        </CardBody>
                                    </Card>
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
        page: state.validatorPageType.page,
        candidate: state.validatorPageType.candidate
    }
}

export default connect(mapStateToProps, { showCandidatesToValidator, showCandidateToValidator })(ValidatorPage);