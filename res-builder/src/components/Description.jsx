import React, { useState } from 'react';
import {Box, TextField } from '@mui/material';


function Description(props) {
    const [disabled, setDisabled] = useState(false) 
    const [height, setHeight] = useState(600) 
    if(props.resumeSkills.content) {
        console.log(props.resumeSkills.content)
    }
    return(
        <Box sx={{display: 'flex', flexDirection: 'column'}} > 
            <TextField 
            value={props.resume}
            multiline={true}
                disabled= {disabled}>                        
            </TextField>

        </Box>
    )
}
export default Description;