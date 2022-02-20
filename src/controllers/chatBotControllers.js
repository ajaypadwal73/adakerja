const getHomePage = (req, res) => {
    res.send("Hi, welcome to thhe assessment");
}

const getWebhook = (req, res) => {
    res.send("Hi, welcome from getWebhook");
}

const postWebhook = (req, res) => {
    res.send("Hi, welcome from postWebhook");
}

module.exports = {
    getHomePage,
    getWebhook,
    postWebhook,
}