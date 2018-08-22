import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
// wrappers
import { UserIsNotAuthenticated, UserIsAuthenticated } from './wrappers'
// layouts
import LayoutRoute from './components/layouts/LayoutRoute';
import AppLayout from './components/layouts/AppLayout';
// pages
import MainPage from './pages/MainPage';
import CandidatePage from './pages/CandidatePage';
import ValidatorPage from './pages/ValidatorPage';
import EmployeerPage from './pages/EmployeerPage';

class App extends Component {

    render() {
        return (
            <Switch>
                <LayoutRoute exact path="/" layout={AppLayout} component={UserIsNotAuthenticated(MainPage)} />
                <LayoutRoute exact path="/candidate" layout={AppLayout} component={UserIsAuthenticated(CandidatePage)} />
                <LayoutRoute exact path="/validator" layout={AppLayout} component={UserIsAuthenticated(ValidatorPage)} />
                <LayoutRoute exact path="/employeer" layout={AppLayout} component={UserIsAuthenticated(EmployeerPage)} />
            </Switch>
        );
    }
}

export default App;