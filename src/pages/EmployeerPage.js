import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,
    Row
} from 'reactstrap';

class EmployeerPage extends Component {

    render() {

        let { address, seed } = this.props

        return (
            <section className="mb-5">
                <Container className="py-4">
                    <Row>
                        <h3>Employeer Page</h3>
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

export default connect(mapStateToProps, null)(EmployeerPage);