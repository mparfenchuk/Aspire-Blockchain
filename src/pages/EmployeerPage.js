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

import VerifyClaims from '../components/VerifyClaims';

import { showCandidateToEmployeer, setEmployeerData } from '../actions'
class EmployeerPage extends Component {

    constructor(props) {
        super(props) 

        this.toCandidate = this.toCandidate.bind(this);

        this.claims = [
            {"title":"Teacher","validator":"INVISIBLE","certifier":"INVISIBLE","status":"INVISIBLE","date":"INVISIBLE"}, 
            {"title":"Singer","validator":"INVISIBLE","certifier":"INVISIBLE","status":"INVISIBLE","date":"INVISIBLE"}
        ]
    }

    toCandidate = (address) => {

        let { showCandidateToEmployeer } = this.props;
        showCandidateToEmployeer(address);
    }

    componentDidMount(){

        let { setEmployeerData } = this.props;

        setEmployeerData(0);

        let counter = 0;
        this.intervalId = setInterval(function() {
            counter++;
            setEmployeerData(counter);
        }, 5000);
    }

    componentWillUnmount(){

        clearInterval(this.intervalId);
    }

    render() {

        let { page, candidate, candidates, employeerError } = this.props

        return (
            <section className="mb-5">
                <Container className="py-4">
                    <Row className="justify-content-center align-items-center">
                        <Col md={10} lg={8}>
                            <Card className="my-4">
                                <CardHeader>Employeer</CardHeader>
                                <CardBody>
                                    {employeerError && <Alert color="danger">{employeerError}</Alert>}
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Company</th>
                                                <td>Google Inc</td>
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
                                                {candidates.map((candidate, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index +1}</th>
                                                        <td><a href={"https://ropsten.etherscan.io/address/"+candidate.address} target="_blank">{candidate.address.length > 7 ? candidate.address.slice(0, 7 - 1) + "…" : candidate.address}</a></td>
                                                        <td>{candidate.validated}</td>
                                                        <td><Button type="button" onClick={this.toCandidate.bind(this, candidate.address)} color="link">View</Button></td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            :
                                page === "candidate" ? 
                                    <VerifyClaims candidate={candidate} />
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
        page: state.employeerPage.page,
        candidate: state.employeerPage.candidate,
        candidates: state.employeerPage.candidates,
        employeerError: state.employeerPage.validatorError
    }
}

export default connect(mapStateToProps, { setEmployeerData, showCandidateToEmployeer })(EmployeerPage);