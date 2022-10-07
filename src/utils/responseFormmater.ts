export const responseFormagger = (req, response, statusCode) => {
    req.responseObject = response;
    req.statusCode = statusCode
}