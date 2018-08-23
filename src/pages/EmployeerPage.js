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

import { showCandidatesToEmployeer, showCandidateToEmployeer } from '../actions'
class EmployeerPage extends Component {

    constructor(props) {
        super(props) 

        this.toCandidate = this.toCandidate.bind(this);
        this.toAll = this.toAll.bind(this);

        this.claims = [
            {"title":"Teacher","validator":"INVISIBLE","certifier":"INVISIBLE","status":"INVISIBLE","date":"INVISIBLE"}, 
            {"title":"Singer","validator":"INVISIBLE","certifier":"INVISIBLE","status":"INVISIBLE","date":"INVISIBLE"}
        ]
    }

    toCandidate = (address) => {

        let { showCandidateToEmployeer } = this.props;
        showCandidateToEmployeer(address);
    }

    toAll = () => {
        let { showCandidatesToEmployeer } = this.props;
        showCandidatesToEmployeer();
    }

    render() {

        let { page, candidate } = this.props

        return (
            <section className="mb-5">
                <Container className="py-4">
                    <Row className="justify-content-center align-items-center">
                        <Col md={10} lg={8}>
                            <Card className="my-4">
                                <CardHeader>Employeer</CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Company</th>
                                                <td>Google Inc</td>
                                            </tr>
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
                                    <CardHeader>Candidates with validated claims</CardHeader>
                                    <CardBody>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Address</th>
                                                    <th>Number of validated claims</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>0x2346...</td>
                                                    <td>3</td>
                                                    <td><Button type="button" onClick={this.toCandidate.bind(this, "0x9456...")} color="link">View</Button></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>0x8764...</td>
                                                    <td>4</td>
                                                    <td><Button type="button" onClick={this.toCandidate.bind(this, "0x4354...")} color="link">View</Button></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>0x8913...</td>
                                                    <td>2</td>
                                                    <td><Button type="button" onClick={this.toCandidate.bind(this, "0x2433...")} color="link">View</Button></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            :
                                page === "candidate" ? 
                                    <Card className="my-4">
                                        <CardHeader>Validated claims</CardHeader>
                                        <CardBody>
                                            <CardTitle>{candidate}</CardTitle>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Title</th>
                                                        <th>Validator</th>
                                                        <th>Certifier</th>
                                                        <th>Status</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>     
                                                    {this.claims.map((claim, index) => 
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{claim.title}</td>
                                                            <td>{claim.validator}</td>
                                                            <td>{claim.certifier}</td>
                                                            <td>{claim.status}</td>
                                                            <td>{claim.date}</td>
                                                        </tr>
                                                    )} 
                                                </tbody>
                                            </Table>
                                            <Button type="button" onClick={this.toAll} className="my-2" color="danger">Cancel</Button>{' '}
                                            <Button type="button" className="my-2" color="primary">Buy</Button>
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
        page: state.employeerPageType.page,
        candidate: state.employeerPageType.candidate
    }
}

export default connect(mapStateToProps, { showCandidatesToEmployeer, showCandidateToEmployeer })(EmployeerPage);