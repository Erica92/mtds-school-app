import React from 'react';
import {Avatar} from './BaseComponents';

function TableRow(props){
    let cells = props.cellsList.map(cellText => return (<TableCell text={cellText}) />);
    
    return({
        <tr className="table-row">{cells}</tr>
    });
}

function TableRowGrades(props){
    let cells = props.cellsList.map(cellText => return (<TableCell text={cellText}) />);
    
    return({
        <tr className="table-row">
            <TableCellStudent text={props.cellHeaderText} avatarUrl={props.avatarUrl} />
            {cells}
        </tr>
    });
}

function TableCell(props){
    return (
            <td className="table-cell">{props.text}</td>
    );
}

function TableCellHeader(props) {
    return ({
        <td className="table-cell-header">{props.text}</td>
    });
}

function TableCellStudent(props) {
    return ({
        <td className="table-cell-header">
            <div>
                <div><Avatar src={props.avatarUrl} /></div>
                <div>{props.text}</div>
            </div>
        </td>
    });
}