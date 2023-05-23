const httpResponse = (promise, req, res) => {
    promise
        .then((data) => {
        res.status(data.status || 200).json(data);
    }).catch((error) => {
        res.status(error?.status || 500).json({ msg: error.msg });
    });
};

module.exports = httpResponse;