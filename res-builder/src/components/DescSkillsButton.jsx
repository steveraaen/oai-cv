import React, { useRef, useState} from 'react';
import {Button } from '@mui/material';

function DescSkillsButton(props) {
    console.log(props)
    function  handleRunClick(ev) {
        console.log(ev)
    	ev.preventDefault()
        // props.getResumeSkills()
        if(ev.target.id === 'JobSkillsButton' && props.desc) {
        	props.getSkills({'desc': props.desc})
        }
    }
    return(
        <Button id= 'JobSkillsButton' onClick={(e) => handleRunClick(e)}>Get Job Skills</Button>
    )
}
export default DescSkillsButton