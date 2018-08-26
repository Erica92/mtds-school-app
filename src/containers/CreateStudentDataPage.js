import React from 'react';
import {Spinner} from '../components/BaseComponents';
import {SectionTitleTile} from '../components/BaseTiles';
import {InputText,InputDate} from '../components/InputComponents';
import {ModalResult} from '../components/ModalComponents';
import * as Modals from '../components/ModalComponents';
import * as ApiCalls from '../api/parentAPI';
import * as CONSTANTS from '../api/apiUtils';
import * as Utils from '../utils/Utils';



export default class CreateStudentDataPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            student: {},
            studentInfo: {},
            studentInfoMod: {},
            isLoading: true,
            modificationResult: null
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchDataPersonalDataStudent = ApiCalls.fetchDataPersonalDataStudent.bind(this);
    }
    
    /*
    Username: "S2",
FirstName: "SFirstName2",
LastName: "SLastName2",
ProfilePic: "https://www.teachngo.com/images/student_avatar.jpg",
Email: "SEmail2",
PhoneNumber: "SPhoneNumber2",
ClassID: "C1",
GPA: 90.5,
Nationality: "SNationality2",
DateOfBirth: "2000-01-01T00:00:00Z",
PlaceOfBirth: "SPoB2",
Address: "SAddress2",
FiscalCode: "SFiscCode2",
EnrolledDate: "2003-01-01T00:00:00Z",
EndDate: "0001-01-01T00:00:00Z",
Status: "1"
*/
    render (){
        return (
            <div className="app-content">
                <SectionTitleTile title="Personal Data" goToPrevPage={this.props.goToPrevPage} />
                <form id="DataForm" onSubmit={this.handleSubmit}>
                    <img alt="profile pic" src={this.state.studentInfoMod.ProfilePic} className="personal-pic"/>
                    <div className="input-group">
                        <InputText className="editable" label="First Name" name="FirstName" onChange={this.handleInputChange} value={this.state.studentInfoMod.FirstName} />
                        <InputText className="editable" label="Last Name" name="LastName" onChange={this.handleInputChange} value={this.state.studentInfoMod.LastName}/>
                        <InputDate className="editable" label="Date Of Birth" name="DateOfBirth" onChange={this.handleInputChange} value={this.state.studentInfoMod.DateOfBirth} />
                        <InputText className="editable" label="Place Of Birth" name="PlaceOfBirth" onChange={this.handleInputChange} value={this.state.studentInfoMod.PlaceOfBirth} />
                        <InputText className="editable" label="Nationality" name="Nationality" onChange={this.handleInputChange} value={this.state.studentInfoMod.Nationality} />
                        <InputText className="editable" label="Fiscal Code" name="FiscalCode" onChange={this.handleInputChange} value={this.state.studentInfoMod.FiscalCode} />
                    </div>
                    <div className="input-group">
                        <InputText className="editable" onChange={this.handleInputChange}
                            label="Email" name="Email" value={this.state.studentInfoMod.Email} />
                        <InputText className="editable" onChange={this.handleInputChange}
                            label="PhoneNumber" name="PhoneNumber" value={this.state.studentInfoMod.PhoneNumber} />
                        <InputText className="editable" onChange={this.handleInputChange}
                            label="Address" name="Address" value={this.state.studentInfoMod.Address} />
                    </div>
                    <div className="input-group">
                        <InputDate label="Enroll Date" name="EnrolledDate" onChange={this.handleInputChange} value={this.state.studentInfoMod.EnrolledDate} />
                        <InputText label="Enrolled in class" name="ClassID" onChange={this.handleInputChange} value={this.state.studentInfoMod.ClassID} />
                    </div>
                    <div>
                        <input className="button-base submit-button" type="submit" value="Submit" />
                        <input className="button-base cancel-button" type="button" value="Cancel" onClick={() => this.cancelChanges()} />
                    </div>
                </form>
                <ModalResult text={this.state.modificationResult} buttonText="OK" callBackFn={this.props.goToPrevPage} />
            </div>


        );

    }

    postStudentInfo(){
        //var form = new FormData(document.getElementById('DataForm'));

        let studentInfoModCorrected=  this.state.studentInfoMod;
        let formattedDateOfBirth = new Date(studentInfoModCorrected.DateOfBirth);
        let formattedEnrolledDate = new Date(studentInfoModCorrected.EnrolledDate);
        studentInfoModCorrected.DateOfBirth = formattedDateOfBirth;
        studentInfoModCorrected.EnrolledDate = formattedEnrolledDate;

        var data = JSON.stringify(studentInfoModCorrected);
        
        console.log(data);
        
        fetch(CONSTANTS.HOST+"/api/v1/student/info", {
            method: "POST",
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: data
        }).then((res) => res.json())
            .then((data) => {
            console.log("data:"+data);
            let message = "";
            if(data.code == 200){
                message = "Personal Data correctly updated";
            } else {
                message = "Sorry, an error occurred";
                console.log("post error:"+data.message);
            }
            
            this.setState({
                modificationResult: message
            });
            Modals.openModal("resultModal");

            /*
            this.fetchDataPersonalDataStudent(this.state.student.Username)
                .then(() => {         
                    let studentOrig = Object.assign({}, this.state.studentInfo);
                    this.setState({studentInfoMod: studentOrig});
            })
            */
        });/*.then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))*/
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let studentInfoMod = this.state.studentInfoMod;
        studentInfoMod[name] = value;

        this.setState({
          studentInfoMod: studentInfoMod
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.postStudentInfo();
    }

    cancelChanges(){
        console.log("clicked");
        let studentOrig = Object.assign({}, this.state.studentInfo);
        
        this.setState({
            studentInfoMod: studentOrig
        });
    }
    
}