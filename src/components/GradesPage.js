import React from 'react';
import {SectionTitleTile} from './BaseTiles';
import GradesListComponent from './GradesListComponent';
import * as CONSTANTS from '../api/apiUtils';
import {Spinner} from './BaseComponents';

export default class GradesPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            studentsGradesList: {
                data: [],
                isLoading: true
            },
            teacher: this.props.teacher,
            selectedClass: this.props.selectedClass
        }
    }
    
    componentDidMount(){
        console.log("componentDidMount!!!");
        this.fetchDataStudentGrades(this.state.teacher, this.state.selectedClass.ClassID, this.state.selectedClass.Subject);
    }
    
    render(){
        const isLoading = this.state.isLoading;
        return (
            <div className="app-content">
                <SectionTitleTile title={"Grades for Class "+this.state.selectedClass.ClassID} subtitle={this.state.selectedClass.Subject} goToPrevPage={this.props.goToPrevPage} />    
                <div className="squared-tile-block">
                    <GradesListComponent studentGradesList={this.state.studentsGradesList.data} />
                </div>
            </div>
        );
    }

    fetchDataStudentGrades(teacherID, classID, subject){
        fetch(CONSTANTS.HOST+"/api/v1/teacher/grades?id="+teacherID+"&class="+classID+"&subject="+subject+"&object=student")
            .then(response => response.json())
            .then( (result) => this.setState({
                studentsGradesList: {
                    data: result,
                    isLoading: false
                }
            })
        );
    }
}