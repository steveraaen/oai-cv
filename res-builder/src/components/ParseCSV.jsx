import React, { useRef, useState} from 'react';
import axios from 'axios';
import {Button } from '@mui/material';


function ParseLinkedIn(props) {
	console.log(props.liData)
	const reports= {
		'endorsementGiven': 'Endorsement_Given_info.csv',
		'endorsementReceived': 'Endorsement_Received_info.csv',
		'connections' : 'Connections.csv',
		'skills': 'Skills.csv'
	} 


	return(
		<div>
			<Button onClick= {() => props.handleLinkedIn(reports.connections)}>LinkedIn</Button>
		</div>
		)

}
export default ParseLinkedIn