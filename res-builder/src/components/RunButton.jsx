import React, { useRef, useState} from 'react';
import {Button } from '@mui/material';

function RunButton(props) {
    function  handleRunClick(ev) {
    	ev.preventDefault()
        // props.getResumeSkills()
        if(props.desc && props.resume) {
        	props.writeLetter({'resume': props.resume, 'desc': props.desc})
        }
    }
    return(
        <Button onClick={(e) => handleRunClick(e)}>Process Resume</Button>
    )
}
export default RunButton