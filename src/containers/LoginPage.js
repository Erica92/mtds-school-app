import React from 'react';

export default class LoginPage extends React.Component{
    
    constructor(props) {
        super(props);
        this.state={
          username:'',
          password:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        this.props.auth("ciao");
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
       alert('login');
       event.preventDefault();
     }
    
    render(){
        
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
    
}
