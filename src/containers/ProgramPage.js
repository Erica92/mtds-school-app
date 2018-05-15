import React from 'react';
import BaseTile from '../components/BaseTiles';
import {SectionTitleTile, TileHeader} from '../components/BaseTiles';
import * as CONSTANTS from '../api/apiUtils';


export default class ProgramPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            classDetails: this.props.classDetails,
        }
    }
    
    render(){
        return (
            <div className="app-content">
                <SectionTitleTile title={"Program of "+this.state.classDetails.Subject} subtitle={"Class "+this.state.classDetails.ClassID} goToPrevPage={this.props.goToPrevPage} />    
                <div className="base-tile">
                    <TileHeader text="Program description" toggleImg={require("../images/mode_edit_white_24x24.png")} />
                    <div className="tile-content">        
                        <pre>
                            {this.state.classDetails.Program}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}