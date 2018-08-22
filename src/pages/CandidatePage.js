import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,
    Row,
    Col,
    Card,
    CardHeader, 
    CardBody,
    Table
} from 'reactstrap';

import AddClaimsForm from '../components/forms/AddClaimsForm';

class CandidatePage extends Component {

    render() {

        let { address, seed } = this.props

        return (
            <section className="mb-5">
                <Container className="py-4">
                    <Row>
                        <Col md={7} lg={6}>
                            <Card className="my-4">
                                <CardHeader>Profile</CardHeader>
                                <CardBody>
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
                                                <td>0 ETH</td>
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
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Teacher</td>
                                                <td>VALIDATED</td>
                                                <td>0x3443...</td>
                                                <td>0x6556...</td>
                                                <td>21/09/2018 22:00</td>
                                            </tr>
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
        address: state.wallet.address,
        seed: state.wallet.seed
    }
}

export default connect(mapStateToProps, null)(CandidatePage);