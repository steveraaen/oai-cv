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

// const covLetAsstInstrux = 'I am applying for a job and need a cover letter.  I will provide my resume and a job description. I have several categories of skills, and the cover letter should highlight skills and experiences from my resume that match the job requirements. I may also direct you to use a specific tone, for example, more formal or less formal. I also might ask you to emphasize a certain experience or skill.';



    
//     const thread = await openai.beta.threads.create({})
//     const message = await openai.beta.threads.messages.create(thread.id, {
//       role: 'user',
//       content:
//         'Return a javascript array of the skills identified in the file ids.',
//     })
//     console.log(obj)
//     const run = await openai.beta.threads.runs.create(thread.id, {
//       assistant_id: 'asst_AUWadjn4T6RXjvX9YA2iMKdo',
//     })
//     console.log('Run has been created: ', run)
// }
// // 
// async function getBlurb(r) {}
app.post('/api/skills', async(req, res) => {
  // console.log(req.body.params[0].doc.desc)
  const doc = req.body.params[0].doc.desc
  console.log(doc)
  const skillsThread = await openai.beta.threads.create({})
  console.log(skillsThread.id)
  const message = await openai.beta.threads.messages.create(skillsThread.id, {
    role: 'user',
    content:
      `${doc} is either a job description or a resume. Identify each of the professional skills referenced in the string. 
      Extract skills in the text that represent the following categories: ${'product management'} skills, ${'technical skills'}, and ${'sales'} skills.
      Describe each skill in three words or less. Return a Javascript object. The objects' keys will be the categories and the values will be a Javascript arrray of the skills`,
      
  })
  const run = await openai.beta.threads.runs.create(skillsThread.id, {
    assistant_id: 'asst_mk6S5OHu9bcYTfqKIATAiIeZ',
  })
  console.log('Run has been created: ', run)
  const checkRun = async () => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        const retrieveRun = await openai.beta.threads.runs.retrieve(
          skillsThread.id,
          run.id
        )
        console.log('Run status: ', retrieveRun.status)
        if (retrieveRun.status === 'completed') {
          console.log('Run completed: ')
          clearInterval(interval)
          resolve(retrieveRun)
        }
      }, 3000)
    })
  }
  await checkRun()
    const messages = await openai.beta.threads.messages.list(skillsThread.id)


  // for(let i=0; i < messages.data.length; i++) {
  //   console.log(messages.data[i].content)
  // }
    const skillsObj = {
      'threadID': skillsThread.id,
      'skills': messages.data[0].content[0].text
    }
    console.log(skillsObj)
    res.json(skillsObj)
})


app.post('/api/cvWriter', async(req, res) => {
  const resume = req.body.params[0].obj.resume
  const description = req.body.params[0].obj.description

  const thread = await openai.beta.threads.create({})
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content:
      `${resume} is a string preseenting my resume. ${description} is a string representing the job I am applying to. Write a 150 word cover letter that 
      points out how my skills and experience match the job description`,
      stream: true
  })

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: 'asst_AUWadjn4T6RXjvX9YA2iMKdo',
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
          console.log('Run completed: ')
          clearInterval(interval)
          resolve(retrieveRun)
        }
      }, 3000)
    })
  }
  await checkRun()
    const messages = await openai.beta.threads.messages.list(thread.id)
    console.log(messages.data[0].content[0].text)

  // for(let i=0; i < messages.data.length; i++) {
  //   console.log(messages.data[i].content)
  // }

    res.json(messages.data[0].content[0].text)
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

// main();

// -----Original completion skills promptt
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




































