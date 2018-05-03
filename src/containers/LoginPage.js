import React from 'react';

export default class LoginPage extends React.Component{
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        
    }
    
    render(){
        
        //inside the render method you can puth the html
        return (
            <div>
            <h1>LoginPage</h1>
            <form>
                <input type="text" />
                <input type="text" />
                <input type="Submit" />
            </form>
            </div>
        );
    }
    
    //here you can put other functions for login
}