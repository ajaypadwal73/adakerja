const axios = require('axios');
const User = require('../models/user');
const Message = require('../models/message');

const getUserDetailsUsingPsid = async (psid) => {
    const userDetails = await axios.get(`https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.FB_PAGE_TOKEN}`);
    return userDetails.data;
}

const addUserDetailsToDB = async (psid, userDetails) => {
    try {
        let user = await User.findOne({ psid: psid });
        if (!user) {
            user = new User({
                psid: psid,
                first_name: userDetails.first_name,
                last_name: userDetails.last_name,
            });
            user = await user.save();
        }
        return user;
    } catch (error) {
        console.log('Error saving user to DB', error);
    }
}

const getLastMessageFromDB = async (psid) => {
    try {
        const lastMessage = await Message.find({ psid: psid }).sort({ createdAt: -1 }).limit(1);
        return lastMessage[0];
    } catch (error) {
        console.log('Error getting last message from DB', error);
    }
}

module.exports = {
    getUserDetailsUsingPsid,
    addUserDetailsToDB,
    getLastMessageFromDB,
}

