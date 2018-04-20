import React from 'react';
import BaseTile from './BaseTiles';
import {SectionTitleTile} from './BaseTiles';
import {SquareTile} from './BaseTiles';

export default function ClassDetailsPage(props) {
    return (
        <div class="app-content">
            <SectionTitleTile text={props.sectionTitle} />    
            <div className="squared-tile-block">
                <SquareTile title="Program" onClick={()=>props.goToPage("Program")} />
                <SquareTile title="Schedule" onClick={()=>props.goToPage("Schedule")} />
                <SquareTile title="Grades" onClick={()=>props.goToPage("Grades")} />
            </div>
        </div>
    );
}