const dotenv = require('dotenv')
const OpenAI = require("openai")
const inputs = require('./exampleStrings')
dotenv.config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});
async function xxxx() {
    const asst =  [
      {role: "system",content: "You are a helpful assistant designed to output JSON."},
      // {role: 'user', content: `Read the following text """ ${r}."""`},
      {role: 'user', content: `Extract words in the text that represent product management skills, technical skills, and sales skills.`},
      {role: 'user', content: `Format the list as a javascript array.`}
    ]
    const cv = 'file-N7vGQLk49QRscIK81rXHN342'
    const  desc = 'file-YAnUSuq89OJPZzeEW7bNkaEm'
// ----------------------------- -----------------------------------------------

    const assistant = await openai.beta.assistants.create({
      name: "Skills Extractor",
      description: "You will be provided the text of either a resume or a job description. The text will include skills. The skills may or may not be labeled as such. You will extract the skills that could be important in a business context. Each skill will be four words or less.  You will categorize skills e.g. 'programming', 'sales', 'communications', 'management'.",
      model: "gpt-3.5-turbo-1106",
      tools: [{"type": "code_interpreter"}],
      file_ids: [cv, desc]
    });
    console.log('Assistant has been created: ', assistant)

    const thread = await openai.beta.threads.create({})
    console.log('Thred has been created: ', thread)

    const message = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content:
        'Return a javascript array of the skills identified in the file ids.',
    })
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    })
    console.log('Run has been created: ', run)

  const checkRun = async () => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        const retrieveRun = await openai.beta.threads.runs.retrieve(
          thread.id,
          run.id
        )

        console.log('Run status: ', retrieveRun.status)

        if (retrieveRun.status === 'completed') {
          console.log('Run completed: ', retrieveRun)

          clearInterval(interval)
          resolve(retrieveRun)
        }
      }, 3000)
    })
  }
  await checkRun()

  
}
xxxx()
