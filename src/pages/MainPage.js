import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,
    Row,
    Col,
    Card,
    CardHeader, 
    CardBody
} from 'reactstrap';

import CreateWalletForm from '../components/forms/CreateWalletForm';
import RestoreWalletForm from '../components/forms/RestoreWalletForm';

class MainPage extends Component {

    render() {

        let { page } = this.props

        return (
            <section className="mb-5">
                <Container className="py-4">
                    <Row className="align-items-center justify-content-center">
                        <Col md={4}>
                                {page === "create" ? 
                                    <Card className="my-4">
                                        <CardHeader>Create Wallet</CardHeader>
                                        <CardBody>
                                            <CreateWalletForm />
                                        </CardBody>
                                    </Card>
                                :
                                    page === "restore" ? 
                                        <Card className="my-4">
                                            <CardHeader>Restore Wallet</CardHeader>
                                            <CardBody>
                                                <RestoreWalletForm />
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
        page: state.mainPage.page
    }
}

export default connect(mapStateToProps, null)(MainPage);