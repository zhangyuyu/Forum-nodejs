const handler = (app) => {

    app.use((err, req, res, next) => {
        return res.status(err.code || 500).send(err.message);
    });
}

module.exports = handler;
