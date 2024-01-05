import React, { useRef, useState} from 'react';
import {Button, Box, TextField, Typography } from '@mui/material';
import helperFuncs from '../helpers/apiRoutes';

function PasteDesc(props) {
    const [disabled, setDisabled] = useState(false) 
    const [height, setHeight] = useState(600) 
    const textFieldRef = useRef(null);

    function handleSetDesc()  {
     if (textFieldRef.current) {
        const textFieldValue = textFieldRef.current.value;
        
        props.setDesc(textFieldValue);
        // helperFuncs.getBlurb(textFieldValue)
        setDisabled(true)
        setHeight(200)
            }
    }
    return(
        <Box sx={{display: 'flex', flexDirection: 'column'}} > 
            <Typography variant= 'h5'>Paste Job Description Here</Typography>
            <TextField 
                inputRef={textFieldRef}
                sx={{width: 400, height: {height}, overflow: 'scroll','.MuiInputBase-input': { fontSize: '.8rem' } }}        
                multiline={true}
                disabled= {disabled}>                        
            </TextField>
            <Button 
                onClick={handleSetDesc}
                disabled= {disabled}>
                Set Resume
            </Button>
        </Box>
    )
}
export default PasteDesc;