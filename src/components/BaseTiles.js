import React from 'react';
import './TilesStyle.css';

export default function BaseTile (props) {

    return (
        <div className="base-tile">
            <TileHeader text={props.title} toggleImg={require("../images/launch_white_18x18.png")} />
            <TileContent textArray={props.textArray} />
        </div>
    );
}

export function TileHeader(props){
    return (
        <div className="tile-header">
            <div className="tile-header-title">
                <span>{props.text}</span>
            </div>
            <span className="toggle clickable"><img src={props.toggleImg} /></span>
        </div>
    );
}

function TileContent(props) {
    return (
        <div className="tile-content">
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
        <div className="square-tile clickable" onClick={() => props.onClick()} >
            <div className="square-tile-image" >
                <img src={props.imageSrc} />
            </div>
            <div className="square-tile-description">
                <span>{props.title}</span>							
            </div>
        </div>
    );
}

export function SectionTitleTile(props) {
    return ( 
        <div className="section-title-tile">
            <span className="clickable" onClick={() => props.goToPrevPage()} >back</span>
            <div>{props.title}</div>
            <div>{props.subtitle}</div>
        </div>
    );
}