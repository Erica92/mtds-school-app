import React from 'react';
import {Spinner} from '../components/BaseComponents';
import {SectionTitleTile} from '../components/BaseTiles';
import * as ApiCalls from '../api/parentAPI';
import * as CONSTANTS from '../api/apiUtils';
import {PaymentListComponent,PaymentForm,PaymentDetails} from '../components/PaymentsComponents';

export default class PaymentPage extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            parentID: this.props.parentID,
            paymentList: [],
            paymentListHistory: [],
            studentInfo: null,
            cardInfo: null,
            selectedPayment: null,
            isLoading: true,
            view: "overview"
        }
        
        this.fetchDataPayment = ApiCalls.fetchDataPayment.bind(this);
        this.fetchDataPersonalDataStudent = ApiCalls.fetchDataPersonalDataStudent.bind(this);
        this.postParentPayment = ApiCalls.postParentPayment.bind(this);
        this.changeView = this.changeView.bind(this);
        this.selectPayment = this.selectPayment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }   
    
    componentDidMount(){
        /*this.fetchAllData().then(([paymentList, paymentListHistory]) => this.setState({
            isLoading: false
        }))*/
        this.fetchDataPayment(this.state.parentID, 2);
        this.fetchDataPayment(this.state.parentID, 1);

    }

    render(){
        
        let componentToReturn = null;
        
        if(this.state.isLoading){
            componentToReturn = (<Spinner/>);
        } else {
            if(this.state.view === "overview"){
                componentToReturn = (
                    <div className="app-content">
                        <SectionTitleTile title="Payments" goToPrevPage={this.props.goToPrevPage} />
                        <PaymentListComponent paymentList={this.state.paymentList} 
                                changeView={this.changeView} selectPayment={this.selectPayment} />      
                        <PaymentListComponent paymentList={this.state.paymentListHistory} 
                                changeView={this.changeView} selectPayment={this.selectPayment} />
                    </div>
                );
            } else if(this.state.view === "details"){
                
            } else if(this.state.view === "payment"){
                componentToReturn = (
                    <div className="app-content">
                        <SectionTitleTile title="Payments" goToPrevPage={this.props.goToPrevPage} />
                        <PaymentDetails paymentDetails={this.state.selectedPayment} studentInfo={this.state.studentInfo} />
                        <PaymentForm changeView={this.changeView} handleSubmit={this.handleSubmit}/>         
                    </div>
                );
            }
        }
        return componentToReturn;
    }
    
    changeView(viewName){
        let currentView = this.state.view;
        if(currentView !== viewName){
            this.setState({
                view:viewName 
            });
        }
    }
    
    selectPayment(payment){
        this.fetchDataPersonalDataStudent(payment.StudentID);
        this.setState({selectedPayment: payment});
    }
    
    
    fetchAllData(){
        return Promise.all([
            this.fetchDataPayment(this.state.parentID, 1),
            this.fetchDataPayment(this.state.parentID, 2)
        ])
    }

    handleSubmit(event) {
        console.log("handleSubmit");
        event.preventDefault();
        //TODO
        /*this.state.cardInfo;
        this.state.selectedPayment;*/
        this.postParentPayment(this.state.selectedPayment);
    }

    cancelChanges(){

        this.setState({
            cardInfo: null
        });
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
    

}