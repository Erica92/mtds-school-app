import React from 'react';
import {Spinner} from '../components/BaseComponents';
import {SectionTitleTile} from '../components/BaseTiles';
import {InputText} from '../components/InputComponents';
import * as CONSTANTS from '../api/apiUtils';
import * as teacherAPI from '../api/teacherAPI';
import * as Modals from '../components/ModalComponents';
import {ModalResult} from '../components/ModalComponents';
import * as Utils from '../utils/Utils';

export default class TeacherPersonalDataPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            teacherID: this.props.teacherID,
            teacherInfo: {},
            teacherInfoMod: {},
            isLoading: true,
            resultMessage: ""
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchDataPersonalDataTeacher = teacherAPI.fetchDataPersonalDataTeacher.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
    }
    
    componentDidMount(){
        console.log("componentDidMount!!!");

        var _this = this;

        this.fetchDataPersonalDataTeacher(this.state.teacherID)
            .then(function(){
                var teacherOrig = Object.assign({}, _this.state.teacherInfo);

                _this.setState({teacherInfoMod: teacherOrig});
            });
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
                            <img alt="profile pic" src={this.state.teacherInfoMod.ProfilePic} className="personal-pic" />
                            //<input type="hidden" value={this.state.teacherInfoMod.Username} />
                            <InputText label="Username" name="Username" value={this.state.teacherInfoMod.Username} disabled />
                            <InputText label="First Name" name="FirstName" value={this.state.teacherInfoMod.FirstName} disabled />
                            <InputText label="Last Name" name="LastName" value={this.state.teacherInfoMod.LastName} disabled />
                            <InputText label="Date Of Birth" name="DateOfBirth" value={Utils.formatDateToString(new Date(this.state.teacherInfoMod.DateOfBirth))} disabled />
                            <InputText label="Place Of Birth" name="PlaceOfBirth" value={this.state.teacherInfoMod.PlaceOfBirth} disabled />
                            <InputText label="Nationality" name="Nationality" value={this.state.teacherInfoMod.Nationality} disabled />
                            <InputText label="Fiscal Code" name="FiscalCode" value={this.state.teacherInfoMod.FiscalCode} disabled />
                        </div>
                        <div className="input-group">
                            <InputText className="editable" onChange={this.handleInputChange}
                                label="Email" name="Email" value={this.state.teacherInfoMod.Email} />
                            <InputText className="editable" onChange={this.handleInputChange}
                                label="Phone Number" name="PhoneNumber" value={this.state.teacherInfoMod.PhoneNumber} />
                            <InputText className="editable" onChange={this.handleInputChange}
                                label="Address" name="Address" value={this.state.teacherInfoMod.Address} />
                        </div>
                        <div className="input-group">
                            <InputText className="editable" label="Graduation Degree" name="GradDegree" value={this.state.teacherInfoMod.GradDegree} />
                            <InputText className="editable" label="Graduation Field Of Study" name="GradFieldOfStudy" value={this.state.teacherInfoMod.GradFieldOfStudy} />
                            <InputText className="editable" label="Graduation Grade" name="GradGrade" value={this.state.teacherInfoMod.GradGrade} />
                            <InputText className="editable" label="Graduation School" name="GradSchool" value={this.state.teacherInfoMod.GradSchool} />
                            <InputText label="Seniority Level" name="SeniorityLevel" value={this.state.teacherInfoMod.SeniorityLevel} disabled />
                        </div>
                        <div>
                            <input className="button-base submit-button" type="submit" value="Submit" />
                            <input className="button-base cancel-button" type="button" value="Cancel" onClick={() => this.cancelChanges()} />
                        </div>
                    </form>

                    <ModalResult text={this.state.resultMessage.message} buttonText="OK" />

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
        var data = JSON.stringify(this.state.teacherInfoMod);
        var _this = this;

        console.log(data);
        
        fetch(CONSTANTS.HOST+"/api/v1/teacher/"+this.state.teacherID+"/info", {
            method: "POST",
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: data
        }).then(function(response) { 
            let jsonRes = response.json();
            if(response.ok){
                _this.setState({
                    resultMessage: {
                        code: response.status,
                        message: "Personal Info updated successfully"
                    },
                    teacherInfo: jsonRes
                });
            } else {
                _this.setState({resultMessage: jsonRes});
            }
            Modals.openModal("resultModal");
        });
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        let teacherInfoMod = this.state.teacherInfoMod;
        teacherInfoMod[name] = value;

        this.setState({
          teacherInfoMod: teacherInfoMod
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

    cancelChanges(){
        console.log("clicked");
        let teacherOrig = Object.assign({}, this.state.teacherInfo);
        
        this.setState({
            teacherInfoMod: teacherOrig
        });
    }
    
}