import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route, Link , Switch, Redirect } from "react-router-dom";
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import TeacherApp from './TeacherApp';
import ParentApp from './ParentApp';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import NoMatchPage from './NoMatchPage';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            authenticated: false,
            username: "",
            userType: "T"
        }
        
        this.getAuth = this.getAuth.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }
    
    componentDidMount(){
        
    }
    
    getAuth(flagAuth, username, userType){
        if(flagAuth){
            this.setState={
                authenticated: flagAuth,
                username: username,
                userType: userType,
            }
        } else {
            this.setState={
                authenticated: false,
                username: '',
                userType: '',
            }
        }
        console.log("state:"+this.state.authenticated + this.state.username + this.state.userType);
    }
    
    isAuthenticated(){
        if(this.state.userType && this.state.username && this.state.authenticated){
            return true
        } else {
            return <Redirect to="/login" />;
        }
    }
    
    render(){
        return (
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" render={props =>(<LoginPage auth={this.getAuth} />)}/>
                <Route exact path="/teacherPortal" component={TeacherApp} onEnter={this.isAuthenticated}/>
                <Route exact path="/parentPortal" component={ParentApp} onEnter={this.isAuthenticated}/>
                <Route exact path="/adminPortal" component={AdminApp} onEnter={this.isAuthenticated}/>
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



/*function requireAuth(nextState, replace) {
  if (!userExists()) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export const renderRoutes = () => (
  <Router history={browserHistory}>
      <Route path="protectedRoute" component={Protected} onEnter={requireAuth} />
      <Route path="signin" component={SignIn} />
    </Route>
  </Router>
);
Then, in the SignIn component, you can redirect after a successful sign in like this:

signInFunction({params}, (err, res) => {
  // Now in the sign in callback
  if (err)
    alert("Please try again")
  else {
    const location = this.props.location
    if (location.state && location.state.nextPathname) {
      browserHistory.push(location.state.nextPathname)
    } else {
      browserHistory.push('/')
    }
  }
})*/

//https://reacttraining.com/react-router/web/example/auth-workflow