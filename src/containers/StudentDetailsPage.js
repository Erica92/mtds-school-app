import React from 'react';
import BaseTile from '../components/BaseTiles';
import {SectionTitleTile, SquareTile} from '../components/BaseTiles';
import {GradesOverviewTable, SubjectGradesTable} from '../components/GradesTableComponent';
import {BasePersonComponentBig} from '../components/BaseComponents';
import * as CONSTANTS from '../api/apiUtils';
import * as ApiCalls from '../api/parentAPI';

export default class StudentDetailsPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            parentID: this.props.parentID,
            student: this.props.selectedStudent,
            gradesList: [],
            gradesView: "overview",
            selectedSubject: null,
            isLoading: true
        }
        
        this.fetchDataStudentGrades = ApiCalls.fetchDataStudentGrades.bind(this);
        this.showSubjectView = this.showSubjectView.bind(this);
        this.showView = this.showView.bind(this);
    }
    
    componentDidMount(){
        console.log("componentDidMount!!!");
        this.fetchDataStudentGrades(this.state.parentID, this.state.student.Username);
    }
    
    componentWillUnmount(){

    }
    
    render(){
        
        let componentToRender;
        if(this.state.gradesView === "overview" && this.state.isLoading === false){
            componentToRender = (<GradesOverviewTable gradesList={this.state.gradesList} 
                    title={"Grades Overview"}
                    showSubjectView={this.showSubjectView} />);
        } else if(this.state.gradesView === "subject" && this.state.isLoading === false){
            componentToRender = (<SubjectGradesTable gradesList={this.state.gradesList} 
                    showView={this.showView} />);
        }
        
        return (
            <div className="app-content">
                <SectionTitleTile title={"Student "+this.state.student.FirstName} goToPrevPage={this.props.goToPrevPage} />
                <BasePersonComponentBig avatarUrl={this.state.student.ProfilePic} onClick={() => this.props.goToPage("StudentPersonalDataPage")}
                                 FirstName={this.state.student.FirstName} LastName={this.state.student.LastName}/>
                <div className="squared-tile-block">
                    {componentToRender}
                </div>
            </div>
        );
    }
    
    showSubjectView(index){
        this.setState({
            gradesView: 'subject',
            selectedSubject: index
        });
    }
            
    showView(viewName){
        this.setState({
            gradesView: viewName,
            selectedSubject: null
        });
    }

}