import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// the components related to general purpose for end-users
import MainPage from './pages/MainPage.js'
import HelpPage from './pages/HelpPage.js'

// the componentes related to account for end-users
import AccountPage from './pages/account/AccountPage.js'
import LoginPage from './pages/account/LoginPage.js'
import RegisterPage from './pages/account/RegisterPage.js'

// the components related to the main function of pomodoro locker
import ManagePage from './pages/session/ManagePage.js'



const Router = () => (
    <BrowserRouter>
        <Switch>
            {/* <Route path="/" component={MainPage}></Route> */}
            <Route path="/help" component={HelpPage}></Route>
            <Route path="/account" component={AccountPage}></Route>
            <Route path="/" component={LoginPage}></Route>
            <Route path="/account/register" component={RegisterPage}></Route>
            <Route path="/manage" component={ManagePage}></Route>
        </Switch>
    </BrowserRouter>
)

export default Router
