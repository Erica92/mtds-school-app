import React from 'react';
import BaseTile from './BaseTiles';
import {SectionTitleTile} from './BaseTiles';
import {SquareTile} from './BaseTiles';
import * as CONSTANTS from '../api/apiUtils';
import StudentListComponent from './StudentListComponent';

export default class ClassDetailsPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            studentClassList: {
                data: [],
                isLoading: true
            },
            classDetails: this.props.selectedClass
        }
    }
    
    componentDidMount(){
        console.log("componentDidMount!!!");
        this.fetchDataStudentClass(this.props.selectedClass.ClassID);
    }
    
    render(){
        return (
            <div className="app-content">
                <SectionTitleTile title={"Class "+this.state.classDetails.ClassID} subtitle={this.state.classDetails.Subject} goToPrevPage={this.props.goToPrevPage} />    
                <div className="squared-tile-block">
                    <SquareTile title="Program" onClick={()=>this.props.goToPage("ProgramPage")} />
                    <SquareTile title="Schedule" onClick={()=>this.props.goToPage("SchedulePage")} />
                    <SquareTile title="Grades" onClick={()=>this.props.goToPage("GradesPage")} />
                    <StudentListComponent studentList={this.state.studentClassList.data} onClickElem={this.props.goToPage} />
                </div>
            </div>
        );
    }

    fetchDataStudentGrades(teacherID, classID, subject){
        fetch(CONSTANTS.HOST+"/api/v1/teacher/grades?id="+teacherID+"&class="+classID+"&subject="+subject)
            .then(response => response.json())
            .then( (result) => this.setState({
                studentClassList: {
                    data: result,
                    isLoading: false
                }
            })
        );
    }

    fetchDataStudentClass(classID){
        fetch(CONSTANTS.HOST+"/api/v1/class/students?class="+classID)
            .then(response => response.json())
            .then( (result) => this.setState({
                studentClassList: {
                    data: result,
                    isLoading: false
                }
            })
        );
    }



    //http://localhost:8080/api/v1/teacher/agenda?id=T1&scope=day&class=C1
    //http://localhost:8080/api/v1/teacher/grades?id=T5&class=C5&subject=SubjectName5
    //http://localhost:8080/api/v1/class/students?class=C1
}