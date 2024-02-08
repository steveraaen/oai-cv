const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const OpenAI = require("openai")
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const inputs = require("./sampleStrings")
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 5001

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY });
async function run() {

  app.post('/api/skills', async(req, res) => {
  const doc = req.body.params[0].doc.desc
  console.log(doc)
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const prompt =  `${doc} is either a job description or a resume. Identify each of the professional skills referenced in the string. 
      Extract skills in the text that represent the following categories: ${'product management'} skills, ${'technical skills'}, and ${'sales'} skills.
      Describe each skill in three words or less. Return a Javascript object. The objects' keys will be the categories and the values will be a Javascript arrray of the skills`
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(response.candidates[0].content);

})
  app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
}

// run();
//   const resumeSkills = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo-1106",
//   response_format: { type: "json_object" },
//   messages: [
//   {role: "system",content: "You are a helpful assistant designed to output JSON."},
//   {role: 'user', content: `Read the following text """ ${req.body.params[0].doc}."""`},
//   {role: 'user', content: `Extract words in the text that represent product management skills, technical skills, and sales skills.`},
//   {role: 'user', content: `Format the list as a javascript array.`}
// ],
//     max_tokens: 1000,
//     temperature: 0
//   });
//   const skillsList = await resumeSkills.data
//   console.log(skillsList)
//   // return skillsList

//     res.send(skillsList)


//    app.listen(port, () => {
//   console.log(`App listening on port ${port}`)
// })