import React from 'react';
import {BaseRow} from './BaseComponents';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';

export default function NotificationListComponent(props) {
    let rows = props.notificationList.map(elem => (
        <BaseRow title={elem.Title} text={elem.Description} date={new Date(elem.StartDate).toLocaleDateString()} key={elem.Title} />
    ));
                                    
    return (
        <div className="base-tile base-tile-half fixed-height">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_24x24.png")} />
            <div className="tile-content">        
                {rows}
            </div>
        </div>
    );
}