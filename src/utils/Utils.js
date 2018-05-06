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