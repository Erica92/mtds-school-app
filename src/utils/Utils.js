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

export function formatDateToString(dateToFormat){
      var yyyy = dateToFormat.getFullYear();
      var mm = dateToFormat.getMonth() + 1;
      var dd = dateToFormat.getDate();
    
      return [yyyy, (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
 }

export function dateStringToDate(dateString){
    var dateSplitted = dateString.split("-");
    var year = dateSplitted[0];
    var month = dateSplitted[1];
    var day = dateSplitted[2];
    var dt = new Date(year, month, day);
    
    return dt;
}
