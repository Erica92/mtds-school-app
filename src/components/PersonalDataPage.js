import React from 'react';
import {SectionTitleTile} from './BaseTiles';
import * as CONSTANTS from '../api/apiUtils';


export default class PersonalDataPage extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            personalData: {},
            isLoading: true,
            editMode: false,
            username: this.props.username
        }
    }
    
    componentDidMount(){
        console.log("PersonalDataPage componentDidMount!!!");
        this.fetchDataPersonalData(this.state.username);
    }
    
    render(){
        return();
    }
    
    fetchDataPersonalData(username){
        fetch(CONSTANTS.HOST+"/api/v1/teacher/info?id="+username)
            .then(response => response.json())
            .then( (result) => this.setState({
                personalData: result,
                isLoading: false
            })
        );
    }
}

/*Username: "T1",
FirstName: "TFirstName1",
LastName: "TLastName1",
Email: "TEmail1",
PhoneNumber: "TPhoneNumber1",
DateOfBirth: "1985-01-12T00:00:00Z",
PlaceOfBirth: "TPoB1",
Nationality: "TNationality1",
Address: "TAddr1",
FiscalCode: "TFiscCode1",
GradDegree: "TGradDeg1",
GradFieldOfStudy: "TGradField1",
GradGrade: "TGradGrade1",
GradSchool: "TGradSchool1",
SeniorityLevel: "TSenLevel1",
StartDate: "2018-03-23T21:19:56Z",
EndDate: "0001-01-01T00:00:00Z",
Status: "1"*/