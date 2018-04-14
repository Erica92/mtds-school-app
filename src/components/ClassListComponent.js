import React from 'react';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';

export default function ClassListComponent(props){
    let rows = props.classList.map(classElem => (<div>{classElem.ClassID}</div>));
                                    
    return (
        <div className="base-tile">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_18x18.png")} />
            <div className="tile-content">        
                {rows}
            </div>
        </div>
    );
}