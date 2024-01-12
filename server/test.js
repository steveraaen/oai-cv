const dotenv = require('dotenv')
const OpenAI = require("openai")
const inputs = require('./exampleStrings')
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

async function testThread(){
const thread = await openai.beta.threads.create({
  messages: [
    {
      "role": "user",
      "content": "Process the files as instructed.",
      "file_ids": [inputs.resume, inputs.jobSummary]
    }
  ]
});

const skillsAsst = 'asst_mk6S5OHu9bcYTfqKIATAiIe'

async function test() {
const run = await openai.beta.threads.runs.create(
  thread.id,
  { assistant_id: skillsAsst }
)
run()
}
test()
}