import React from 'react';
import './BaseStyle.css';

export function InputText(props){
    return(
        <div className="input-block">
            <label for={props.name}>{props.label}</label>
            <input type="text" name={props.name} value={props.value} onChange={props.onChange} />
        </div>
    );
}