import React from 'react';
import ReactDOM from 'react-dom';
import {Avatar, BlockTitle, BlockDescription} from './BaseComponents';
import './BaseStyle.css';

function ProfileHeader(props){
    return (
        <div className="dropdown">
            <div className="profile-header" onClick={ () => props.onClick() }>
                <div className="profile-header-sx">
                    <Avatar avatarUrl={props.user.avatarUrl} />	
                </div>
                <div className="profile-header-dx">
                    <BlockTitle text={props.user.fullName} />
                    <BlockDescription text={props.user.role} />
                </div>
            </div>
            <div class="dropdown-content">
                <a href="#">Personal Data</a>
                <a href="#">Logout</a>
            </div>
        </div>
    );
}
export default ProfileHeader;

