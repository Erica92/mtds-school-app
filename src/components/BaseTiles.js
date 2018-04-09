import React from 'react';
import './TilesStyle.css';

export default function BaseTile (props) {

    return (
        <div class="base-tile">
            <TileHeader text={props.title} />
            <TileContent textArray={props.textArray} />
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
         {
            props.textArray.map(elem => {
                return (
                        <p>{elem.text}</p>
                );
            })
        }
        </div>
    );
}