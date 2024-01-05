import React, { useState } from 'react';
import {Button, Container, InputLabel, MenuItem, Select } from '@mui/material';

function Focus(props) {

    return(
        <Container>
		  <InputLabel id="demo-simple-select-label">Age</InputLabel>
		  <Select
		    labelId="demo-simple-select-label"
		    id="demo-simple-select"
		    value={'age'}
		    label="Age"
	
		  >
		    <MenuItem value={10}>Ten</MenuItem>
		    <MenuItem value={20}>Twenty</MenuItem>
		    <MenuItem value={30}>Thirty</MenuItem>
		  </Select>
        </Container>
    )
}
export default Focus