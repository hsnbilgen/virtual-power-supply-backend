const errorHandler = (err, req, res, next) => {
    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
            errors: err.errors
        });
    });
	if (typeof err !== "object") {
		// If the object is not an Error, create a representation that appears to be
		err = {
			message: String(err)
		};
	} else {
		// Ensure that err.message is enumerable (It is not by default)
		Object.defineProperty(err, "message", { enumerable: true });
	}

	res.set("Content-Type", "application/json");
	res.status(err.status || err.statusCode || 500).send(JSON.stringify(err));
};

module.exports = {
    errorHandler  
}