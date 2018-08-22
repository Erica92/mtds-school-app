import React from 'react';
import ReactDOM from 'react-dom';
import ProfileHeader from './ProfileHeader';

export default function AppHeader(props){
    return (
        <div className="header-bar">
            <div className="header-bar-content" >
                <div className="brand clickable" onClick={() => props.goToPage("HomePage")} ><img src={props.brand} /></div>
                <ProfileHeader user={props.user} goToPage={props.goToPage} cleanPageHistory={props.cleanPageHistory} 
                	onClickToggle={props.onClickToggle} menuList={props.menuList} />
            </div>
        </div>
    );
}
