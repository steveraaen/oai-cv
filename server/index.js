const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const OpenAI = require("openai")
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 5001

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const covLetAsstInstrux = 'I am applying for a job and need a cover letter.  I will provide my resume and a job description. I have several categories of skills, and the cover letter should highlight skills and experiences from my resume that match the job requirements. I may also direct you to use a specific tone, for example, more formal or less formal. I also might ask you to emphasize a certain experience or skill.';

// async function assistant() {
//   const myAssistant = await openai.beta.assistants.create({
//     instructions:
//       "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
//     name: "Resume helper",
//     tools: [{ type: "code_interpreter" }],
//     model: "gpt-3.5-turbo-1106",
//   });

//   console.log(assistant);
// }
// assistant()



async function getBlurb(r) {
const resStats = await openai.chat.completions.create({
  model: "gpt-3.5-turbo-1106",
  response_format: { type: "json_object" },
  messages: [
  {role: "system",content: "You are a helpful assistant designed to output JSON."},
  {role: 'user', content: `Read the following text """ ${r}."""`},
  {role: 'user', content: `Extract words in the text that represent product management skills, technical skills, and sales skills.`},
  {role: 'user', content: `Format the list as a javascript array.`}
],
	  max_tokens: 1000,
	  temperature: 0
	});
  console.log(resStats.data.choices)
	return resStats.data.choices
}
app.post('/api/blurb', async(req, res) => {
    res.send(await getBlurb(req.body.params[0].resume))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})












































