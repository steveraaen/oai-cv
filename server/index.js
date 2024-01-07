const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const openai = require("openai")
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 5001

// openai funx and routes
const configuration = new openai.Configuration({
    organization: "org-WITQCDPm5FWAyOvU5zjhtM3n",
    apiKey: process.env.OPENAI_API_KEY,
});
const openaiSession = new openai.OpenAIApi(configuration);
// ----------------  return paragraph string

// const messages = [{'role': 'system', 'content': `You will read the attached resume, which is ${r.docs.resume}, and list the skills asserted `}]
    // {"role": "user", "content": "Who won the world series in 2020?"},
    // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    // {"role": "user", "content": "Where was it played?"}]


async function getBlurb(r) {

	const response = await openaiSession.createChatCompletion({
	  model: "gpt-3.5-turbo",
      messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
       {
        role: 'user', 
       content: `Read the following text """ ${r}."""`
     },
      {
        role: 'user', 
       content: `Return a list of skills asserted in the text.`
     },
],
	  max_tokens: 1000,
	  temperature: .8
	});
	return response.data.choices
}
app.post('/api/blurb', async(req, res) => {
      // console.log(req.body.params[0].resume)
    res.send(await getBlurb(req.body.params[0].resume))

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})












































