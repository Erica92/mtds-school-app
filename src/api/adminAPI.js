import * as CONSTANTS from './apiUtils';
import * as Modals from "../components/ModalComponents";



export function fetchDataNotifications(){
    return fetch(CONSTANTS.HOST+"/api/v1/admin/notification")
        .then(response => response.json())
        .then( (result) => this.setState({
                isLoading: false,
                notificationList: result
            })
        );
}

export function fetchDataClasses(){
    fetch(CONSTANTS.HOST+"/api/v1/admin/classes")
        .then(response => response.json())
        .then( (result) => this.setState({
            classList: result,
            isLoading: false
        })
    );
}


export function fetchDataStudentClass(classID){
    fetch(CONSTANTS.HOST+"/api/v1/class/students?class="+classID)
        .then(response => response.json())
        .then( (result) => this.setState({
                studentClassList: {
                    data: result,
                    isLoading: false
                }
            })
        );
}

export function getStudentParent(username){
    let parent = null;
    fetch(CONSTANTS.HOST+"/api/v1/student/parents?id="+username)
        .then(response => response.json())
        .then( (result) => {
            console.log("getStudentParent "+result[0].Username);
            parent = result[0].Username;
            }
        );
    return parent;
}

export function postcreatePayment(paymentInfo){
/*
    var paymentInfo = {
        ParentID: parent,
        StudentID: student,
        Amount: amount,
        Deadline: deadline,

    }
*/
    console.log(paymentInfo);

    var data = JSON.stringify(paymentInfo);

    console.log(data);

    fetch(CONSTANTS.HOST+"/api/v1/admin/payment", {
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

            this.setState({
                paymentResult: data
            });

           // Modals.openModal("resultModal");

            /*
            this.fetchDataPersonalDataParent(this.state.parentID)
                .then(() => {
                    let parentOrig = Object.assign({}, this.state.parentInfo);
                    this.setState({parentInfoMod: parentOrig});
            })*/
        });/*.then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))*/
}
