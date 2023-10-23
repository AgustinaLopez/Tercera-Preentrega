import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config/config.js";
import TicketModel from "./dao/models/ticket.model.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { PRIVATE_KEY } = config;
export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
    return token;
};



//Implementamos  Bcrypt
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) =>{
    return bcrypt.compareSync(password, user.password)
}

export const generateJWToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '120s'});
};

export const codeGenerator = async () => {
    let last = (await TicketModel.find().sort({ purchase_datetime: -1 }))[0].code
    if(!last) last = "AA00"
    
    let letters = last.slice(0, 2)
    let nums = parseInt(last.slice(2))
  
    if(nums === 99) {
      if (letters.charCodeAt(1) === 90) {
        letters = String.fromCharCode((letters.charCodeAt(0) + 1)).concat(String.fromCharCode(65))
      } else {
        letters = letters[0].concat(String.fromCharCode((letters.charCodeAt(1) + 1)))
      }
      nums = "00"
    } else {
      nums = (nums + 1).toLocaleString(undefined, {minimumIntegerDigits: 2})
    }
  
    return letters.concat(nums)
}

//Strategy de Passport.
// export const passportCall = (strategy) => {
//     return async (req, res, next) => {
//         passport.authenticate(strategy, function (err, user, info) {
//             if (err) return next(err);
//             if (!user) {
//                 return res.status(401).send({error: info.messages?info.messages:info.toString()});
//             }
//             req.user = user;
//             next();
//         })(req, res, next);
//     }
// };

export default __dirname;