import React from 'react';
import {Spinner} from '../components/BaseComponents';
import {SectionTitleTile} from '../components/BaseTiles';
import * as ApiCalls from '../api/parentAPI';
import * as CONSTANTS from '../api/apiUtils';
import {PaymentListComponent,PaymentForm} from '../components/PaymentsComponents';

export default class PaymentPage extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            parentID: this.props.parentID,
            paymentList: [],
            isLoading: true,
            view: "overview"
        }
        
        this.fetchDataPayment = ApiCalls.fetchDataPayment.bind(this);
        this.changeView = this.changeView.bind(this);
    }   
    
    componentDidMount(){
        this.fetchDataPayment(this.state.parentID);
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
                        <PaymentListComponent paymentList={this.state.paymentList} changeView={this.changeView} />         
                    </div>
                );
            } else if(this.state.view === "details"){
                
            } else if(this.state.view === "payment"){
                componentToReturn = (
                    <div className="app-content">
                        <SectionTitleTile title="Payments" goToPrevPage={this.props.goToPrevPage} />
                        <PaymentForm changeView={this.changeView} />         
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

}