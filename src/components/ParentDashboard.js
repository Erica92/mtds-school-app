import React from 'react';
import BaseTile from './BaseTiles';
import {SectionTitleTile} from './BaseTiles';
import {SquareTile} from './BaseTiles';
import NotificationListComponent from './NotificationListComponent';

export default function ParentDashboard(props){
    return (
        <div className="app-content">
            <NotificationListComponent title="Notifications" notificationList={props.notificationList} />
        </div>
    );
}

//example calling other components
//<BaseTile textArray={props.news} title="News" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />
//<SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />