import React from 'react';
import { BrowserRouter , Route, Link , Switch } from "react-router-dom";

export default function HomePage(){
    return (
        <div>
            <div>HomePage</div>
            <ul>
                <li><Link to="/login" >Login</Link></li>
                <li><Link to="/teacherPortal" >Teacher Portal</Link></li>
            </ul>
            
        </div>
    );
}