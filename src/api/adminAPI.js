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
    fetch(CONSTANTS.HOST+"/api/v1/classes/")
        .then(response => response.json())
        .then( (result) => this.setState({
            classList: result,
            isLoading: false
        })
    );
}


export function fetchDataStudentClass(classID){
    fetch(CONSTANTS.HOST+"/api/v1/classes/"+classID+"/students")
        .then(response => response.json())
        .then((result) => result.map((elem) => elem.Student))
        .then( (resultList) => this.setState({
                studentClassList: {
                    data: resultList,
                    isLoading: false
                }
            })
        );
}

export function postcreatePayment(paymentInfo_studentID,paymentInfo_Amount,paymentInfo_Description,paymentInfo_Deadline){

    let creatingPayment = {
        StudentID: paymentInfo_studentID,
        Amount: new Number(paymentInfo_Amount),
        Description: paymentInfo_Description,
        Deadline: new Date(paymentInfo_Deadline),

    }

    var headers = this.props.authHeaders;
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    var data = JSON.stringify(creatingPayment);

    console.log(data);

    fetch(CONSTANTS.HOST+"/api/v1/admin/"+this.props.adminID+"/payments", {
        method: "POST",
        mode: 'cors',
        headers: headers,
        credentials: 'include',
        body: data
    }).then((res) => {
            let message = "";
            if(res.ok){
                message = "Payment correctly uploaded";
            } else {
                message = "Sorry, an error occurred";
            }

            this.setState({
                modificationResult: message
            });
            Modals.openModal("resultModal");

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
