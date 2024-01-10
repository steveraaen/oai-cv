import React, { useState } from 'react';
import {Button,  Input, Stack } from '@mui/material';
import Docxtemplater from "docxtemplater";
import PizZip from 'pizzip'
import helperFuncs from '../helpers/apiRoutes';

console.log(helperFuncs)
function FileUpload(props) {
  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const doc = new Docxtemplater(new PizZip(content));
      const text = doc.getFullText();
      props.setResume(text)
      props.setPrompt({
         ...props.prompt,
        resume: text
      });
    };
    reader.readAsBinaryString(e.target.files[0]);
  };
  return (
    <Stack direction="row" spacing={2}>
      <Input 
              type="file" 
              id = "fileName"           
              onChange = {(event) => showFile(event)}  />
    </Stack>
  );
}
export default FileUpload;