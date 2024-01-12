import React, { useRef, useState } from 'react';
import {Box, Button, TextField } from '@mui/material';


function Description(props) {

    const [disabled, setDisabled] = useState(false) 
    const [height, setHeight] = useState(600) 

    const valueRef = useRef('') 

    const sendValue = () => {
        props.setDesc(valueRef.current.value) 
    }

    return(
        <Box sx={{display: 'flex', flexDirection: 'column'}} > 
            <TextField 
                id= 'pastedDesc'
                inputRef={valueRef}
            // value={}
                multiline={true}
                disabled= {disabled}>                        
            </TextField>
            <Button  onClick={(e) => sendValue(e)}>Save Description</Button>

        </Box>
    )
}
export default Description;