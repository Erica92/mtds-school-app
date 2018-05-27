import React from 'react';
import ReactDOM from 'react-dom';
import {Spinner} from '../components/BaseComponents';
import ParentDashboard from '../components/ParentDashboard';
import AppHeader from '../components/AppHeader';
import * as ApiCalls from '../api/parentAPI';
import CalendarPage from './CalendarPage';
import * as CONSTANTS from '../api/apiUtils';
import * as Utils from '../utils/Utils';

export default class ParentApp extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            parentID: "P1",
            isLoading: true,
            allLoaded: false,
            notificationList: [],           
            studentList: [],
            appointmentList: [],
            selectedStudent: {},
            pageState: "HomePage",
            prevPageState: ["HomePage"]
        }
        
        this.menuList = [{linkLabel: "Personal Data", linkName:"PersonalDataPage", icon:""},
                          {linkLabel: "Appointments", linkName:"AppointmentsPage", icon:""},
                          {linkLabel: "Payments", linkName:"PaymentsPage", icon:""},
                          {linkLabel: "Logout", linkName:"#", icon:""}];
        
        Utils.goToPage = Utils.goToPage.bind(this);
        Utils.goToPrevPage = Utils.goToPrevPage.bind(this);
        
        ApiCalls.fetchDataNotifications = ApiCalls.fetchDataNotifications.bind(this);
        ApiCalls.fetchDataParentStudents = ApiCalls.fetchDataParentStudents.bind(this);
        ApiCalls.fetchDataParentAppointments = ApiCalls.fetchDataParentAppointments.bind(this);
        
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
                                        appointmentList={this.state.appointmentList}
                                        studentList={this.state.studentList}
                                        selectedStudent={this.state.selectedStudent}
                                        goToPage={Utils.goToPage} />);
            } /*else if(this.state.pageState === "ClassPage"){
                componentToRender = (<ClassDetailsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                     selectedClass={this.state.selectedClass} />);
            }*/
        }
                                     
        return (
            <div>
                <AppHeader brand="https://mox.polimi.it/wp-content/themes/responsive_child/images/LogoPolitecnicoUfficiale.png" 
                                     user={user1} menuList={this.menuList}    
                                     goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage} onClickToggle={function(){}} />
                {componentToRender} 
            </div>
        );
    }
        
    getFetchAll(){
        return Promise.all([
            ApiCalls.fetchDataNotifications(this.state.parentID),
            ApiCalls.fetchDataParentStudents(this.state.parentID),
            ApiCalls.fetchDataParentAppointments(this.state.parentID),
        ])
    }

}
        
var user1 = {
    name: 'Mario',
    surname: 'Rossi',
    avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
    role: 'parent',
    fullName: 'Luigi Bianchi'
}