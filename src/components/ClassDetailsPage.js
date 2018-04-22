import React from 'react';
import BaseTile from './BaseTiles';
import {SectionTitleTile} from './BaseTiles';
import {SquareTile} from './BaseTiles';

export default function ClassDetailsPage(props) {
    return (
        <div class="app-content">
            <SectionTitleTile text={props.selectedClass} />    
            <div className="squared-tile-block">
                <SquareTile title="Program" onClick={()=>props.goToPage("ProgramPage")} />
                <SquareTile title="Schedule" onClick={()=>props.goToPage("SchedulePage")} />
                <SquareTile title="Grades" onClick={()=>props.goToPage("GradesPage")} />
            </div>
        </div>
    );
}