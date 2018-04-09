import React from 'react';
import BaseTile from './BaseTiles';

function AppContent(props){
    return (
        <div class="app-content">
            <BaseTile title={props.news.title} text={props.news.text} />
        </div>
    );
}
export default AppContent;