import jwt from "jsonwebtoken";
import {ENV} from "../constant/index.mjs";

const tokenVerification = (req, res, next) => {
    try {
        if (req.headers?.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, ENV.JWT_SECRET);
            if (decoded) {
                next();
            } else {
                res.status(401).send({ status: 401, message: "Unauthorized Token" });
            }
        } else {
            res.status(400).send({ status: 400, message: "Unauthorized Access" });
        }
    } catch (err) {
        res.status(401).send({ err: err, status: 401, message: "Unauthorized Token" });
    }
};
export default tokenVerification;

// fetch("url",{
//     headers:{
//         "Authorization":"Barear token"
//     }
// })
