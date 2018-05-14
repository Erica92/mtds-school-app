import React from 'react';
import {SectionTitleTile} from './BaseTiles';
import GradesListComponent from './GradesListComponent';
import * as CONSTANTS from '../api/apiUtils';
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
                        handleDayClick={this.handleDayClick} />
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
    
    postSingleGrade(){
        //var form = new FormData(document.getElementById('DataForm'));
        var array = new Array();
        array.push(this.state.gradeMod);
        //var request = {Grade: array}
        var data = JSON.stringify(array);
        
        console.log(data);
        
        fetch(CONSTANTS.HOST+"/api/v1/teacher/grades", {
            method: "POST",
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: data
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err));
    }
    
    handleSubmitSingleGrade(event) {
        event.preventDefault();
        var gradeModTemp = this.state.gradeMod;
        gradeModTemp["TeacherID"] = this.state.teacher;
        gradeModTemp["Subject"] = this.state.selectedClass.Subject;
        console.log("gradeModTemp.Date:"+gradeModTemp.Date);
        gradeModTemp["Year"] = Utils.dateStringToDate(gradeModTemp.Date).getFullYear();
        console.log("Utils.dateStringToDate(gradeModTemp.Date)"+Utils.dateStringToDate(gradeModTemp.Date));
        this.setState({
          gradeMod: gradeModTemp
        });
        this.postSingleGrade();
        Modals.closeModals("singleGradeModal");
    }
    
    handleInputChange(event) {
        console.log("handleInputChange: "+event);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        let gradeModTemp = this.state.gradeMod;
        gradeModTemp[name] = value;

        this.setState({
          gradeMod: gradeModTemp
        });
    }
    
    handleDayClick(day) {
        console.log("handleDayClick: "+day);
        var gradeModTemp = this.state.gradeMod;
        gradeModTemp["Date"] = day;
        this.setState({ gradeMod: gradeModTemp });
    }
}