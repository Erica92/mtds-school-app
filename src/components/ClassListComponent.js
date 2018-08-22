import React from 'react';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';
import {BaseProfileComponent} from './BaseComponents';

export default function ClassListComponent(props){
    let rows = props.classList.map(
        function(classElem){
            let classRow;
            if(classElem.Subject){
                classRow = classElem.ClassID + "-" + classElem.Subject;
            }else{
                classRow = classElem.ClassID;
            }
            return (
                <div className="row clickable" onClick={() => props.selectClass(classElem, props.goToPage("ClassPage"))} key={classElem.ClassID} >
                    <div className="centered-div" >
                        {classRow}
                    </div>
                </div>
            )
        }
    );

    return (
        <div className="base-tile limit-max-height">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_18x18.png")} />
            <div className="tile-content">        
                {rows}
            </div>
        </div>
    );
}