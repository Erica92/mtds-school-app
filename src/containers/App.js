import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route, Link , Switch, Redirect } from "react-router-dom";
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import TeacherApp from './TeacherApp';
import ParentApp from './ParentApp';
import AdminApp from './AdminApp';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import NoMatchPage from './NoMatchPage';
import * as CONSTANTS from '../api/apiUtils';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            authenticatedUser: null,
            authenticated: false,
            username: "",
            password: "",
            userType: "",
            flagAuth: false
        }
        
        this.redirectToPortal = this.redirectToPortal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAuth = this.getAuth.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }
    
    componentDidMount(){
        
    }
    
    getAuth(flagAuth, authenticatedUser){
        console.log("getAuth");
        if(flagAuth){
            this.setState={
                authenticated: flagAuth,
                user: authenticatedUser,
                userType: '',
            }
        } else {
            this.setState={
                authenticated: false,
                user: null,
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

    isLoggedIn(){
        console.log("this.state.authenticated:"+this.state.authenticated);
        return this.state.authenticated;
    }

    redirectToPortal(){
        let userType = this.state.authenticatedUser.Type;
        console.log("userType"+userType);
        switch(userType){
            case 0:
                console.log("0");
                return (<Redirect to="/adminPortal" />);
                break;
            case 1:
            console.log("1");
                return (<Redirect to="/teacherPortal" />);
                break;
            case 2:
            console.log("2");
                return (<Redirect to="/parentPortal" />);
                break;
        }
    }
    
    render(){
        var componentToRender = (<form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
            </label>
            <label>
              Password:
              <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );

        var authenticated = this.state.authenticated;
        return (
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" render={ () => (!authenticated ? componentToRender : this.redirectToPortal())}/>
                <Route exact path="/teacherPortal" render={() => (this.isLoggedIn() ? <TeacherApp user={this.state.authenticatedUser} /> : <Redirect to="/login"/>)} />
                <Route exact path="/parentPortal" render={() => (this.isLoggedIn() ? <ParentApp user={this.state.authenticatedUser} /> : <Redirect to="/login"/>)} />
                <Route exact path="/adminPortal" render={() => (this.isLoggedIn() ? <AdminApp user={this.state.authenticatedUser} /> : <Redirect to="/login"/>)} />
                <Route component={NoMatchPage}/>
            </Switch>
        );
    }
    
    //here you can put other functions for login
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        var premToken = this.fetchDataToken();
        var premJsonRes = premToken.then((res) => res.json());

        Promise.all([premToken,premJsonRes]).then(([response,jsonRes]) => {
          if(response.ok){
            return this.fetchDataLogin(jsonRes.message)
          } else {
            return null;
          }
        })

    }

    fetchDataToken(){
        return fetch(CONSTANTS.HOST+"/protected", {credentials: 'include'});
    };
  
    fetchDataLogin(token){
    console.log("fetchDataLogin");
    var userInput = {
        Username: this.state.username,
        Password: this.state.password,
        Type: ''
    }
    var data = JSON.stringify(userInput);

    /* var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-CSRF-TOKEN", token);*/

    return fetch(CONSTANTS.HOST+"/api/v1/login", {
        method: "POST",
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
            },
            credentials: 'include',
            body: data
        })
        .then(response => response.json())
        .then((jsonRes) => this.setState({
            authenticatedUser: jsonRes,
            token: token,
            authenticated: true
        })
    )
    };
}

var user1 = {
    name: 'Mario',
    surname: 'Rossi',
    avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
    role: 'teacher',
    fullName: 'Mario Rossi',
    username: 'T1'
}

//<Route exact path="/login" render={() =>(!this.state.authenticated ? <LoginPage auth={this.getAuth} /> : <TeacherApp user={this.state.user} /> )}/>
//<Route exact path="/login" render={props =>(<LoginPage auth={this.getAuth} />)}/>
//<Route exact path="/login" render={props =>(<LoginPage auth={this.getAuth} />)}/>

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