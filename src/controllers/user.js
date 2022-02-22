const axios = require('axios');
const User = require('../models/user');

const getUserDetailsUsingPsid = async(psid) => {
    const userDetails = await axios.get(`https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.FB_PAGE_TOKEN}`);
    return userDetails.data;
}

const addUserDetailsToDB = async(psid, userDetails) => {
    let user = await User.findOne({ psid: psid });
    if (!user){
        user = new User({
            psid: psid,
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
        });
        user = await user.save();
    }
    return user;
}

module.exports = {
    getUserDetailsUsingPsid,
    addUserDetailsToDB,
}

