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

// async function run() {
  // For text-only input, use the gemini-pro model
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
  console.log(text);

})
  app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
// }

// run();