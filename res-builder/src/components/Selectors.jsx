import React, { useState } from 'react';
import {FormControl, FormHelperText, Input, InputLabel, MenuItem, Select} from '@mui/material';

function Selectors(props) {

    const changeSelect = (e) => {
        if(e.target.name === 'agg') {
          props.setPrompt({
             ...props.prompt,
            aggression: e.target.value
            });
        } else if (e.target.name === 'tone') {
           props.setPrompt({
             ...props.prompt,
            tone: e.target.value
            });           
        } else if (e.target.name === 'focus') {
           props.setPrompt({
             ...props.prompt,
            focus: e.target.value
            }); 
    }
}
    return(<>
        <FormControl sx= {{width: '20vw'}}>
            <InputLabel id="select-agg-label">Aggression</InputLabel>
            <Select
            name= 'agg'
              labelId="select-agg--label"
              id="agg-select"
              defaultValue={'Normal'}
              value= {props.prompt.aggression || ''}
              label= {"Aggression"}
              onChange={changeSelect}
            >
              <MenuItem value={'Passive'}>Passive</MenuItem>
              <MenuItem value={'Normal'}>Normal</MenuItem>
              <MenuItem value={'Aggressive'}>Agressive</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx= {{width: '20vw', marginLeft: '20px'}}>
            <InputLabel id="select-tone-label">Tone</InputLabel>
            <Select
            name= 'tone'
              labelId="select-tone-label"
              id="tone-select"
              defaultValue={'Normal'}
              value= {props.prompt.tone || ''}
              label= {"Tone"}
              onChange={changeSelect}
            >
              <MenuItem value={'Informal'}>Informal</MenuItem>
              <MenuItem value={'Normal'}>Normal</MenuItem>
              <MenuItem value={'Formal'}>Formal</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx= {{width: '20vw', marginLeft: '20px'}}>
            <InputLabel id="select-focus-label">Focus</InputLabel>
            <Select
            name= 'focus'
              labelId="select-focus-label"
              id="focus-select"
              defaultValue={'Product Management'}
              value= {props.prompt.focus || ''}
              label= {"Focus"}
              onChange={changeSelect}
            >
              <MenuItem value={'Product Management'}>Product Management</MenuItem>
              <MenuItem value={'Software Development'}>Software Development</MenuItem>
              <MenuItem value={'Financial'}>Financial Markets</MenuItem>
              <MenuItem value={'Sales'}>Sales</MenuItem>
            </Select>
        </FormControl>
        </>
    )
}
export default Selectors