import React from 'react';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';

export default function ClassListComponent(props){
    let rows = props.classList.map(classElem => (
        <div className="row clickable" onClick={() => props.selectClass(classElem.ClassID), ()=> props.goToPage("ClassPage")}>
            <div className="centered-div" >
                {classElem.ClassID}
            </div>
        </div>
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