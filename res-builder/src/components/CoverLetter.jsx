import React, { useState} from 'react';
import {Button, Box, TextField, Typography } from '@mui/material';

function CoverLetter(props) {
    const [disabled, setDisabled] = useState(false) 
    const [height, setHeight] = useState(600) 

    return(
        <Box sx={{display: 'flex', flexDirection: 'column'}} > 
            <TextField 
            value={props.coverLetter}     
                multiline={true}
                disabled= {false}>                        
            </TextField>

        </Box>
    )
}
export default CoverLetter;