
function httpGetServerStatus(req, res) {
    console.log('Inizialiting server')
    res.status(200).json({ status: 'active' })
}

module.exports = {
    httpGetServerStatus
}