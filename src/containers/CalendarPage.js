import React from 'react';
import BaseTile from '../components/BaseTiles';
import Calendar from '../components/CalendarComponent';
import {SectionTitleTile, TileHeader} from '../components/BaseTiles';
import * as CONSTANTS from '../api/apiUtils';
import $ from 'jquery'; 


export default class CalendarPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true
        }
    }
    
    render(){
        return (
            <div className="app-content">
                <Calendar />
            </div>
        );
    }
}