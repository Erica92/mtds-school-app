import React from 'react';
import BaseTile from '../components/BaseTiles';
import {SectionTitleTile, TileHeader} from '../components/BaseTiles';
import * as CONSTANTS from '../api/apiUtils';


export default class ProgramPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            classDetails: this.props.classDetails
        }
    }
    
    render(){
        return (
            <div className="app-content">
                <SectionTitleTile title={"Program of "+this.state.classDetails.Subject} subtitle={"Class "+this.state.classDetails.ClassID} goToPrevPage={this.props.goToPrevPage} />    
                <div className="base-tile">
                    <TileHeader text="Program description" toggleImg={require("../images/launch_white_18x18.png")} />
                    <div className="tile-content">        
                        {this.state.classDetails.Program}
                    </div>
                </div>
            </div>
        );
    }
}