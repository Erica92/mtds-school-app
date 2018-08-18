import React from 'react';
import ReactDOM from 'react-dom';
import {Spinner} from '../components/BaseComponents';
import ParentDashboard from '../components/ParentDashboard';
import AppHeader from '../components/AppHeader';
import * as ApiCalls from '../api/parentAPI';
import CalendarPage from './CalendarPage';
import StudentDetailsPage from './StudentDetailsPage';
import ParentPersonalDataPage from './ParentPersonalDataPage';
import StudentPersonalDataPage from './StudentPersonalDataPage';
import PaymentPage from './PaymentPage';
import * as CONSTANTS from '../api/apiUtils';
import * as Utils from '../utils/Utils';

export default class AdminApp extends React.Component {

	render (){
		return (<span>ciao</span>);
	}
}