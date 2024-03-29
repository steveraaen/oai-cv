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
import CoverLetter from './components/CoverLetter';
import DescSkillsButton from './components/DescSkillsButton';
import ResumeSkillsButton from './components/ResumeSkillsButton';
import ResumeSkills from './components/ResSkills';
import SaveDocx from './components/SaveDocx';
import ParseLinkedIn from './components/ParseCSV';
import helperFuncs from './helpers/apiRoutes';
import inputs from './helpers/exampleStrings';

function App() {
  const [resume, setResume] = useState(inputs.resume)
  const [desc, setDesc] = useState(inputs.meta)
  const [tone, setTone] = useState('Normal')
  const [focus, setFocus] = useState('Product')
  const [aggression, setAggression] = useState('Normal')
  const [resumeSkills, setResumeSkills] = useState({'gemini': [],
                                                    'oai': []})
  const [descriptionSkills, setDescriptionSkills] = useState({'gemini': [],
                                                    'oai': []})
  const [coverLetter, setCoverLetter] = useState([])
  const [prompt, setPrompt] = useState({'resume': '',
                                        'desc': desc,
                                        'tone': 'Normal',
                                        'focus': 'Product Management',
                                        'aggression': 'Normal'})
  const [liData, setLiData] = useState([])


  async function handleLinkedIn(rpt) {

    try {
      console.log(rpt)
      const liPromise = await axios.post('/api/liReports', {params:{rpt}})
      const lDat = liPromise
      console.log(lDat.data)
      setLiData(lDat.data)
    }         
    catch (e) {
          console.error(e);
      }
  }
async function getSkills (doc) {
  console.log(doc)
    try {
      const skillsPromise = await axios.post('/api/skills', {params:[{doc}]})     
      const skills = skillsPromise
      // const oAISkillsList = skills.data[0]
      // const geminiSkillsList = skills.data[1]

      // console.log(skills.data)
      // console.log(skills.data[1])


      // const skillList =skills.data.skills
      // for (let i = 0; i < skillList.length; i++) {
      //   for(let j=0; j < skillList[i].length; j++) {
      //     console.log(skillList[i][j])
      //   }
      // }

      if(doc.resume){
      setResumeSkills({'gemini':skills.data[1],
                            'oai': skills.data[0]})
    } else if(doc.desc) {
      setDescSkills({'gemini':skills.data[1],
                            'oai': skills.data[0]})     
      }
    }
         catch (e) {
        console.error(e);
    
    }; 
}

async function processDesc(ev){
  await setDesc(ev)

}
async function writeCoverLetter(obj) {
  try {
    const letterPromise = axios.post('/api/cvWriter', {params:[{obj}]})
    const letter = await letterPromise
    setCoverLetter(letter.data.value)
    }
  catch (e) {
    console.error(e);
    }
}
async function writeLetter(o) {
  console.log(o)
  await writeCoverLetter({'resume': o.resume, 'description': o.desc})

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
        <Item> 
        <RunButton writeLetter= {writeLetter} desc={desc} resume={resume}/>
        <DescSkillsButton getSkills= {getSkills} desc={desc} />
        <ResumeSkillsButton getSkills= {getSkills} resume={resume}/>
        <ResumeSkills resumeSkills= {resumeSkills}/>
        </Item>
        
      </Grid>
      <Grid xs={6}>
        <Item> <Description processDesc ={processDesc} desc={desc}  /></Item>
        <Item> <SaveDocx coverLetter= {coverLetter} desc={desc} resume={resume}/></Item>
      </Grid>
      <ParseLinkedIn handleLinkedIn= {handleLinkedIn} liData= {liData}/>
    </Grid>   
    </>
  )
}

export default App
