import axios from 'axios'

const helperFuncs = {
    'getBlurb': getBlurb,
    'postPrompt': postPrompt
}


async function postPrompt(fullPrompt) {
	await axios.post('/user', {params: {fullPrompt}})
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
}




async function getBlurb(docs) {
    await axios.get('/api/blurb', {params:{docs}})
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}
export default helperFuncs