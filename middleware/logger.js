module.exports = (format) =>{
    return (req, res, next) => {
        const { ip, method, url } = req
        const agent = req.get('User-Agent')
        format === 'short' ? console.log(`${method} ${url}`) : console.log(`${ip} ${method} ${url} ${agent}`)
        next()
    }
}