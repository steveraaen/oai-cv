const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const openai = require("openai")
const app = express()
const port = 5001

// openai funx and routes
const configuration = new openai.Configuration({
    organization: "org-WITQCDPm5FWAyOvU5zjhtM3n",
    apiKey: process.env.OPENAI_API_KEY,
});
const openaiSession = new openai.OpenAIApi(configuration);
// ----------------  return paragraph string

// messages: [{"role": "system", "content": "You are a helpful assistant."},
//     {"role": "user", "content": "Who won the world series in 2020?"},
//     {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
//     {"role": "user", "content": "Where was it played?"}]


async function getBlurb(r) {
  const skillMatchObj = {}
	const response = await openaiSession.createChatCompletion({
	  model: "gpt-3.5-turbo",
      messages: [
       {role: 'system', content: `Tell me a dad joke`},
       // {role: 'system', content: `You will read the attached resume, which is ${r.docs.resume}, and list the skills asserted `},
],
	  max_tokens: 1000,
	  temperature: 0
	});
	const blurb = response.data.choices
    console.log(response.data.choices)
	return blurb
}
app.post('/api/blurb', async(req, res) => {
    // console.log(req.query)
  res.send(await getBlurb(req.query))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})












































