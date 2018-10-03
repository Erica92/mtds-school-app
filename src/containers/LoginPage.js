import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route, Link , Switch, Redirect } from "react-router-dom";
import * as CONSTANTS from '../api/apiUtils';

export default class LoginPage extends React.Component{
    
    constructor(props) {
        super(props);
        this.state={
          authenticatedUser: null,
          isAuthenticated: false,
          username:'',
          password:'',
          token: null,
          userType: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        
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
        
        /*this.fetchDataToken()
        .then((token) => this.fetchDataLogin(token))
        .then(() => {
          console.log(this.state.authenticatedUser);
          this.props.auth(true, this.state.username, this.state.userType);
        });*/
        
        var premToken = this.fetchDataToken();
        var premJsonRes = premToken.then((res) => res.json());

        Promise.all([premToken,premJsonRes]).then(([response,jsonRes]) => {
          if(response.ok){
            return this.fetchDataLogin(jsonRes.message)
          } else {
            return null;
          }
        })

        this.props.auth(true, this.state.authenticatedUser);
         //here is passing data to the father
        
     }
    
    render(){
        var componentToRender;

        //inside the render method you can puth the html
        return (
          <form onSubmit={this.handleSubmit}>
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
    }

    fetchDataToken(){
      return fetch(CONSTANTS.HOST+"/protected");
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
      console.log("token:"+token);

      /*'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': this.state.token*/
      return fetch(CONSTANTS.HOST+"/api/v1/login", {
          method: "POST",
              mode: 'cors',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': token
              },
              body: data
        })
        .then(response => response.json())
        .then((jsonRes) => this.setState({
            authenticatedUser: jsonRes,
            token: token,
            isAuthenticated: true
        })
      )
    };
    
}
