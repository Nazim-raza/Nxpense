//error Middleware || NEXT Function, Middleware comes in the middle of the request and response cycle of the node.js execution. It also provides access to many functions like request and response....

const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultErrors = {
        statusCode: 500,
        message: err
    }
    // res.status(500).send({
    //     success: false,
    //     message: "Something went Wrong",
    //     err,
    // });
    //missing filed error
    if (err.name === 'ValidationError') {
        defaultErrors.statusCode = 400
        defaultErrors.message = Object.values(err.errors).map(item => item.message).join(',')
    }
    res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};

export default errorMiddleware
