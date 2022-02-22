const Message = require('../models/message');

const saveMessageToDb = async (senderId, messageId, message) => {
    let messageObj = new Message({
        senderId: senderId,
        messageId: messageId,
        message: message,
    });
    messageObj = await messageObj.save();
    console.log('saved message to db');

    return messageObj;
}

module.exports = {
    saveMessageToDb,
}    