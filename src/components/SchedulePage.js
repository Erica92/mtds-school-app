import React from 'react';
import {SectionTitleTile} from './BaseTiles';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';
import * as CONSTANTS from '../api/apiUtils';
import * as Utils from '../utils/Utils';
import * as TeacherAPI from '../api/teacherAPI';

export default class SchedulePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            scheduleList: [],
            isLoading: true,
            teacher: this.props.teacher,
            selectedClass: this.props.selectedClass
        }

        this.fetchDataSchedule = TeacherAPI.fetchDataSchedule.bind(this);
    }
    
    componentDidMount(){
        this.fetchDataSchedule(this.state.teacher,"week", this.state.selectedClass.ClassID);
        console.log("componentDidMount!!!");
    }
    
    render(){
        let rows;
        
        if(this.state.scheduleList != null && this.state.scheduleList.length > 0){
            
            var scheduleList = this.state.scheduleList;
            
            for(var i = 0; i < scheduleList.length; i++){
                let teachClass = scheduleList[i].TeachClass;
                rows = scheduleList[i].Schedule.map(elem => (
                    <div>
                        <span>{elem.Day}</span>
                        <span>{Utils.formatTimeFromJSON(elem.StartTime)}</span>
                        <span>{Utils.formatTimeFromJSON(elem.EndTime)}</span>
                    </div>
                ));
            }
            
        } else {
            rows = (
                <div>
                    <span>No result found</span>
                </div>
            );
        }
        
        
        return (
            <div className="app-content">
                <SectionTitleTile title={"Schedule for Class "+this.state.selectedClass.ClassID} subtitle={this.state.selectedClass.Subject} goToPrevPage={this.props.goToPrevPage} />    
                
                <div className="base-tile">
                    <TileHeader text="Schedule" toggleImg={require("../images/launch_white_18x18.png")} />
                    <div className="tile-content">        
                        {rows}
                    </div>
                </div>
            
            </div>
        );
    }


}