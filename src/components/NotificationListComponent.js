import React from 'react';
import {BaseRow} from './BaseComponents';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';

export default function NotificationListComponent(props) {
    let rows = props.notificationList.map(elem => (
        <BaseRow title={elem.Title} text={elem.Description} date={elem.StartDate} />
    ));
                                    
    return (
        <div className="base-tile">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_18x18.png")} />
            <div className="tile-content">        
                {rows}
            </div>
        </div>
    );
}