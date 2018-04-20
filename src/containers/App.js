import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import ClassDetailsPage from '../components/ClassDetailsPage';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            news: [],
            classList : [],
            notifications: [],
            pageState: "HomePage",
            prevPageState: "HomePage"
        };
        
        this.goToPage = this.goToPage.bind(this);
    }
    
    componentDidMount(){
    	//this.fetchData();
        this.fetchDataClassesList();
        this.fetchDataNotifications();
        //getClassesList(this.setState);
        
    }
    
    goToPage(nextPage){
        var currentPage = this.state.pageState;
        
        console.log("changing page - going from "+currentPage+" to "+nextPage);
        
        this.setState({
            pageState: nextPage,
            prevPage: currentPage
        });
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
    
    fetchDataNotifications(){
        fetch("http://localhost:8080/api/v1/teacher/notifications?id=T1")
            .then(response => response.json())
            .then( (result) => this.setState({
                isLoading: false,
                notifications: result
            })
        );
        
        console.log(this.state.notifications);
    }
    
    render(){
        const {isLoading, news, classList, notifications} = this.state;
        console.log("Rendering App - classList length"+classList.length+" state:"+this.state.pageState);
        
        var componentToRender = null;
        if(isLoading){
            componentToRender = (<div>ciaone</div>);
        } else {
            if(this.state.pageState === "HomePage"){
                componentToRender = (<AppContent news={news} classList={classList} notificationList={notifications} goToPage={this.goToPage} />);
            } else if(this.state.pageState === "ClassPage"){
                componentToRender = (<ClassDetailsPage goToPage={this.goToPage} />);
            }
        }
        
        
        //<AppContent news={message} /> />
        return (
            <div>
                <AppHeader brand="https://mox.polimi.it/wp-content/themes/responsive_child/images/LogoPolitecnicoUfficiale.png" user={user1} />
                {componentToRender} 
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
