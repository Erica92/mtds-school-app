import React from 'react';
import {BaseRow, Spinner} from './BaseComponents';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';

export default function NotificationListComponent(props) {
    let rows;
    if(props.notificationList && props.notificationList.length > 0){
        rows = props.notificationList.map(elem => (
            <BaseRow title={elem.Title} text={elem.Description} date={new Date(elem.StartDate).toLocaleDateString()} key={elem.Title} />
        ));
    } else {
        rows = (<Spinner />);
    }
                                    
    return (
        <div className="base-tile base-tile-half fixed-height">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_24x24.png")} />
            <div className="tile-content">        
                {rows}
            </div>
        </div>
    );
}