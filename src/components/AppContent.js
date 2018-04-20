import React from 'react';
import BaseTile from './BaseTiles';
import {SectionTitleTile} from './BaseTiles';
import {SquareTile} from './BaseTiles';
import ClassListComponent from './ClassListComponent';
import NotificationListComponent from './NotificationListComponent';
import ClassDetailsPage from './ClassDetailsPage';

function AppContent(props){
    return (
        <div class="app-content">
            <NotificationListComponent title="Notifications" notificationList={props.notificationList} />
            
            <ClassListComponent classList={props.classList} title="My Classes" goToPage={props.goToPage} />
        </div>
    );
}
export default AppContent;

//example calling other components
//<BaseTile textArray={props.news} title="News" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />