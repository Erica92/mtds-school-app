import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import ClassDetailsPage from '../components/ClassDetailsPage';
import GradesPage from '../components/GradesPage';
import SchedulePage from '../components/SchedulePage';
import * as CONSTANTS from '../api/apiUtils';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            teacherID: "T1",
            news: [],
            classList : [],
            selectedClass : null,
            notifications: [],
            schedule: [],
            appointments: [],
            pageState: "HomePage",
            prevPageState: ["HomePage"]
        };
        
        this.goToPage = this.goToPage.bind(this);
        this.goToPrevPage = this.goToPrevPage.bind(this);
        this.selectClass = this.selectClass.bind(this);
    }
    
    componentDidMount(){
    	//this.fetchData();
        this.fetchDataClassesList("T1");
        this.fetchDataNotifications();
        this.fetchDataSchedule(this.state.teacherID, "day");
        this.fetchDataAppointments(this.state.teacherID, "day");
        //getClassesList(this.setState);
        console.log("componentDidMount!!!");
        
    }
    
    goToPage(nextPage){
        var currentPage = this.state.pageState;
        var newPrevPageState = this.state.prevPageState;
        newPrevPageState.push(currentPage);
        
        console.log("changing page - going from "+currentPage+" to "+nextPage);
        
        this.setState({
            pageState: nextPage,
            prevPageState: newPrevPageState
        });
    }
    
    goToPrevPage(){
        console.log("go to prev page");
        var currentPage = this.state.pageState;
        var prevPageState = this.state.prevPageState;
        console.log("prevPageState;"+prevPageState);
        var prevPage = prevPageState.pop();
        console.log("prevPageState;"+prevPageState);
        
        console.log("changing page - going from "+currentPage+" to "+prevPage);
        
        this.setState({
            pageState: prevPage,
            prevPageState: prevPageState
        });
    }
    
    selectClass(selectedElem, callBack){
        console.log("selected class:"+selectedElem);
        this.setState({selectedClass: selectedElem});
    }

    
    fetchDataClassesList(teacherID){
        fetch("http://localhost:8080/api/v1/teacher/classes?id="+teacherID)
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
    
    fetchDataSchedule(teacherID, scope){
        fetch(CONSTANTS.HOST+"/api/v1/teacher/agenda?id="+teacherID+"&scope="+scope)
            .then(response => response.json())
            .then( (result) => this.setState({
                isLoading: false,
                schedule: result
            })
        );
    }
    
      fetchDataAppointments(teacherID, scope){
        fetch(CONSTANTS.HOST+"/api/v1/teacher/appointments?id="+teacherID+"&scope="+scope)
            .then(response => response.json())
            .then( (result) => this.setState({
                isLoading: false,
                appointments: result
            })
        );
    }
    
    //http://localhost:8080/api/v1/teacher/agenda?id=T1&scope=day&class=C1
    //http://localhost:8080/api/v1/teacher/grades?id=T5&class=C5&subject=SubjectName5
    
    render(){
        const {isLoading, news, classList, notifications} = this.state;
        console.log("Rendering App - classList length"+classList.length+" state:"+this.state.pageState);
        
        var componentToRender = null;
        if(isLoading){
            componentToRender = (<div>ciaone</div>);
        } else {
            if(this.state.pageState === "HomePage"){
                componentToRender = (<AppContent news={news} classList={classList} 
                                     scheduleList={this.state.schedule} appointmentList={this.state.appointments}
                                     notificationList={notifications} goToPage={this.goToPage} 
                                     selectClass={this.selectClass} />);
            } else if(this.state.pageState === "ClassPage"){
                componentToRender = (<ClassDetailsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                     selectedClass={this.state.selectedClass} />);
            } else if(this.state.pageState === "GradesPage"){
                componentToRender = (<GradesPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage} 
                                     selectedClass={this.state.selectedClass} teacher={this.state.teacherID} />);
            } else if(this.state.pageState === "SchedulePage"){
                componentToRender = (<SchedulePage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage} 
                                     selectedClass={this.state.selectedClass} teacher={this.state.teacherID} />);
            }
        }
        
        
        //<AppContent news={message} /> />
        return (
            <div>
                <AppHeader brand="https://mox.polimi.it/wp-content/themes/responsive_child/images/LogoPolitecnicoUfficiale.png" user={user1} goToPage={this.goToPage} />
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
