import React from 'react';
import {Spinner} from '../components/BaseComponents';
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
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        console.log("componentDidMount!!!");
        this.fetchDataTeacherInfo(this.state.teacherID);
    }
    
    render (){

        if(this.state.isLoading){
            return (<Spinner />);
        } else {
            return (
                <div className="app-content">
                    <SectionTitleTile title="Personal Data" goToPrevPage={this.props.goToPrevPage} />    
                    <form id="DataForm" onSubmit={this.handleSubmit}>
                        <input type="button" value="Edit" onClick={() => this.enableFields()} />
                        <div className="input-group">
                            <img alt="profile pic" src={this.state.teacherInfo.ProfilePic} className="personal-pic" />
                            //<input type="hidden" value={this.state.teacherInfo.Username} />
                            <InputText label="Username" name="Username" value={this.state.teacherInfo.Username} disabled />
                            <InputText label="First Name" name="FirstName" value={this.state.teacherInfo.FirstName} disabled />
                            <InputText label="Last Name" name="LastName" value={this.state.teacherInfo.LastName} disabled />
                            <InputText label="Date Of Birth" name="DateOfBirth" value={this.state.teacherInfo.DateOfBirth} disabled />
                            <InputText label="Place Of Birth" name="PlaceOfBirth" value={this.state.teacherInfo.PlaceOfBirth} disabled />
                            <InputText label="Nationality" name="Nationality" value={this.state.teacherInfo.Nationality} disabled />
                            <InputText label="Fiscal Code" name="FiscalCode" value={this.state.teacherInfo.FiscalCode} disabled />
                        </div>
                        <div className="input-group">
                            <InputText className="editable" onChange={this.handleInputChange}
                                label="Email" name="Email" value={this.state.teacherInfo.Email} />
                            <InputText className="editable" onChange={this.handleInputChange}
                                label="Phone Number" name="PhoneNumber" value={this.state.teacherInfo.PhoneNumber} />
                            <InputText className="editable" onChange={this.handleInputChange}
                                label="Address" name="Address" value={this.state.teacherInfo.Address} />
                        </div>
                        <div className="input-group">
                            <InputText className="editable" label="Graduation Degree" name="GradDegree" value={this.state.teacherInfo.GradDegree} />
                            <InputText className="editable" label="Graduation Field Of Study" name="GradFieldOfStudy" value={this.state.teacherInfo.GradFieldOfStudy} />
                            <InputText className="editable" label="Graduation Grade" name="GradGrade" value={this.state.teacherInfo.GradGrade} />
                            <InputText className="editable" label="Graduation School" name="GradSchool" value={this.state.teacherInfo.GradSchool} />
                            <InputText label="Seniority Level" name="SeniorityLevel" value={this.state.teacherInfo.SeniorityLevel} disabled />
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

            ); 
        }
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

    postTeacherInfo(){
        //var form = new FormData(document.getElementById('DataForm'));
        var data = JSON.stringify(this.state.teacherInfo);
        
        console.log(data);
        
        fetch(CONSTANTS.HOST+"/api/v1/teacher/info", {
            method: "POST",
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: data
        });/*.then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))*/
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        let teacherInfoMod = this.state.teacherInfo;
        teacherInfoMod[name] = value;

        this.setState({
          teacherInfo: teacherInfoMod
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.postTeacherInfo();
        this.disableFields();
    }
    
    enableFields(){
        document.getElementsByClassName("editable").disabled = false;
        console.log("fields enabled");
    }

    disableFields(){
        document.getElementsByClassName("editable").disabled = true;
        console.log("fields disabled");
    }
    
}