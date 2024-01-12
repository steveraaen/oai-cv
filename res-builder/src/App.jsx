import { useState, useEffect } from 'react'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import RunButton from './components/RunButton';
import Resume from './components/Resume';
import Uploader from './components/Uploader';
import Description from './components/Description';
import Selectors from './components/Selectors';

function App() {

  const [resume, setResume] = useState('')
  const [desc, setDesc] = useState()
  const [tone, setTone] = useState('Normal')
  const [focus, setFocus] = useState('Product')
  const [aggression, setAggression] = useState('Normal')
  const [resumeSkills, setResumeSkills] = useState([])
  const [prompt, setPrompt] = useState({'resume': '',
                                        'desc': desc,
                                        'tone': 'Normal',
                                        'focus': 'Product Management',
                                        'aggression': 'Normal'})
async function getResumeSkills () {
    try {
      const skillsPromise = axios.post('/api/blurb', {params:[{resume}]})
      const skills = await skillsPromise
      setResumeSkills(skills.data[0].message)
      }
         catch (e) {
        console.error(e);
    };
}
function processDesc(e){
  console.log(e)
  setDesc(e)
}
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
        <Item>
          
        </Item>
      </Grid>
      <Grid xs={6}>
        <Item> <Resume resume={resume} />
        <RunButton getResumeSkills= {getResumeSkills} resumeSkills= {resumeSkills} prompt= {prompt} setPrompt= {setPrompt} resume={resume} />
        </Item>
        
      </Grid>
      <Grid xs={6}>
        <Item> <Description processDesc ={processDesc} desc={desc} setDesc={processDesc} /></Item>
      </Grid>
    </Grid>   
    </>
  )
}

export default App
