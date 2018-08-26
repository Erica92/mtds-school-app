import React from 'react';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './BaseStyle.css';


export function InputText(props){
    return(
        <div className="input-block">
            <label htmlFor={props.name}>{props.label}</label>
            <input type="text" name={props.name} value={props.value} 
                className="input-base" onChange={props.onChange} disabled={props.disabled}/>
        </div>
    );
}

export function InputTextArea(props){
    return(
        <div className="input-block">
            <label for={props.name}>{props.label}</label>
            <input type="textarea" name={props.name} value={props.value} onChange={props.onChange} disabled={props.disabled}/>
        </div>
    );
}

export function InputDate(props){
    return(
        <div className="input-block">
            <label htmlFor={props.name}>{props.label}</label>
            {/*<DayPickerInput classNames="" onDayChange={props.onDayChange} />*/}
            <input type="date" className="input-base" name={props.name} value={props.value} onChange={props.onChange} disabled = {props.disabled}/>
        </div>
    );
}
