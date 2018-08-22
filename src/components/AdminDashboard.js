import React from 'react';
import {SquareTile} from './BaseTiles';


export default function AdminDashboard(props){
    return (
        <div className="app-content">

            <div className="squared-tile-block">
                <SquareTile title="Students" onClick={()=>props.goToPage("AdminStudentsPage")} />
                <SquareTile title="Payments" onClick={()=>props.goToPage("AdminPaymentsPage")} />
                <SquareTile title="Notifications" onClick={()=>props.goToPage("AdminNotificationsPage")} />
                <SquareTile title="Accounts" onClick={()=>props.goToPage("AdminAccountsPage")} />
            </div>
        </div>
    );
}

//example calling other components
//<BaseTile textArray={props.news} title="News" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />