import React from 'react';
import './TilesStyle.css';

export default function BaseTile (props) {

    return (
        <div class="base-tile">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_18x18.png")} />
            <TileContent textArray={props.textArray} />
        </div>
    );
}

function TileHeader(props){
    return (
        <div class="tile-header">
            <div class="tile-header-title">
                <span>{props.text}</span>
            </div>
            <span class="toggle clickable"><img src={props.toggleImg} /></span>
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

export function SquareTile(props) {
    return (
        <div className="square-tile clickable">
            <div className="square-tile-image" >
                <img src={props.imageSrc} />
            </div>
            <div className="square-tile-description">
                <span>{props.title}</span>							
            </div>
        </div>
    );
}