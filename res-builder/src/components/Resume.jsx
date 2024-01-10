import React, { useState} from 'react';
import {Button, Box, TextField, Typography } from '@mui/material';
import helperFuncs from '../helpers/apiRoutes';



function PasteResume(props) {
    const [disabled, setDisabled] = useState(false) 
    const [height, setHeight] = useState(600) 

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
export default PasteResume;