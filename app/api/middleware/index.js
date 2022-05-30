const errorHandler = (err, req, res, next) => {
	if (typeof err !== "object") {
		// If the object is not an Error, create a representation that appears to be
		err = {
			success: false,
			message: String(err)
		};
	} else {
		// Ensure that err.message is enumerable (It is not by default)
		err['success'] = err.status >= 400 || err.statusCode >=400 ? false : true; 
		Object.defineProperty(err, "message", { enumerable: true });
	}

	res.set("Content-Type", "application/json");
	res.status(err.status || err.statusCode || 500).json({
		success: false,
		message: err.message,
		errors: err.errors
	});
};

module.exports = {
    errorHandler  
}