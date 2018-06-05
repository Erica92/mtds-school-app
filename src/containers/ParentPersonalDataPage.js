import React from 'react';
import {Spinner} from '../components/BaseComponents';
import {SectionTitleTile} from '../components/BaseTiles';
import {InputText} from '../components/InputComponents';
import {ModalResult} from '../components/ModalComponents';
import * as Modals from '../components/ModalComponents';
import * as ApiCalls from '../api/parentAPI';
import * as CONSTANTS from '../api/apiUtils';

export default class ParentPersonalDataPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            parentID: this.props.parentID,
            parentInfo: {},
            parentInfoMod: {},
            isLoading: true,
            modificationResult: null
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        ApiCalls.fetchDataPersonalDataParent = ApiCalls.fetchDataPersonalDataParent.bind(this);
    }
    
    componentDidMount(){
        console.log("componentDidMount!!!");
        ApiCalls.fetchDataPersonalDataParent(this.state.parentID)
            .then(() => {         
            let parentOrig = Object.assign({}, this.state.parentInfo);
            
            //creates a copy of the original data
            this.setState({parentInfoMod: parentOrig});
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
                        <div className="input-group">
                            <InputText label="Username" name="Username" value={this.state.parentInfoMod.Username} disabled />
                            <InputText label="First Name" name="FirstName" value={this.state.parentInfoMod.FirstName} disabled />
                            <InputText label="Last Name" name="LastName" value={this.state.parentInfoMod.LastName} disabled />
                            <InputText label="Nationality" name="Nationality" value={this.state.parentInfoMod.Nationality} disabled />
                            <InputText label="Fiscal Code" name="FiscalCode" value={this.state.parentInfoMod.FiscalCode} disabled />
                        </div>
                        <div className="input-group">
                            <InputText className="editable" onChange={this.handleInputChange}
                                label="Email" name="Email" value={this.state.parentInfoMod.Email} />
                            <InputText className="editable" onChange={this.handleInputChange}
                                label="PhoneNumber" name="PhoneNumber" value={this.state.parentInfoMod.PhoneNumber} />
                            <InputText className="editable" onChange={this.handleInputChange}
                                label="Address" name="Address" value={this.state.parentInfoMod.Address} />
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

    postparentInfo(){
        //var form = new FormData(document.getElementById('DataForm'));
        var data = JSON.stringify(this.state.parentInfoMod);
        
        console.log(data);
        
        fetch(CONSTANTS.HOST+"/api/v1/parent/info", {
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
            
            ApiCalls.fetchDataPersonalDataParent(this.state.parentID)
                .then(() => {         
                    let parentOrig = Object.assign({}, this.state.parentInfo);
                    this.setState({parentInfoMod: parentOrig});
            })
        });/*.then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))*/
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        let parentInfoMod = this.state.parentInfoMod;
        parentInfoMod[name] = value;

        this.setState({
          parentInfoMod: parentInfoMod
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.postparentInfo();
    }

    cancelChanges(){
        console.log("clicked");
        let parentOrig = Object.assign({}, this.state.parentInfo);
        
        this.setState({
            parentInfoMod: parentOrig
        });
    }
    
}