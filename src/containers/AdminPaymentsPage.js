import React from 'react';
import {Spinner} from '../components/BaseComponents';

import * as ApiCalls from "../api/adminAPI";
import * as Utils from "../utils/Utils";
import CreatePaymentsPage from "./CreatePaymentsPage";

export default class AdminPaymentsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            paymentsList: [],
            createdPayment: {
              StudentId: null,
              ParentId: null,
              Amount: null,
              Deadline: null,
              Description: null
            },
            classList : [],
            selectedClass : null,
            studentClassList: {
                data: [],
                isLoading: false
            },
            modificationResult: null,
            selectedStudent: null,
            pageState: "CreatePaymentsPage",
            prevPageState: ["CreatePaymentsPage"]
        };

        this.fetchDataClasses = ApiCalls.fetchDataClasses.bind(this);
        this.fetchDataStudentClass = ApiCalls.fetchDataStudentClass.bind(this);
        this.postcreatePayment = ApiCalls.postcreatePayment.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);


    }

    componentDidMount(){
        this.getFetchAll().then(() => this.setState({allLoaded: true}));
    }


    getFetchAll(){
        return Promise.all([
            this.fetchDataClasses(this.state.parentID)
        ])
    }


    loadStudentInClass(event) {
        const target = event.target;
        const name = target.name;

        this.fetchDataStudentClass(target.value);
    }


    handleSubmit(event){

        event.preventDefault();
        const newPayment = this.state.createdPayment;

        this.postcreatePayment(newPayment.StudentId, newPayment.Amount, newPayment.Description, newPayment.Deadline);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let paymentOnChange = this.state.createdPayment;
        paymentOnChange[name] = value;

        this.setState({
            createdPayment: paymentOnChange
        });
    }


    render(){
        const {isLoading, classList} = this.state;
        console.log("Rendering App - classList length"+classList.length);

        var componentToRender = null;
        if(isLoading){
            componentToRender = (<Spinner />);
        } else {
            if(this.state.pageState === "CreatePaymentsPage"){
                componentToRender = (<CreatePaymentsPage goToPage={this.props.goToPage} goToPrevPage={this.props.goToPrevPage}
                         studentClassList = {this.state.studentClassList.data} classList={classList}
                         loadStudentInClass = {(event) => this.loadStudentInClass(event)}
                            payment={this.state.createdPayment}
                            handleInputChange = {(event) => this.handleInputChange(event) }
                            handleSubmit = {(event) => this.handleSubmit(event) }
                            modificationResult = {this.state.modificationResult} authHeaders={this.props.authHeaders} />);



            }

        }


        //<AppContent news={message} /> />
        return (
            //<div className='app-content'>
            componentToRender
            //</div>

        );
    }


}

