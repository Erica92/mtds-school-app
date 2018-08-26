import React from 'react';
import {SectionTitleTile} from './BaseTiles';
import GradesListComponent from './GradesListComponent';
import * as CONSTANTS from '../api/apiUtils';
import * as APICall from '../api/teacherAPI';
import * as Utils from '../utils/Utils';
import {Spinner} from './BaseComponents';
import * as Modals from './ModalComponents';

export default class GradesPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            studentsGradesList: {
                data: [],
                isLoading: true
            },
            teacher: this.props.teacher,
            selectedClass: this.props.selectedClass,
            gradeMod: {}
        }
        
        this.handleSubmitSingleGrade = this.handleSubmitSingleGrade.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.createModalSingleGradeObject = this.createModalSingleGradeObject.bind(this);
        this.fetchDataStudentGrades = APICall.fetchDataStudentGrades.bind(this);
        
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
                    <GradesListComponent studentGradesList={this.state.studentsGradesList.data} 
                        handleSubmitSingleGrade={this.handleSubmitSingleGrade} handleInputChange={this.handleInputChange}
                        handleDayClick={this.handleDayClick} createObject={this.createModalSingleGradeObject} />
                </div>
            </div>
        );
    }

    postSingleGrade(teacherID, classID, subject, gradeMod){
        //var form = new FormData(document.getElementById('DataForm'));
        var array = new Array();
        array.push(gradeMod);
        var request = {Grades: array}
        var data = JSON.stringify(request);

        var _this = this;
        
        console.log(data);
        
        fetch(CONSTANTS.HOST+"/api/v1/teacher/grades", {
            method: "POST",
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: data
        }).then(function(response){
            if(response.ok){
                //TODO handle update page
                _this.fetchDataStudentGrades(teacherID, classID, subject);
            } else {
                //TODO eventually handle error messages
            }
        });
        
        /*.then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err));*/
        
    }
    
    handleSubmitSingleGrade(event) {
        event.preventDefault();
        var gradeModTemp = this.state.gradeMod;
        gradeModTemp["TeacherID"] = this.state.teacher;
        gradeModTemp["Subject"] = this.state.selectedClass.Subject;
        console.log("gradeModTemp.Date:"+gradeModTemp.Date);
        gradeModTemp["Year"] = Utils.dateStringToDate(gradeModTemp.Date).getFullYear();
        gradeModTemp["Semester"] = 1;
        gradeModTemp["Date"] = Utils.dateStringToDate(gradeModTemp.Date).toJSON();
        
        console.log("Utils.dateStringToDate(gradeModTemp.Date)"+Utils.dateStringToDate(gradeModTemp.Date));
        this.postSingleGrade(this.state.teacher, this.state.selectedClass.ClassID, this.state.selectedClass.Subject, gradeModTemp);
        
        this.setState({
          gradeMod: {}
        });
        Modals.closeModals("singleGradeModal");
    }
    
    handleInputChange(event) {
        console.log("handleInputChange: "+event);
        const target = event.target;
        
        var value = '';
        switch(target.type){
            case 'checkbox':
                value = target.checked;
                break;
            case 'number':
                value = parseFloat(target.value);
                break;
            default:
                value = target.value;
                break;
        }

        const name = target.name;
        
        let gradeModTemp = this.state.gradeMod;
        gradeModTemp[name] = value;

        this.setState({
          gradeMod: gradeModTemp
        });
    }
    
    createModalSingleGradeObject(username){
        let newGradeMod = new Object();
        newGradeMod.StudentID = username;
        this.setState({
            gradeMod: newGradeMod
        });
    }
    
    handleDayClick(day) {
        console.log("handleDayClick: "+day);
        var gradeModTemp = this.state.gradeMod;
        gradeModTemp["Date"] = day;
        this.setState({ gradeMod: gradeModTemp });
    }
}