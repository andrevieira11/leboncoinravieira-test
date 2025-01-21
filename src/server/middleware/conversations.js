const path = require('path')
const db = require(`${path.dirname(__filename)}/../db.json`)

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userId = req.query?.senderId
    let result = db?.conversations?.filter(
      conv => conv.senderId == userId || conv.recipientId == userId
    )

    const conversationId = req.query?.id
    if (!!conversationId) {
      result = result.filter(
        conv => conv.id == conversationId
      )
      result = result[0]
    }

    res.status(200).json(result)
    return
  }

  next()
}