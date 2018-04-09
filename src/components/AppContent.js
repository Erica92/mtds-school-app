import React from 'react';
import BaseTile from './BaseTiles';
import {SquareTile} from './BaseTiles';

function AppContent(props){
    return (
        <div class="app-content">
            <BaseTile textArray={props.news} title="News" />
            <SquareTile imageSrc={require("./../images/classroom-128.png")} title="My Classes" />
        </div>
    );
}
export default AppContent;