import React from 'react';
import {SectionTitleTile} from '../components/BaseTiles';
import {InputText} from '../components/InputComponents';
import * as CONSTANTS from '../api/apiUtils';

export default class TeacherPersonalDataPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            teacherID: this.props.teacherID,
            teacherInfo: {},
            isLoading: true
        }
    }
    
    componentDidMount(){
        console.log("componentDidMount!!!");
        this.fetchDataTeacherInfo(this.state.teacherID);
    }
    
    render (){
        return (
            <div className="app-content">
                <SectionTitleTile title="Personal Data" goToPrevPage={this.props.goToPrevPage} />    
                <div className="input-group">
                    <img alt="profile pic" src={this.state.teacherInfo.ProfilePic} className="personal-pic" />
                    <InputText label="First Name" name="FirstName" value={this.state.teacherInfo.FirstName} />
                    <InputText label="Last Name" name="LastName" value={this.state.teacherInfo.LastName} />
                    <InputText label="Date Of Birth" name="DateOfBirth" value={this.state.teacherInfo.DateOfBirth} />
                    <InputText label="Place Of Birth" name="PlaceOfBirth" value={this.state.teacherInfo.PlaceOfBirth} />
                    <InputText label="Nationality" name="Nationality" value={this.state.teacherInfo.Nationality} />
                    <InputText label="Fiscal Code" name="FiscalCode" value={this.state.teacherInfo.FiscalCode} />
                </div>
                <div className="input-group">
                    <InputText label="Email" name="Email" value={this.state.teacherInfo.Email} />
                    <InputText label="Phone Number" name="PhoneNumber" value={this.state.teacherInfo.PhoneNumber} />
                    <InputText label="Address" name="Address" value={this.state.teacherInfo.Address} />
                </div>
                <div className="input-group">
                    <InputText label="Graduation Degree" name="GradDegree" value={this.state.teacherInfo.GradDegree} />
                    <InputText label="Graduation Field Of Study" name="GradFieldOfStudy" value={this.state.teacherInfo.GradFieldOfStudy} />
                    <InputText label="Graduation Grade" name="GradGrade" value={this.state.teacherInfo.GradGrade} />
                    <InputText label="Graduation School" name="GradSchool" value={this.state.teacherInfo.GradSchool} />
                    <InputText label="Seniority Level" name="SeniorityLevel" value={this.state.teacherInfo.SeniorityLevel} />
                </div>
            </div>
        );   
    }
    
    fetchDataTeacherInfo(teacherID){
        fetch(CONSTANTS.HOST+"/api/v1/teacher/info?id="+teacherID)
            .then(response => response.json())
            .then( (result) => this.setState(
                {
                    isLoading: false,
                    teacherInfo: result
                }
        ));
    }
    
}