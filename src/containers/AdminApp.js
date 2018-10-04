import React from 'react';
import ReactDOM from 'react-dom';
import {Spinner} from '../components/BaseComponents';
import AdminDashboard from '../components/AdminDashboard';
import AppHeader from '../components/AppHeader';
import * as ApiCalls from '../api/parentAPI';
import CalendarPage from './CalendarPage';
import StudentDetailsPage from './StudentDetailsPage';
import ParentPersonalDataPage from './ParentPersonalDataPage';
import StudentPersonalDataPage from './StudentPersonalDataPage';
import PaymentPage from './PaymentPage';
import * as CONSTANTS from '../api/apiUtils';
import * as Utils from '../utils/Utils';
import AdminStudentsPage from "./AdminStudentsPage";
import AdminPaymentsPage from "./AdminPaymentsPage";
import NotificationForm from "../components/NotificationForm"

export default class AdminApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            adminID: this.props.user.Username,
            authenticatedUser: this.props.user,
            token: this.props.token,
            pageState: "HomePage",
            prevPageState: ["HomePage"],
            newNotification: {}
        }

        this.menuList = [{linkLabel: "Students", linkName:"AdminStudentsPage", icon:""},
            {linkLabel: "Payments", linkName:"AdminPaymentsPage", icon:""},
            {linkLabel: "Notifications", linkName:"AdminNotificationsPage", icon:""},
            {linkLabel: "Accounts", linkName:"AdminAccountsPage", icon:""},
            {linkLabel: "Logout", linkName:"#", icon:""}];

        this.AUTH_HEADERS = CONSTANTS.getSecurityHeaders(this.state.authenticatedUser, this.state.token);

        this.goToPage = Utils.goToPage.bind(this);
        this.goToPrevPage = Utils.goToPrevPage.bind(this);
        this.handleSubmitNotification = this.handleSubmitNotification.bind(this);
        this.handleInputChangeNotification = this.handleInputChangeNotification.bind(this);

    }


    render(){

        var componentToRender = null;

            if(this.state.pageState === "HomePage"){
                componentToRender = (<AdminDashboard goToPage={this.goToPage} />);
            } else if(this.state.pageState === "AdminStudentsPage"){
                componentToRender = (<AdminStudentsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                                       selectedClass={this.state.selectedClass} adminID={this.state.adminID} />);
            } else if(this.state.pageState === "AdminNotificationsPage"){
                componentToRender = (<NotificationForm goToPage={this.goToPage} goToPrevPage={this.goToPrevPage} 
                                                        handleSubmit={this.handleSubmitNotification}
                                                        handleInputChange={this.handleInputChangeNotification} />);
            }
            else if(this.state.pageState === "AdminPaymentsPage"){
                componentToRender = (<AdminPaymentsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                                       selectedClass={this.state.selectedClass} />);
            }/* else if(this.state.pageState === "AdminNotificationsPage"){
                componentToRender = (<ClassDetailsPage goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage}
                                                       selectedClass={this.state.selectedClass} />);
            } else if(this.state.pageState === "AdminAccountsPage"){
                componentToRender = (<ClassDetailsPage goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage}
                                                       selectedClass={this.state.selectedClass} />);
            }
            */

        //}

        return (
            <div>
                <AppHeader brand="https://mox.polimi.it/wp-content/themes/responsive_child/images/LogoPolitecnicoUfficiale.png"
                           user={user1} menuList={this.menuList}
                           goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage} onClickToggle={function(){}} />
                {componentToRender}
            </div>
        );
    }

    postNotification(){
        let newNotification = Object.assign({}, this.state.newNotification);

        delete newNotification.DestinationIDType;

        var data = JSON.stringify(this.state.newNotification);
        
        console.log(data);
        
        fetch(CONSTANTS.HOST+"/api/v1/admin/notification", {
            method: "POST",
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: data
        }).then((res) => res.json())
            .then((data) => {
            console.log("data:"+data);
            let message = "";
            if(data.code == 200){
                message = "Notification added";
            } else {
                message = "Sorry, an error occurred";
                console.log("post error:"+data.message);
            }
            /*
            this.setState({
                modificationResult: message
            });
            Modals.openModal("resultModal");*/
            

        });
    }
    
    handleInputChangeNotification(event) {
        const target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        if(name === "StartDate" || name==="EndDate"){
            let formattedDate = new Date(value);
            value = formattedDate;
        }

        let newNotification = this.state.newNotification;
        newNotification[name] = value;

        this.setState({
          newNotification: newNotification
        });
    }
    
    handleSubmitNotification(event) {
        event.preventDefault();
        this.postNotification();
    }



}

var user1 = {
    name: 'Mario',
    surname: 'Rossi',
    avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
    role: 'admin',
    fullName: 'Luigi Bianchi'
}