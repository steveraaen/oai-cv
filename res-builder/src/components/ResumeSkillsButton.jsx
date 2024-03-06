import React, { useRef, useState} from 'react';
import {Button } from '@mui/material';

function ResumeSkillsButton(props) {
    function  handleRunClick(ev) {
        // console.log(ev)
    	ev.preventDefault()
        // props.getResumeSkills()
        if(ev.target.id === 'ResumeSkillsButton' && props.resume) {
            // console.log(props.resume)
        	props.getSkills({'resume': props.resume})
        }
    }
    return(
        <Button id= 'ResumeSkillsButton' onClick={(e) => handleRunClick(e)}>Get Resume Skills</Button>
    )
}
export default ResumeSkillsButton