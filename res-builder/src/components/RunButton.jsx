import React, { useRef, useState} from 'react';
import {Button } from '@mui/material';



function RunButton(props) {
    function  handleRunClick(ev) {
    	ev.preventDefault()
        
        props.getResumeSkills()
    }
    return(
        <Button onClick={(e) => handleRunClick(e)}>Process Resume</Button>
    )
}
export default RunButton