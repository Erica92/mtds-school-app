import React from 'react';
import ReactDOM from 'react-dom';
import {Spinner} from '../components/BaseComponents';
import ParentDashboard from '../components/ParentDashboard';
import AppHeader from '../components/AppHeader';
import * as ApiCalls from '../api/parentAPI';
import CalendarPage from './CalendarPage';
import StudentDetailsPage from './StudentDetailsPage';
import ParentPersonalDataPage from './ParentPersonalDataPage';
import StudentPersonalDataPage from './StudentPersonalDataPage';
import PaymentPage from './PaymentPage';
import * as CONSTANTS from '../api/apiUtils';
import * as Utils from '../utils/Utils';
import * as Modals from '../components/ModalComponents';

export default class ParentApp extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            parentID: this.props.user.username,
            isLoading: true,
            allLoaded: false,
            notificationList: [],           
            studentList: [],
            appointmentsList: [],
            selectedStudent: {},
            pageState: "HomePage",
            prevPageState: ["HomePage"]
        }
        
        this.menuList = [{linkLabel: "Home Page", linkName:"HomePage", icon:""},
                        {linkLabel: "Personal Data", linkName:"ParentPersonalDataPage", icon:""},
                        {linkLabel: "Appointments", linkName:"AppointmentsPage", icon:""},
                        {linkLabel: "Payments", linkName:"PaymentsPage", icon:""},
                        {linkLabel: "Logout", linkName:"#", icon:""}];
        
        Utils.goToPage = Utils.goToPage.bind(this);
        Utils.goToPrevPage = Utils.goToPrevPage.bind(this);
        Utils.cleanPageHistory = Utils.cleanPageHistory.bind(this);
        
        this.selectStudent = this.selectStudent.bind(this);
        
        this.fetchDataNotifications = ApiCalls.fetchDataNotifications.bind(this);
        this.fetchDataParentStudents = ApiCalls.fetchDataParentStudents.bind(this);
        this.fetchDataParentAppointments = ApiCalls.fetchDataParentAppointments.bind(this);
        
    }
    
    componentDidMount(){
        this.getFetchAll().then(() => this.setState({allLoaded: true}));
    }
    
    render(){
        
        var componentToRender = null;
        if(!this.state.allLoaded){
            componentToRender = (<Spinner />);
        } else {
            if(this.state.pageState === "HomePage"){
                componentToRender = (<ParentDashboard notificationList={this.state.notificationList} 
                                        appointmentList={this.state.appointmentsList}
                                        studentList={this.state.studentList}
                                        selectStudent={this.selectStudent}
                                        goToPage={Utils.goToPage} />);
            } else if(this.state.pageState === "StudentDetailsPage"){
                componentToRender = (<StudentDetailsPage goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage}
                                        selectedStudent={this.state.selectedStudent} parentID={this.state.parentID} />);
            } else if(this.state.pageState === "ParentPersonalDataPage"){
                componentToRender = (<ParentPersonalDataPage goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage}
                                        parentID={this.state.parentID} />);
            } else if(this.state.pageState === "StudentPersonalDataPage"){
                componentToRender = (<StudentPersonalDataPage goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage}
                                        student={this.state.selectedStudent} parent={this.state.parentID} />);
            } else if(this.state.pageState === "AppointmentsPage"){
                componentToRender = (<CalendarPage parentID={this.state.parentID} date={new Date()}
                                     classList={this.state.classList} parentStudentList={this.state.studentList} />);
            } else if(this.state.pageState === "PaymentsPage"){
                componentToRender = (<PaymentPage goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage}
                                        parentID={this.state.parentID} />);
            } 
                          
                                     
        }
                                     
        return (
            <div>
                <AppHeader brand="https://mox.polimi.it/wp-content/themes/responsive_child/images/LogoPolitecnicoUfficiale.png" 
                                     user={user1} menuList={this.menuList}    
                                     goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage} cleanPageHistory={Utils.cleanPageHistory}
                                     onClickToggle={function(){}} />
                {componentToRender} 
            </div>
        );
    }
        
    getFetchAll(){
        return Promise.all([
            this.fetchDataNotifications(this.state.parentID),
            this.fetchDataParentStudents(this.state.parentID),
            this.fetchDataParentAppointments(this.state.parentID, "day"),
        ])
    }
    
    selectStudent(student){
        console.log("selectedStudent: "+student.Username);
        this.setState({selectedStudent: student});
    }

}
        
var user1 = {
    name: 'Mario',
    surname: 'Rossi',
    avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
    role: 'parent',
    fullName: 'Luigi Bianchi'
}
