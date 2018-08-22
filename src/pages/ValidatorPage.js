import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,
    Row,
    Col,
    Card
} from 'reactstrap';

import ValidateClaimsForm from '../components/forms/ValidateClaimsForm';

class ValidatorPage extends Component {

    render() {

        let { address, seed } = this.props

        return (
            <section className="mb-5">
                <Container className="py-4">
                    <Row className="justify-content-center align-items-center my-4">
                        <Col md={4}>
                            <Card className="p-5">
                                <ValidateClaimsForm />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <h3>Validator Page</h3>
                        {address}<br/>
                        {seed}
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

export default connect(mapStateToProps, null)(ValidatorPage);