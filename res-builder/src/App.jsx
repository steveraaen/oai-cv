import { useState, useEffect } from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import helperFuncs from './helpers/apiRoutes'
import RunButton from './components/RunButton';
import Aggression from './components/Aggression';
import Resume from './components/Resume';
import Tone from './components/Tone';
import Uploader from './components/Uploader';

// import Description from './components/Description';
// import Focus from './components/Focus';
import Selectors from './components/Selectors';

function App() {
 

  const [resume, setResume] = useState('')
  const [desc, setDesc] = useState('')
  const [tone, setTone] = useState('Normal')
  const [focus, setFocus] = useState('')
  const [aggression, setAggression] = useState('Normal')

  const [prompt, setPrompt] = useState({'resume': resume,
                                        'desc': desc,
                                        'tone': tone,
                                        'focus': focus,
                                        'aggression': aggression})
  const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
      return (
    <>
    <Uploader resume= {resume} setResume= {setResume} prompt= {prompt} setPrompt= {setPrompt}  />

    <Grid container spacing={2}>
      <Grid xs={10} sx= {{flex: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        <Item>
          <Selectors prompt= {prompt} setPrompt= {setPrompt}  />
        </Item>
      </Grid>
      <Grid xs={6}>
        <Item> <Resume resume={resume} /></Item>
      </Grid>
    </Grid>
   
    </>
  )
}

export default App
