import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { replace } from 'connected-react-router'

const locationHelper = locationHelperBuilder({});

export const UserIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/',
    authenticatedSelector: state => state.wallet.init,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectAction: newLoc => (dispatch) => {
        dispatch(replace(newLoc));
    }
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/candidate',
    allowRedirectBack: false,
    authenticatedSelector: state => !state.wallet.init,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectAction: newLoc => (dispatch) => {
        dispatch(replace(newLoc));
    }
});

export const VisibleOnlyAuth = connectedAuthWrapper({
    authenticatedSelector: state => state.wallet.init,
    wrapperDisplayName: 'VisibleOnlyAuth'
})

export const HiddenOnlyAuth = connectedAuthWrapper({
    authenticatedSelector: state => !state.wallet.init,
    wrapperDisplayName: 'HiddenOnlyAuth'
})
