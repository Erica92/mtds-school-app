import React from 'react';
import ReactDOM from 'react-dom';
import {Spinner} from '../components/BaseComponents';
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import ClassDetailsPage from '../components/ClassDetailsPage';
import GradesPage from '../components/GradesPage';
import SchedulePage from '../components/SchedulePage';
import TeacherPersonalDataPage from './TeacherPersonalDataPage';
import ProgramPage from './ProgramPage';
import CalendarPage from './CalendarPage';
import * as CONSTANTS from '../api/apiUtils';
import {SectionTitleTile} from '../components/BaseTiles';
import AdminClassesContent from "../components/AdminClassesContent";
import StudentListComponent from '../components/StudentListComponent';
import StudentDetailsPage from "../containers/StudentDetailsPage";

import * as ApiCalls from "../api/adminAPI";
import * as Utils from "../utils/Utils";

export default class AdminStudentsPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            classList : [],
            selectedClass : null,
            studentClassList: {
                data: [],
                isLoading: false
            },
            selectedStudent: null,
            pageState: "AdminClassesContent",
            prevPageState: ["AdminClassesContent"]
        };

        this.goToPage = Utils.goToPage.bind(this);
        this.goToPrevPage = Utils.goToPrevPage.bind(this);
        this.selectClass = this.selectClass.bind(this);
        this.selectStudent = this.selectStudent.bind(this);


        this.fetchDataClasses = ApiCalls.fetchDataClasses.bind(this);
        this.fetchDataStudentClass = ApiCalls.fetchDataStudentClass.bind(this);

    }

    componentDidMount(){
        this.getFetchAll().then(() => this.setState({allLoaded: true}));
    }



    selectClass(selectedElem){
        console.log("selected class:"+selectedElem.ClassID);
        this.setState({ selectedClass: selectedElem});
        this.fetchDataStudentClass(selectedElem.ClassID);

    }

    //http://localhost:8080/api/v1/teacher/agenda?id=T1&scope=day&class=C1
    //http://localhost:8080/api/v1/teacher/grades?id=T5&class=C5&subject=SubjectName5
    
    render(){
        const {isLoading, classList} = this.state;
        console.log("Rendering App - classList length"+classList.length);
        
        var componentToRender = null;
        if(isLoading){
            componentToRender = (<Spinner />);
        } else {
            if(this.state.pageState === "AdminClassesContent"){
                componentToRender = (<AdminClassesContent classList={classList} goToPage={this.goToPage}
                                                          selectClass={this.selectClass}/>);
            }
            else if(this.state.pageState === "ClassPage"){
                if(this.state.studentClassList.isLoading){
                    componentToRender = (<Spinner />);
                }else{
                    componentToRender = (<StudentListComponent studentList={this.state.studentClassList.data}
                                                               onClickElem={this.selectStudent}
                                                               callBackFn={() => this.goToPage("StudentDetailsPage")}/>);
                }
            } else if(this.state.pageState === "StudentDetailsPage"){
                componentToRender = (<StudentDetailsPage goToPage={this.goToPage} goToPrevPage={this.goToPrevPage}
                                     selectedStudent={this.state.selectedStudent} parentID={''} />);
            }

        }
        
        
        //<AppContent news={message} /> />
        return (
            <div>
                <br/>
                <SectionTitleTile title="Student Page" goToPrevPage={this.props.goToPrevPage} />
                {componentToRender}
            </div>

        );
    }

    getFetchAll(){
        return Promise.all([
            this.fetchDataClasses(this.state.parentID),
        ])
    }

    selectStudent(student){
        console.log("selectedStudent: "+student);
        this.setState({selectedStudent: student});
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

