import React, { Component, useEffect, useState } from 'react';

import './App.css';
import './assets/css/theme.css';
import './assets/css/style.css';
// import './assets/css/inonic.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  matchPath,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './pages/Login';
import LeftNav from './layout/LeftNav';
import TopNav from './layout/TopNav';
import Error404 from './global/Error404';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
// import SelfProfilePage from './pages/SelfProfilePage';
import SettingsRetail from './pages/SettingsRetail';
import UserPage from './pages/UserPage';
import CredentialPage from './pages/CredentialPage';
import DocumentPage from './pages/DocumentPage';
import PaymentInPage from './pages/PaymentInPage';
import CatoryPage from './pages/CatoryPage';
import WithdrawPage from './pages/WithdrawPage';
import JobsPage from './pages/JobsPage';
import LicensePage from './pages/LicensePage';
import QuizPage from './pages/QuizPage';
import GetStarted from './pages/GetStarted';
import CoverListsPage from './pages/CoverListsPage';
import CoverListDetails from './components/coverlists/CoverListDetails';
import CoverPagePrint from './pages/AgInsurancePage/print/CoverPagePrint';

import PolicyPaidBy from './pages/PolicyPaidBy';
import PolicyDetails from './components/policypaidbyid/PolicyDetails';

import AgInsurancePage from './pages/AgInsurancePage';
import AgVehicle from './pages/AgInsurancePage/vehicle/Vehicle';

import IeIPage from './pages/IeiPage';
import IeIVehicle from './pages/IeiPage/vehicle/Vehicle';
import CoverPagePrintIEI from './pages/IeiPage/print/CoverPagePrint';

import NoorTakafulPage from './pages/NoorTakafulPage';
import NoorVehicle from './pages/NoorTakafulPage/vehicle/Vehicle';
import PolicyVendorsPage from './pages/PolicyVendorsPage';

const App = (props) => {
  const history = useHistory();

  const { pathname } = history.location;

  const [hideSidebarNav, setHideSidebarNav] = useState(true);

  useEffect(() => {
    const matchAG = matchPath(pathname, {
      path: '/coverlists/print-ag/:id',
      exact: true,
    });

    const matchIEI = matchPath(pathname, {
      path: '/coverlists/print-iei/:id',
      exact: true,
    });

    setHideSidebarNav(!!matchAG || !!matchIEI);
  }, [pathname]);

  let login_layout = true;
  if (props.data.login_layout === 'STEPHEN_WHOCODED') {
    login_layout = false;
  } else {
    login_layout = true;
  }

  return (
    <>
      <div className={login_layout ? 'st-bg-gray3 st-scroll' : ''}>
        {hideSidebarNav ? login_layout : login_layout && <LeftNav />}

        <div
          className={
            hideSidebarNav
              ? login_layout
              : login_layout &&
                `content ht-100v ${props.data.mmm ? 'stttttg' : ''} pd-0`
          }
        >
          {hideSidebarNav ? login_layout : login_layout && <TopNav />}
          <div className={login_layout ? 'container pd-x-0 p-0' : ''}>
            {login_layout ? <div className='st-empty'></div> : ''}
            <div className={login_layout ? 'content-body' : ''}>
              <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/logout' exact component={Logout} />
                <Route path='/login' exact component={Login} />
                <Route path='/getstarted' exact component={GetStarted} />
                <Route path='/dashboard' exact component={Dashboard} />
                {/* <Route path='/profile' exact component={SelfProfilePage} /> */}

                <Route path='/users' exact component={UserPage} />

                <Route path='/company' exact component={CredentialPage} />
                <Route path='/documents' exact component={DocumentPage} />
                <Route path='/payment-info' exact component={PaymentInPage} />
                <Route path='/vehicles' exact component={CatoryPage} />
                <Route path='/policies' exact component={PolicyPaidBy} />
                <Route path='/policies/:id' exact component={PolicyDetails} />

                <Route path='/license' exact component={LicensePage} />
                <Route path='/jobs' exact component={JobsPage} />
                <Route path='/quiz' exact component={QuizPage} />
                <Route path='/withdrawals' exact component={WithdrawPage} />
                <Route path='/coverlists' exact component={CoverListsPage} />
                <Route
                  path='/coverlists/:id'
                  exact
                  component={CoverListDetails}
                />

                <Route path='/vendors' exact component={PolicyVendorsPage} />
                <Route
                  path='/vendors/aginsurance'
                  exact
                  component={AgInsurancePage}
                />
                <Route
                  path='/vendors/aginsurance/vehicle'
                  exact
                  component={AgVehicle}
                />
                <Route path='/vendors/iei' exact component={IeIPage} />
                <Route
                  path='/vendors/iei/vehicle'
                  exact
                  component={IeIVehicle}
                />

                <Route
                  path='/coverlists/print-ag/:id'
                  exact
                  component={CoverPagePrint}
                />

                <Route
                  path='/coverlists/print-iei/:id'
                  exact
                  component={CoverPagePrintIEI}
                />
                <Route
                  path='/vendors/noortakaful'
                  exact
                  component={NoorTakafulPage}
                />
                <Route
                  path='/vendors/noortakaful/vehicle'
                  exact
                  component={NoorVehicle}
                />
                <Route
                  path='/settings/retail-partnership'
                  exact
                  component={SettingsRetail}
                />
                <Route
                  render={function () {
                    return (
                      <div className='st-e-h'>
                        <Error404 />
                      </div>
                    );
                  }}
                />
              </Switch>
            </div>
            {login_layout ? <div className='st-empty-larg'></div> : ''}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(App);
