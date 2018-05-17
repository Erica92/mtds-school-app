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
            isLoading: true,
            parentID: 'P1',
            notificationList: [],           
            studentList: [],
            selectedStudent: {},
            pageState: "HomePage",
            prevPageState: ["HomePage"]
        }
        
        Utils.goToPage = Utils.goToPage.bind(this);
        Utils.goToPrevPage = Utils.goToPrevPage.bind(this);
        
        ApiCalls.fetchDataNotifications = ApiCalls.fetchDataNotifications.bind(this);
        ApiCalls.fetchDataParentStudents = ApiCalls.fetchDataParentStudents.bind(this);
        
    }
    
    componentDidMount(){
        ApiCalls.fetchDataNotifications(this.props.parentID);
        ApiCalls.fetchDataParentStudents(this.props.parentID);
    }
    
    render(){
        
        var componentToRender = null;
        if(this.state.isLoading){
            componentToRender = (<Spinner />);
        } else {
            if(this.state.pageState === "HomePage"){
                componentToRender = (<ParentDashboard notificationList={this.state.notificationList}
                                     studentList={this.state.studentList} goToPage={this.goToPage} 
                                     selectedStudent={this.state.selectedStudent} />);
            } /*else if(this.state.pageState === "ClassPage"){
                componentToRender = (<ClassDetailsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                     selectedClass={this.state.selectedClass} />);
            }*/
        }
                                     
        return (
            <div>
                <AppHeader brand="https://mox.polimi.it/wp-content/themes/responsive_child/images/LogoPolitecnicoUfficiale.png" user={user1}            goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage} onClickToggle={function(){}} />
                {componentToRender} 
            </div>
        );
    }
}
        
var user1 = {
    name: 'Mario',
    surname: 'Rossi',
    avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
    role: 'parent',
    fullName: 'Luigi Bianchi'
}
