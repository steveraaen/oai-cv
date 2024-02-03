const dotenv = require('dotenv')
const OpenAI = require("openai")
// const inputs = require('./exampleStrings')
// const MessageContentText = require('openai/resources/beta/threads/messages/messages')
dotenv.config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});
// async function xxxx() {

//     const cv = 'file-N7vGQLk49QRscIK81rXHN342'
//     const  desc = 'file-YAnUSuq89OJPZzeEW7bNkaEm'
// // ----------------------------- -----------------------------------------------

//     const assistant = await openai.beta.assistants.create({
//       name: "Skills Extractor",
//       description: "You will be provided the text of either a resume or a job description. The text will include skills. The skills may or may not be labeled as such. You will extract the skills that could be important in a business context. Each skill will be four words or less.  You will categorize skills e.g. 'programming', 'sales', 'communications', 'management'.",
//       model: "gpt-3.5-turbo-1106",
//       tools: [{"type": "code_interpreter"}],
//       file_ids: [cv, desc]
//     });
//     console.log('Assistant has been created: ', assistant)

//     const thread = await openai.beta.threads.create({})
//     console.log('Thred has been created: ', thread)
//     const letterThreadID = 'thread_Eoe88ImZpIFsWaHwFlpH2Zi9'

//     const skillsThreadID = 'thread_Eoe88ImZpIFsWaHwFlpH2Zi9'
//     const message = await openai.beta.threads.messages.create(skillsThreadID, {
//       role: 'user',
//       content:
//         'Return a javascript array of the skills identified in the file ids.',
//     })
//     const run = await openai.beta.threads.runs.create(skillsThreadID, {
//       assistant_id: 'asst_mk6S5OHu9bcYTfqKIATAiIeZ',
//     })
//     console.log('Run has been created: ', run)

//   const checkRun = async () => {
//     return new Promise((resolve, reject) => {
//       const interval = setInterval(async () => {
//         const retrieveRun = await openai.beta.threads.runs.retrieve(
//           skillsThreadID,
//           run.id
//         )

//         console.log('Run status: ', retrieveRun.status)

//         if (retrieveRun.status === 'completed') {
//           console.log('Run completed: ', retrieveRun)

//           clearInterval(interval)
//           resolve(retrieveRun)
//         }
//       }, 3000)
//     })
//   }
//   await checkRun()
//   const messages = await openai.beta.threads.messages.list(skillsThreadID)
//   console.log(messages)

//   for(let i=0; i < messages.data.length; i++) {
//     console.log(messages.data[i].content)
//   }
//   console.log('line 53' , messages.data.length)
  
// }
// xxxx()
async function main() {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Tell me a knock knockjoke' }],
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
