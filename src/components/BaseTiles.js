import React from 'react';
import './TilesStyle.css';

export default function BaseTile (props) {
    return (
        <div class="base-tile">
            <TileHeader text={props.title} />
            <TileContent text={props.text} />
        </div>
    );
}

function TileHeader(props){
    return (
        <div class="tile-header">
            <span>{props.text}</span>
            <span class="toggle">X</span>
        </div>
    );
}

function TileContent(props) {
    return (
        <div class="tile-content">
            <p>{props.text}</p>
        </div>
    );
}