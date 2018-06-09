import React from 'react';
import './Spinner.css';

export default function BaseProfileComponent(props) {
    return (
        <div className="profile-header" onClick={ () => props.onClick() }>
			<div className="profile-header-sx">
				<Avatar avatarUrl={props.user.avatarUrl} />	
			</div>
			<div className="profile-header-dx">
				<BlockTitle text={props.user.fullName} />
				<BlockDescription text={props.user.role} />
			</div>
		</div>
    );
}

export function BasePersonComponent(props) {
    return (
        <div className="profile-block" onClick={ () => props.onClick() }>
			<div className="profile-block-sx">
				<Avatar avatarUrl={props.avatarUrl} />	
			</div>
			<div className="profile-block-dx">
				<BlockTitle text={props.LastName} />
                <BlockTitle text={props.FirstName} />
			</div>
		</div>
    );
}

export function BasePersonComponentBig(props){
    return (
        <div className="base-tile-simple">
            <div>
                <img alt="profile pic" src={props.avatarUrl} className="personal-pic"/>
            </div>
            <div>
                <div className="tile-content-title" onClick={props.onClick} >{props.FirstName} {props.LastName}</div>
                <div className="tile-content-subtitle" onClick={props.onClick} >See and modify {props.FirstName}'s personal data</div>
            </div>
        </div>
    );
}

export function Avatar(props){
	return (
		<img className="Avatar" src={props.avatarUrl} />
	);
}

export function BlockTitle(props){
	return (
		<div className="BlockTitle">
			<span>{props.text}</span>
		</div>
	);
}

export function BlockDescription(props){
	return (
		<div className="BlockDescription">
			<p>{props.text}</p>
		</div>
	);
}


export function BaseRow(props) {
    return (
        <div className="row">
            <div className="row-title">{props.title}</div>
            <div className="row-content">{props.text}</div>
            <div className="row-content-right">{props.date}</div>
        </div>
    );
}

export function Spinner(props) {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}