import React, { useState } from 'react';
import {Box, Button, Container, FormControl, InputLabel, Menu, MenuItem, Select } from '@mui/material';

function Focus(props) {
	const [taco, setTaco] = useState('');
	const changeTone = (e) => {
		console.log(e.target)
      props.setPrompt({
         ...props.prompt,
        tone: e.target.value
      });
	}

    return(
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth id= 'toneForm' autoComplete="off">
        <InputLabel id="tone-label">Tone</InputLabel>
        <Select
          labelId="tone-label"
          id="tone-select"
          value={taco}
          label="Tone"
          onChange={changeTone}
        >
          <MenuItem value={'passive'}>Passive</MenuItem>
          <MenuItem value={'normal'}>Normal</MenuItem>
          <MenuItem value={'aggressive'}>Agressive</MenuItem>
        </Select>
      </FormControl>
    </Box>
    )
}
export default Focus   