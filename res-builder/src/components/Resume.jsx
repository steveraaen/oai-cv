import React, { useState} from 'react';
import {Button, Box, TextField, Typography } from '@mui/material';
import helperFuncs from '../helpers/apiRoutes';



function PasteResume(props) {
    const [disabled, setDisabled] = useState(false) 
    const [height, setHeight] = useState(600) 
    // const textFieldRef = useRef(null);

    // function handleSetResume()  {
    //  if (textFieldRef.current) {
    //     const textFieldValue = textFieldRef.current.value;
        
    //     props.setResume(textFieldValue);
    //     // helperFuncs.getBlurb(textFieldValue)
    //     setDisabled(true)
    //     setHeight(200)
    //         }
    // }
    return(
        <Box sx={{display: 'flex', flexDirection: 'column'}} > 
            <TextField 
            value={props.resume}
               
                sx={{width: 400, height: {height}, overflow: 'scroll','.MuiInputBase-input': { fontSize: '.8rem' } }}        
                multiline={true}
                disabled= {disabled}>                        
            </TextField>

        </Box>
    )
}
export default PasteResume;