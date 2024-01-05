import React, { useState } from 'react';
import {Box, Button, Container, FormControl, FormLabel, Menu, MenuItem, Select } from '@mui/material';

function Aggression(props) {
  // const [taco, setTaco] = useState('');

	const changeAggression = (e) => {
		console.log(e.target)
      props.setPrompt({
         ...props.prompt,
        aggression: e.target.value
      });
	}

    return(
    <Box sx={{ minWidth: 120 }}>
      <FormControl name='aggcon' id='aggression-form' autoComplete="off">
        <FormLabel name='agglabel' id="demo-simple-select-label">Aggression</FormLabel>
        <Select
        name= 'agg'
          labelId="demo-simple-select-label"
          id="demo-sple-select"
          value={props.prompt.aggression}
          label="Age"
          onChange={changeAggression}
        >
          <MenuItem value={'passive'}>Passive</MenuItem>
          <MenuItem value={'normal'}>Normal</MenuItem>
          <MenuItem value={'aggressive'}>Agressive</MenuItem>
        </Select>
      </FormControl>
    </Box>
    )
}
export default Aggression