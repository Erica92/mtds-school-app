import React from 'react';
import {SectionTitleTile} from './BaseTiles';
import './TilesStyle.css';
import {TileHeader} from './BaseTiles';
import './BaseStyle.css';
import * as CONSTANTS from '../api/apiUtils';

export default class SchedulePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            scheduleList: [],
            isLoading: true,
            teacher: this.props.teacher,
            selectedClass: this.props.selectedClass
        }
    }
    
    componentDidMount(){
        this.fetchDataSchedule(this.state.teacher, this.state.selectedClass.ClassID, "week");
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
                        <span>{elem.StartTime}</span>
                        <span>{elem.EndTime}</span>
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

    fetchDataSchedule(teacherID, classID, scope){
        fetch(CONSTANTS.HOST+"/api/v1/teacher/agenda?id="+teacherID+"&scope="+scope+"&class="+classID)
            .then(response => response.json())
            .then( (result) => this.setState({
                isLoading: false,
                scheduleList: result
            })
        );
    }

}