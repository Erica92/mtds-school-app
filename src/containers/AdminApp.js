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

export default class AdminApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pageState: "HomePage",
            prevPageState: ["HomePage"]
        }

        this.menuList = [{linkLabel: "Students", linkName:"AdminStudentsPage", icon:""},
            {linkLabel: "Payments", linkName:"AdminPaymentsPage", icon:""},
            {linkLabel: "Notifications", linkName:"AdminNotificationsPage", icon:""},
            {linkLabel: "Accounts", linkName:"AdminAccountsPage", icon:""},
            {linkLabel: "Logout", linkName:"#", icon:""}];


        this.goToPage = Utils.goToPage.bind(this);
        this.goToPrevPage = Utils.goToPrevPage.bind(this);

    }


    render(){

        var componentToRender = null;

            if(this.state.pageState === "HomePage"){
                componentToRender = (<AdminDashboard goToPage={this.goToPage} />);
            } else if(this.state.pageState === "AdminStudentsPage"){
                componentToRender = (<AdminStudentsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                                       selectedClass={this.state.selectedClass} />);
            }
            /*else if(this.state.pageState === "AdminPaymentsPage"){
                componentToRender = (<ClassDetailsPage goToPage={Utils.goToPage} goToPrevPage={Utils.goToPrevPage}
                                                       selectedClass={this.state.selectedClass} />);
            } else if(this.state.pageState === "AdminNotificationsPage"){
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


}

var user1 = {
    name: 'Mario',
    surname: 'Rossi',
    avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
    role: 'admin',
    fullName: 'Luigi Bianchi'
}