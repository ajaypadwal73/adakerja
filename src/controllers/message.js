const Message = require('../models/message');
const User = require('../models/user');


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

const getAllMessagesFromDB = async (req, res) => {
    try {
        let messageObj = await Message.find();
        if(!messageObj) {
            res.status(404).json({
                message: 'No messages found'
            });
        } else {
            res.status(200).json(messageObj);
        }    
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getMessageFromDBById = async (req, res) => {
    try {
        const messageId = req.params.id;
        let messageObj = await Message.findOne({ messageId: messageId });
        if(!messageObj) {
            res.status(404).json({
                message: 'message not found'
            });
        }
        return res.status(200).json(messageObj);
    } catch (err) {
        console.log(err);
        return res.status(403).json({
            error: "Error in getting message from db"
        });
    }
}

const getMessageSummary = async (req, res) => {
    try {
        let summaryData = await User.aggregate([
            {
                $lookup: {
                    from: "messages", localField: "psid", foreignField: "senderId", as: "messages",
                }
            }
        ]);
        return res.status(200).json(summaryData);

    } catch (err) {
        console.log(err);
        return res.status(403).json({
            error: "Error in getting message summary"
        });
    }

}

module.exports = {
    saveMessageToDb,
    getMessageFromDBById,
    getAllMessagesFromDB,
    getMessageSummary
}    