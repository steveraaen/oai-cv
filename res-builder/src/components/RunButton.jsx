import React, { useRef, useState} from 'react';
import {Button } from '@mui/material';
import helperFuncs from '../helpers/apiRoutes';

function RunButton(props) {
    function  handleRunClick(ev) {
        console.log(props)
        helperFuncs.getBlurb(props)
    }
    return(
        <Button onClick={(e) => handleRunClick(e)}>Write Cover Letter</Button>
    )
}
export default RunButton