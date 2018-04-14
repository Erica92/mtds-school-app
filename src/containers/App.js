import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
         isLoading: true,
         news: [],
         classList : []
        };
    }
    
    componentDidMount(){
    	this.fetchData();
        this.fetchDataClassesList();
    }
    
    fetchData(){
        
        fetch("https://api.whatdoestrumpthink.com/api/v1/quotes")
          .then(response => response.json())
          .then( result => result.messages.personalized.map(elem => (
            {
                title: "News",
                text: elem   
            })))
        .then(news => this.setState({
            isLoading: false,
            news
        }));

           /* {
                messages: {
                    personalized: `${quote.messages.personalized}`,
                    non_personalized: `${quote.messages.non_personalized}`
                }
            }
        ))
        .then(messages => this.setState({
            messages,
            isLoading: false
        }))
        .catch(error => console.log('parsing failed', error));*/
        
        console.log("messages:"+this.state.news);
    }
    
    fetchDataClassesList(){
        fetch("http://localhost:8080/api/v1/teacher/classes?id=T1")
            .then(response => response.json())
            .then( (result) => this.setState({
                isLoading: false,
                classList: result
            })
        );
    }
    
    render(){
        const {isLoading, news, classList} = this.state;
        console.log("classList length"+classList.length);
        //<AppContent news={message} /> />
        return (
            <div>
                <AppHeader brand="https://mox.polimi.it/wp-content/themes/responsive_child/images/LogoPolitecnicoUfficiale.png" user={user1} />
                {
                    !isLoading && news.length > 0 ? 
                        (<AppContent news={news} classList={classList}/>)
                    : ( <div>ciaone</div> )
                } 
            </div>
        );
    }
}

export default App;

//to delete mock

var user1 = {
    name: 'Mario',
    surname: 'Rossi',
    avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
    role: 'teacher',
    fullName: 'Mario Rossi'
}

//API FETCH
//https://api.whatdoestrumpthink.com/api/v1/quotes

/*
in this way it automatically create a js obj like the json

fetch("https://api.whatdoestrumpthink.com/api/v1/quotes")
          .then(response => response.json())
          .then( (result) => this.setState({
            isLoading: false,
            news: result.messages.personalized
        }));
*/

/*
        fetch("https://api.whatdoestrumpthink.com/api/v1/quotes")
          .then(response => response.json())
          .then( result => result.messages.map(elem => (
            {
                news: {
                    title: "ciao",
                    text: elem.personalized
                }
            })))
        .then(news => this.setState({
            isLoading: false,
            news
        }));
*/
