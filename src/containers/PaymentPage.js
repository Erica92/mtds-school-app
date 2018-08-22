import React from 'react';
import {Spinner} from '../components/BaseComponents';
import {SectionTitleTile} from '../components/BaseTiles';
import * as ApiCalls from '../api/parentAPI';
import * as CONSTANTS from '../api/apiUtils';
import {PaymentListComponent,PaymentForm,PaymentDetails} from '../components/PaymentsComponents';
import {Panel} from 'react-bootstrap';
import {ModalResult} from '../components/ModalComponents';
import * as Modals from '../components/ModalComponents';

export default class PaymentPage extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            parentID: this.props.parentID,
            paymentList: [],
            paymentListHistory: [],
            studentInfo: null,
            cardInfo: {},
            paymentResult: {},
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
                        <PaymentListComponent paymentList={this.state.paymentList} title="Upcoming Payments"
                                changeView={this.changeView} selectPayment={this.selectPayment} />      
                        <PaymentListComponent paymentList={this.state.paymentListHistory} title="Past Payments" 
                                changeView={this.changeView} selectPayment={this.selectPayment} />  
                    </div>
                );
            } else if(this.state.view === "details"){
                
            } else if(this.state.view === "payment"){
                componentToReturn = (
                    <div className="app-content">
                        <SectionTitleTile title="Payments" goToPrevPage={this.props.goToPrevPage} />
                        <PaymentDetails paymentDetails={this.state.selectedPayment} studentInfo={this.state.studentInfo} />
                        <PaymentForm changeView={this.changeView} handleSubmit={this.handleSubmit}
                                handleInputChange={this.handleInputChange} />
                        <ModalResult text={this.state.paymentResult.message} buttonText="OK" callBackFn={() => this.changeView("overview")} />     
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
        this.postParentPayment(this.state.selectedPayment, this.state.cardInfo);
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

        let cardInfo = this.state.cardInfo;
        cardInfo[name] = value;

        this.setState({
          cardInfo: cardInfo
        });
    }
    

}