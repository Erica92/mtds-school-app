import React from 'react';

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