// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AdminList from './Pages/AdminList';
import AdminCreate from './Pages/AdminCreate';
import AdminEdit from './Pages/AdminEdit';
import DonationCampList from './Pages/DonationCampList';
import UserList from './Pages/UserList';
// Import other pages as needed

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Sidebar />
                <main className="main-content">
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/admins" />
                        </Route>
                        <Route exact path="/admins" component={AdminList} />
                        <Route exact path="/admins/create" component={AdminCreate} />
                        <Route exact path="/admins/edit/:id" component={AdminEdit} />
                        <Route exact path="/donationcamps" component={DonationCampList} />
                        <Route exact path="/users" component={UserList} />
                        {/* Add more routes as needed */}
                        <Route path="*">
                            <h2 style={{ padding: '20px', marginLeft: '220px', marginTop: '80px' }}>404 - Page Not Found</h2>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;
