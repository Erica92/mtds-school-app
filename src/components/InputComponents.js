import React from 'react';
import './BaseStyle.css';

export function InputText(props){
    return(
        <div className="input-block">
            <label for={props.name}>{props.label}</label>
            <input type="text" name={props.name} value={props.value} onChange={props.onChange} disabled={props.disabled}/>
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