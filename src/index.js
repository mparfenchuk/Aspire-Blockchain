import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker';
import App from './App';

//import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
), document.getElementById('root')
);

registerServiceWorker();
