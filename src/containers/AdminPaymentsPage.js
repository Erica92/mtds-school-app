import React from 'react';
import {Spinner} from '../components/BaseComponents';
import {SectionTitleTile} from '../components/BaseTiles';
import AdminClassesContent from "../components/AdminClassesContent";
import StudentListComponent from '../components/StudentListComponent';
import CreateStudentDataPage from '../containers/CreateStudentDataPage';
import StudentPersonalDataPage from '../containers/StudentPersonalDataPage';
import StudentDetailsPage from "../containers/StudentDetailsPage";

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

        this.goToPage = Utils.goToPage.bind(this);
        this.goToPrevPage = Utils.goToPrevPage.bind(this);
        this.selectClass = this.selectClass.bind(this);
        this.selectStudent = this.selectStudent.bind(this);


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

    selectStudent(student){
        this.setState({selectedStudent: student});
    }



    selectClass(selectedElem){
        this.setState({ selectedClass: selectedElem});
        this.fetchDataStudentClass(selectedElem.ClassID);

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
            if(this.state.pageState === "AdminClassesContent"){
                componentToRender = (<AdminClassesContent classList={classList} goToPage={this.goToPage} goToPrevPage={this.props.goToPrevPage}
                                                          selectClass={this.selectClass}/>);
            }
            else if(this.state.pageState === "ClassPage"){
                if(this.state.studentClassList.isLoading){
                    componentToRender = (<Spinner />);
                }else{
                    componentToRender = (
                        <div className='app-content'>
                            <SectionTitleTile title="Student Page" goToPrevPage={this.props.goToPrevPage} />
                            <button className="right-button" onClick={() => this.goToPage("CreatePaymentsPage")} >Create Student</button>
                            <StudentListComponent studentList={this.state.studentClassList.data}
                                                  onClickElem={this.selectStudent}
                                                  callBackFn={() => this.goToPage("StudentDetailsPage")}/>
                        </div>
                    );
                }
            } else if(this.state.pageState === "StudentDetailsPage"){
                componentToRender = (
                    <StudentDetailsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                        selectedStudent={this.state.selectedStudent} parentID={''} />
                );
            }else if(this.state.pageState === "CreatePaymentsPage"){
                componentToRender = (<CreatePaymentsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                         studentClassList = {this.state.studentClassList.data} classList={classList}
                         loadStudentInClass = {(event) => this.loadStudentInClass(event)}
                            payment={this.state.createdPayment}
                            handleInputChange = {(event) => this.handleInputChange(event) }
                            handleSubmit = {(event) => this.handleSubmit(event) }
                            modificationResult = {this.state.modificationResult} />);



            }else if(this.state.pageState === "StudentPersonalDataPage"){
                componentToRender = (<StudentPersonalDataPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                                              student={this.state.selectedStudent} />);
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


//to delete mock

var user1 = {
    name: 'Mario',
    surname: 'Rossi',
    avatarUrl: 'http://www.ravisahaus.com/assets/ui/mercedes-benz/img/ui/social-icons/instagram-square-gray.png',
    role: 'teacher',
    fullName: 'Mario Rossi'
}
