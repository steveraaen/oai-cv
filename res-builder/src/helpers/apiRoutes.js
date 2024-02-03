import axios from 'axios'

const helperFuncs = {
    'getBlurb': getBlurb,
    // 'writeCoverLetter': writeCoverLetter
}

async function getBlurb(docs) {
  try {
    const resumePromise = axios.post('/api/blurb', {params:[{docs}]})
    var resume = await resumePromise
    console.log(resume)
    }
  catch (e) {
    console.error(e)
    }
}




// console.log(docs)
    // await axios.post('/api/cvWriter', {params: obj})

    //     .then(res => {
    //         // console.log(res.data[0].message.content)
    //         return res.data
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         return null;
    //     });



export default helperFuncs