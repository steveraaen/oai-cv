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

app.post('/api/skills', async(req, res) => {

  const resume = req.body.params[0].doc.resume
  // console.log(resume)
  const openAISkills = await openai.chat.completions.create({
  model: "gpt-3.5-turbo-1106",
  response_format: { type: "json_object" },
  messages: [
  {role: "system",content: "You are a helpful assistant designed to output JSON."},
  {role: 'user', content: `Read the following text """ ${resume}."""`},
  {role: 'user', content: `Extract 1 to 3 word phrases in the text that represent product management skills, technical skills, and sales skills.`},
  {role: 'user', content: `Format the result as an object with keys representing the skill category, and the values listed in an array.`}
],
    // max_tokens: 1000,
    temperature: .2
  });
  const oAISkillsList =openAISkills.choices[0].message.content


  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const prompt =  `${resume} is either a job description or a resume. Identify each of the professional skills referenced in the string. 
      Extract skills in the text that represent the following categories: ${'product management'} skills, ${'technical skills'}, and ${'sales'} skills.
      Describe each skill in three words or less. The objects' keys will be the categories and the values will be an array of the skills. Return only the
      object, without string literals.`
 
  const geminiSkills = await model.generateContent(prompt);
  const response = await geminiSkills.response;
  console.log(response.text)
  const geminiSkillsList = response.text();
  const skillsListBoth= [oAISkillsList,geminiSkillsList]

  res.send(skillsListBoth)                  


})
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
// async function main() {
//   const stream = await openai.chat.completions.create({
//     model: 'gpt-4',
//     messages: [{ role: 'user', content: 'Tell me a knock knockjoke' }],
//     stream: true,
//   });
//   for await (const chunk of stream) {
//     process.stdout.write(chunk.choices[0]?.delta?.content || '');
//   }
// }

// // main();