import React from 'react';
import {Spinner} from '../components/BaseComponents';
import {SectionTitleTile} from '../components/BaseTiles';
import {InputText} from '../components/InputComponents';
import {ModalResult} from '../components/ModalComponents';
import * as Modals from '../components/ModalComponents';
import * as ApiCalls from '../api/parentAPI';
import * as CONSTANTS from '../api/apiUtils';
import * as Utils from '../utils/Utils';

export default class StudentPersonalDataPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            student: this.props.student,
            studentInfo: {},
            studentInfoMod: {},
            isLoading: true,
            modificationResult: null
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchDataPersonalDataStudent = ApiCalls.fetchDataPersonalDataStudent.bind(this);
    }
    
    componentDidMount(){
        console.log("componentDidMount!!!");
        this.fetchDataPersonalDataStudent(this.props.parent, this.state.student.Username)
            .then(() => {         
            let studentOrig = Object.assign({}, this.state.studentInfo);
            
            //creates a copy of the original data
            this.setState({studentInfoMod: studentOrig});
        });
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

        if(this.state.isLoading){
            return (<Spinner />);
        } else {
            return (
                <div className="app-content">
                    <SectionTitleTile title="Personal Data" goToPrevPage={this.props.goToPrevPage} />   
                    <form id="DataForm" onSubmit={this.handleSubmit}>
                        <img alt="profile pic" src={this.state.studentInfoMod.ProfilePic} className="personal-pic"/>
                        <div className="input-group">
                            <InputText label="Username" name="Username" value={this.state.studentInfoMod.Username} disabled />
                            <InputText label="First Name" name="FirstName" value={this.state.studentInfoMod.FirstName} disabled />
                            <InputText label="Last Name" name="LastName" value={this.state.studentInfoMod.LastName} disabled />
                            <InputText label="Date Of Birth" name="DateOfBirth" 
                                value={Utils.formatDateFromJSON(this.state.studentInfoMod.DateOfBirth)} disabled />
                            <InputText label="Place Of Birth" name="PlaceOfBirth" value={this.state.studentInfoMod.PlaceOfBirth} disabled />
                            <InputText label="Nationality" name="Nationality" value={this.state.studentInfoMod.Nationality} disabled />
                            <InputText label="Fiscal Code" name="FiscalCode" value={this.state.studentInfoMod.FiscalCode} disabled />
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
                            <InputText label="Enroll Date" name="EnrolledDate" 
                                value={Utils.formatDateFromJSON(this.state.studentInfoMod.EnrolledDate)} disabled />
                            <InputText label="Enrolled in class" name="ClassID" value={this.state.studentInfoMod.ClassID} disabled />
                        </div>
                        <div>
                            <input className="button-base submit-button" type="submit" value="Submit" />
                            <input className="button-base cancel-button" type="button" value="Cancel" onClick={() => this.cancelChanges()} />
                        </div>
                    </form>
                    <ModalResult text={this.state.modificationResult} buttonText="OK" />
                </div>
                

            ); 
        }
    }

    postStudentInfo(){
        //var form = new FormData(document.getElementById('DataForm'));
        var data = JSON.stringify(this.state.studentInfoMod);
        
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
            
            this.fetchDataPersonalDataStudent(this.state.student.Username)
                .then(() => {         
                    let studentOrig = Object.assign({}, this.state.studentInfo);
                    this.setState({studentInfoMod: studentOrig});
            })
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