/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles

import "modules_config/bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

// pages
import Index		from "views/Index.js";
import NucleoIcons	from "views/NucleoIcons.js";
import LandingPage	from "views/examples/LandingPage.js";
import ProfilePage	from "views/examples/ProfilePage.js";
import Home			from "views/Home.js";

// Cat
import CatListTabs		from "components/Cats/CatListTab.js";
import CatDetailsTabs	from "components/Cats/CatDetailsTab.js";

// Cattery
import CatteryTests						from "views/CatteryTests.js";
import CatteryBirthReports				from "views/CatteryBirthReports.js";
import CatteryTransfers					from "views/CatteryTransfers.js";
import CatteryInvoices					from "views/CatteryInvoices.js";
import CatteryShowResults				from "views/CatteryShowResults.js";
import CatteryShowSubscriptions			from "views/CatteryShowSubscriptions.js";
import CatteryShowSubscriptionsWizard	from "views/CatteryShowSubscriptionsWizard.js";
import CatteryShowSubsWizardPage2		from "views/subswizard/CatteryShowSubsWizardPage2.js";
import CatteryShowSubsWizardPage3		from "views/subswizard/CatteryShowSubsWizardPage3.js";

// others
import AuthenticatedRoute	from "./components/Routes/AuthenticatedRoute";
import Logout				from "./components/Routes/Logout";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <AuthenticatedRoute exact path="/nucleo-icons">
		<NucleoIcons />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/home">
		<Home />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/catlist-tabs">
		<CatListTabs />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cattery-birth-reports">
		<CatteryBirthReports />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cattery-tests">
		<CatteryTests />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cattery-transfers">
		<CatteryTransfers />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cattery-invoices">
		<CatteryInvoices />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cattery-show-results">
		<CatteryShowResults />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cattery-domestic-subscriptions">
		<CatteryShowSubscriptions />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cattery-domestic-add-subscriptions">
		<CatteryShowSubscriptionsWizard />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cattery-domestic-add-subscriptions-2">
		<CatteryShowSubsWizardPage2 />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cattery-domestic-add-subscriptions-3">
		<CatteryShowSubsWizardPage3 />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/cat-details/:id">
		<CatDetailsTabs />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/logout">
		<Logout />
      </AuthenticatedRoute>

      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
