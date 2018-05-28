import React from 'react';
import BaseTile from '../components/BaseTiles';
import {SectionTitleTile} from '../components/BaseTiles';
import {SquareTile} from '../components/BaseTiles';
import * as CONSTANTS from '../api/apiUtils';
import * as ApiCalls from '../api/parentAPI';

export default class StudentDetailsPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            parentID: this.props.parentID,
            student: this.props.selectedStudent,
            gradesList: this.props.gradesList
        }
        
        ApiCalls.fetchDataStudentGrades = ApiCalls.fetchDataStudentGrades.bind(this);
    }
    
    componentDidMount(){
        console.log("componentDidMount!!!");
        ApiCalls.fetchDataStudentGrades(this.state.parentID);
    }
    
    render(){
        return (
            <div className="app-content">
                <SectionTitleTile title={"Student "+this.state.student.FirstName} goToPrevPage={this.props.goToPrevPage} />    
                <div className="squared-tile-block">

                </div>
            </div>
        );
    }

}