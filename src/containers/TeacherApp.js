import React from 'react';
import ReactDOM from 'react-dom';
import {Spinner} from '../components/BaseComponents';
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import ClassDetailsPage from '../components/ClassDetailsPage';
import GradesPage from '../components/GradesPage';
import SchedulePage from '../components/SchedulePage';
import TeacherPersonalDataPage from './TeacherPersonalDataPage';
import ProgramPage from './ProgramPage';
import CalendarPage from './CalendarPage';
import * as ApiCalls from '../api/teacherAPI';
import * as Utils from '../utils/Utils';
import * as CONSTANTS from '../api/apiUtils';

class TeacherApp extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            teacherID: this.props.user.Username,
            authenticatedUser: this.props.user,
            token: this.props.token,
            news: [],
            classList : [],
            selectedClass : null,
            notifications: [],
            schedule: [],
            appointments: [],
            pageState: "HomePage",
            prevPageState: ["HomePage"]
        };
        
        this.menuList = [{linkLabel: "Home Page", linkName:"HomePage", icon:""},,
                        {linkLabel: "Personal Data", linkName:"PersonalDataPage", icon:""},
                         {linkLabel: "Calendar", linkName:"CalendarPage", icon:""},
                          {linkLabel: "Logout", linkName:"#", icon:""}];
        
        this.AUTH_HEADERS = CONSTANTS.getSecurityHeaders(this.state.authenticatedUser, this.state.token);

        this.goToPage = this.goToPage.bind(this);
        this.goToPrevPage = this.goToPrevPage.bind(this);
        Utils.cleanPageHistory = Utils.cleanPageHistory.bind(this);
        this.fetchDataPersonalDataTeacher = ApiCalls.fetchDataPersonalDataTeacher.bind(this);

        this.selectClass = this.selectClass.bind(this);
    }
    
    componentDidMount(){
    	//this.fetchData();
        this.fetchDataClassesList(this.state.teacherID);
        this.fetchDataNotifications();
        this.fetchDataSchedule(this.state.teacherID, "day");
        this.fetchDataAppointments(this.state.teacherID, "day");
        this.fetchDataPersonalDataTeacher(this.state.teacherID).then(() => {
            var ruolo = "";
            var tipoUtente = this.state.authenticatedUser.Type;
            if(tipoUtente == 0){
                ruolo = "admin";
            } else if(tipoUtente == 1){
                ruolo = "teacher";
            } else if(tipoUtente == 2){
                ruolo = "parent";
            }
            var newUser = {
                fullName: this.state.teacherInfo.FirstName + " "+ this.state.teacherInfo.LastName,
                avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
                role: ruolo
            }

            this.setState({teacherInfo: newUser});
        });
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

        var _this = this;
        fetch("http://localhost:8080/api/v1/teacher/"+teacherID+"/classes", {headers:this.AUTH_HEADERS, credentials: 'include'})
            .then(response => response.json())
            .then( (result) => result.map((elem) => elem.TeachClass))
            .then( (resultList) => this.setState({
                    isLoading: false,
                    classList: resultList
                })
            );
    }
    
    fetchDataNotifications(){
        fetch("http://localhost:8080/api/v1/teacher/"+this.state.teacherID+"/notifications", {headers:this.AUTH_HEADERS, credentials: 'include'})
            .then(response => response.json())
            .then( (result) => this.setState({
                isLoading: false,
                notifications: result
            })
        );
        
        console.log(this.state.notifications);
    }
    
    fetchDataSchedule(teacherID, scope){
        fetch(CONSTANTS.HOST+"/api/v1/teacher/"+teacherID+"/agenda?scope="+scope, {headers:this.AUTH_HEADERS, credentials: 'include'})
            .then(response => response.json())
            .then( (result) => ( result == null )? 
                 this.setState({isLoading: false, schedule: []})
                : this.setState({isLoading: false, schedule: result
            })
        );
    }
    
    fetchDataAppointments(teacherID, scope){
        fetch(CONSTANTS.HOST+"/api/v1/teacher/"+teacherID+"/appointments?scope="+scope, {headers:this.AUTH_HEADERS, credentials: 'include'})
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
        //console.log("Rendering App - classList length"+classList.length+" state:"+this.state.pageState);
        
        var componentToRender = null;
        if(isLoading){
            componentToRender = (<Spinner />);
        } else {
            if(this.state.pageState === "HomePage"){
                componentToRender = (<AppContent news={news} classList={classList} 
                                     scheduleList={this.state.schedule} appointmentList={this.state.appointments}
                                     notificationList={notifications} goToPage={this.goToPage} 
                                     selectClass={this.selectClass} />);
            } else if(this.state.pageState === "ClassPage"){
                componentToRender = (<ClassDetailsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                     selectedClass={this.state.selectedClass} authHeaders={this.AUTH_HEADERS} />);
            } else if(this.state.pageState === "GradesPage"){
                componentToRender = (<GradesPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage} 
                                     selectedClass={this.state.selectedClass} teacher={this.state.teacherID} authHeaders={this.AUTH_HEADERS} />);
            } else if(this.state.pageState === "SchedulePage"){
                componentToRender = (<SchedulePage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage} 
                                     selectedClass={this.state.selectedClass} teacher={this.state.teacherID} authHeaders={this.AUTH_HEADERS} />);
            } else if(this.state.pageState === "PersonalDataPage"){
                componentToRender = (<TeacherPersonalDataPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage} 
                                     teacherID={this.state.teacherID} authHeaders={this.AUTH_HEADERS} />);
            } else if(this.state.pageState === "ProgramPage"){
                componentToRender = (<ProgramPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage} 
                                     classDetails={this.state.selectedClass} authHeaders={this.AUTH_HEADERS} />);
            } else if(this.state.pageState === "CalendarPage"){
                componentToRender = (<CalendarPage teacherID={this.state.teacherID} date={new Date()}
                                     classList={this.state.classList} authHeaders={this.AUTH_HEADERS} />);
            }
        }
        
        
        //<AppContent news={message} /> />
        return (
            <div>
                <AppHeader brand="https://mox.polimi.it/wp-content/themes/responsive_child/images/LogoPolitecnicoUfficiale.png" 
                                     user={this.state.teacherInfo} menuList={this.menuList}
                                     goToPage={this.goToPage} goToPrevPage={this.goToPrevPage} cleanPageHistory={Utils.cleanPageHistory}
                                     onClickToggle={function(){}} />
                {componentToRender} 
            </div>
        );
    }
}

export default TeacherApp;


