export function formatDateFromJSON(jsonDate){
    return (new Date(jsonDate).toLocaleDateString());
}

export function formatTimeFromJSON(jsonDate){
    var jsDate = new Date(jsonDate);
    var hours = jsDate.getHours();
    var min = jsDate.getMinutes();
    
    min = min < 10 ? "0"+min : min;
    
    return (hours+":"+min);
}

//"2018-08-02T09:00:00Z"

export function formatDatetimeFromJSON(jsonDate){
    var jsDate = new Date(jsonDate);
    
    var year = jsDate.getFullYear();
    var month = jsDate.getMonth();
    var day = jsDate.getDate();
    var hours = jsDate.getHours();
    var min = jsDate.getMinutes();
    var seconds = jsDate.getSeconds();
    
    month = month < 10 ? "0"+month : month;
    day = day < 10 ? "0"+day : day;
    hours = hours < 10 ? "0"+hours : hours;
    min = min < 10 ? "0"+min : min;
    seconds = seconds < 10 ? "0"+seconds : seconds;    
    
    return (year+"-"+month+"-"+day+"T"+hours+":"+min+":"+seconds);
}

export function formatDateToString(dateToFormat){
      var yyyy = dateToFormat.getFullYear();
      var mm = dateToFormat.getMonth() + 1;
      var dd = dateToFormat.getDate();
    
      return [yyyy, (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
 }

export function dateStringToDate(dateString){
    var dateSplitted = dateString.split("-");
    var year = dateSplitted[0];
    var month = dateSplitted[1] - 1;
    var day = dateSplitted[2];
    var dt = new Date(year, month, day);
    
    return dt;
}

export function goToPage(nextPage){
    var currentPage = this.state.pageState;
    var newPrevPageState = this.state.prevPageState;
    newPrevPageState.push(currentPage);

    console.log("changing page - going from "+currentPage+" to "+nextPage);

    this.setState({
        pageState: nextPage,
        prevPageState: newPrevPageState
    });
}
    
export function goToPrevPage(){
    console.log("go to prev page");
    var currentPage = this.state.pageState;
    var prevPageState = this.state.prevPageState;
    console.log("prevPageState;"+prevPageState);
    var prevPage = prevPageState.pop();
    console.log("prevPageState;"+prevPageState);

    console.log("changing page - going from "+currentPage+" to "+prevPage);

    this.setState({
        pageState: prevPage,
        prevPageState: prevPageState
    });
}

export function cleanPageHistory(){
    console.log("clean history");
    let newPrevPageState = this.state.prevPageState;
    newPrevPageState.length = 0;
    newPrevPageState.push("HomePage");
    this.setState({
        prevPageState: newPrevPageState
    });

    console.log("prevPageState;"+this.state.prevPageState);
}

//this was created because there was a "this" misunderstanding with fullCalendar
export function updateSelectedEvent(calEvent){
    this.setState({selectedEvent: calEvent});
}
