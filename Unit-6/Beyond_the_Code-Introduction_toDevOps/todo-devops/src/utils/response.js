exports.success = (res, data, message = 'Success', status = 200) => {
    res.status(status).json({ success: true, data, message });
};

exports.fail = (res, message = 'Error', status = 400, errors = null) => {
    res.status(status).json({ success: false, message, errors });
};