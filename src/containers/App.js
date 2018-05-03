import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route, Link , Switch } from "react-router-dom";
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import TeacherApp from './TeacherApp';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import NoMatchPage from './NoMatchPage';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            authenticated: false,
            userType: "T"
        }
    }
    
    componentDidMount(){
        
    }
    
    render(){
        return (
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                {this.state.userType === "T" &&
                    <Route exact path="/teacherPortal" component={TeacherApp}/>
                }
                <Route component={NoMatchPage}/>
            </Switch>
        );
    }
    
}

var user1 = {
    name: 'Mario',
    surname: 'Rossi',
    avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
    role: 'teacher',
    fullName: 'Mario Rossi'
}