import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {

 const { token } = req.cookies;

 if (!token) {
  throw new UnauthenticatedError('Authentication failed')
 }

 try {
  const {userId, role} = verifyToken(token);
  req.user = {userId, role}
  next();
 } catch (error) {
  throw new UnauthenticatedError('Authentication failed')
 }

}