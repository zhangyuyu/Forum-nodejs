const handler = (app) => {

    app.use((err, req, res, next) => {
        const type = err.type;
        const message = err.message;

        if(type === 'ItemNotFound') {
            return res.status(404).send(message);
        }
        if(type === 'ContentTypeError') {
            return res.status(400).send(message);
        }
        if(type === 'DbCommunicationError') {
            return res.status(500).send(message);
        }

        return res.status(500).send(message);
        });
}

module.exports = handler;
