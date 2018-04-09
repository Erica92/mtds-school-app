import React from 'react';
import BaseTile from './BaseTiles';

function AppContent(props){
    return (
        <div class="app-content">
            <BaseTile textArray={props.news} title="News" />
        </div>
    );
}
export default AppContent;