const request = require('request');
const axios = require('axios');

const getUserDetailsUsingPsid = async(psid) => {
    const userDetails = await axios.get(`https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.FB_PAGE_TOKEN}`);
    return userDetails.data;
}

module.exports = {
    getUserDetailsUsingPsid,
}

