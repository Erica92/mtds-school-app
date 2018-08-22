import React from 'react';
import ReactDOM from 'react-dom';
import {Avatar, BlockTitle, BlockDescription} from './BaseComponents';
import './BaseStyle.css';

function ProfileHeader(props){
    //{linkLabel: "Personal Data", linkName:"PersonalDataPage", icon:""}
    let linkList = props.menuList.map((elem) => (<a href="#" key={elem.linkName} onClick={() => props.cleanPageHistory(props.goToPage(elem.linkName)) } >{elem.linkLabel}</a>));
    return (
        <div className="dropdown">
            <div className="profile-header" onClick={ () => props.onClickToggle() }>
                <div className="profile-header-sx">
                    <Avatar avatarUrl={props.user.avatarUrl} />	
                </div>
                <div className="profile-header-dx">
                    <BlockTitle text={props.user.fullName} />
                    <BlockDescription text={props.user.role} />
                </div>
            </div>
            <div className="dropdown-content">
                {linkList}
            </div>
        </div>
    );
}
export default ProfileHeader;

