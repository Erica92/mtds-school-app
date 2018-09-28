import React from 'react';
import {BaseRow} from './BaseComponents';
import {TileHeader,SectionTitleTile} from './BaseTiles';
import './BaseStyle.css';
import './TilesStyle.css';

export default function NotificationForm(props) {
    let newNotification = {};
                                    
    return (
        <div className="app-content">
        	<div className="base-tile" >
            	<SectionTitleTile title="Notification Page" goToPrevPage={props.goToPrevPage} />
            	<TileHeader text={props.title} toggleImg={require("../images/launch_white_24x24.png")} />
            	<div className="tile-content">        
	            	<form id="DataForm" onSubmit={props.handleSubmit}>
		            	<label>SenderID</label>
		                <input className="input-base" type="text" name="SenderID" value={newNotification.SenderID} onChange={props.handleInputChange} />
		            	
		            	<label>DestinationID</label>
		            	<select name="DestinationIDType" value={newNotification.DestinationIDType}>
		            		<option>PERSON</option>
		            		<option>PARENTS</option>
		            		<option>TEACHERS</option>
		            		<option>ALL</option>
		            	</select>
		            	 <input className="input-base" type="text" name="DestinationID" value={newNotification.DestinationID} onChange={props.handleInputChange} />

		                <label>Topic</label>
		                <input className="input-base" type="text" name="Topic" value={newNotification.Topic} onChange={props.handleInputChange} />

		                <label>Title</label>
		                <input className="input-base" type="text" name="Title" value={newNotification.Title} onChange={props.handleInputChange} />

		                <label>Description</label>
		                <input className="input-base" type="text" name="Description" value={newNotification.Description} onChange={props.handleInputChange} />
		                
		                <label>Priority</label>
		                <input className="input-base" type="text" name="Priority" value={newNotification.Priority} onChange={props.handleInputChange} />
		                
		                <label>StartDate</label>
	                    <input className="input-base" type="datetime-local" name="StartDate" value={newNotification.StartDate} onChange={props.handleInputChange} />

	                    <label>EndDate</label>
	                    <input className="input-base" type="datetime-local" name="EndDate" value={newNotification.EndDate} onChange={props.handleInputChange} />

	                    <label>Status</label>
		                <input className="input-base" type="text" name="Status" value={newNotification.Status} onChange={props.handleInputChange} />

		                <div>
                            <input className="button-base submit-button" type="submit" value="Submit" />
                            <input className="button-base cancel-button" type="button" value="Cancel" onClick={() => this.cancelChanges()} />
                        </div>
	            	</form>
            	</div>
            </div>
        </div>
    );
}
/*
SenderID      string    `form:"SenderID" json:"SenderID"`
	DestinationID string    `form:"DestinationID" json:"DestinationID"`
	Topic         string    `form:"Topic" json:"Topic"`
	Title         string    `form:"Title" json:"Title"`
	Description   string    `form:"Description" json:"Description"`
	Priority      string    `form:"Priority" json:"Priority"`
	StartDate     time.Time `form:"StartDate" json:"StartDate"`
	EndDate       time.Time `form:"EndDate" json:"EndDate"`
	Status        string    `form:"Status" json:"Status"`*/