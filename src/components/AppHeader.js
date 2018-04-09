import React from 'react';
import ReactDOM from 'react-dom';
import ProfileHeader from './ProfileHeader';

export default function AppHeader(props){
    return (
        <div className="header-bar">
            <div className="header-bar-content" >
                <div className="brand"><img src={props.brand} /></div>
                <ProfileHeader user={props.user} />
            </div>
        </div>
    );
}
