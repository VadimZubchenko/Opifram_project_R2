const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    res.sendStatus(400);
};

const unknownEndpoint = (req, res) => {
    console.error('Unknown endpoint');
    res.status(404).json({ error: 'Unknown endpoint' });
}

module.exports = { errorHandler, unknownEndpoint };