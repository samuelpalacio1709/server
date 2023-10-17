
function httpGetServerStatus(req, res) {
    res.status(200).json({ status: 'active' })
}

module.exports = {
    httpGetServerStatus
}