import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { createHash, isValidPassword, generateToken } from "../utils.js";
import config from "./config.js";
import { cartsService, usersService } from "../repositories/index.js";
import UserDTO from "../dao/DTO/user.dto.js";

const {
  PRIVATE_KEY,
  COOKIE_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_ID,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = config;

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  const token = req && req.cookies ? req.cookies[COOKIE_NAME] : null;
  return token;
};

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  // Registro
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, role = "user" } = req.body;
          if (!first_name || !last_name || !email || !age || !password)
            return res
              .status(400)
              .json({ status: "error", error: "All fields must be filled" });

          const user = await usersService.getUserByEmail(username)

          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role,
          };

          const userCart = await cartsService.createCart()
          newUser.cart = userCart._id;

          const result = await usersService.createUser(newUser)

          return done(null, result);
        } catch (error) {
          return done("Error al registrar el usuario: " + error);
        }
      }
    )
  );

  // Login
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          if (username === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const admin = {
              _id: ADMIN_ID,
              email: username,
              password,
              first_name: "Admin",
              last_name: "Coder",
              age: 100,
              role: "admin",
            };

            const token = generateToken(admin);
            admin.token = token;
            const adminDTO = new UserDTO(admin)

            return done(null, adminDTO);
          }

          const user = await usersService.getUserByEmail(username)
          if (!user) {
            console.log("User doesn't exist");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);

          const token = generateToken(user);
          user.token = token;

          const newUser = new UserDTO(user)
          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Login con Github
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await usersService.getUserByEmail(profile._json.email)

          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 0,
              email: profile._json.email,
              password: "",
            };

            const userCart = await cartsService.createCart()
            newUser.cart = userCart._id;

            const result = await usersService.createUser(newUser)

            const token = generateToken(result);
            result.token = token;

            return done(null, result);
          }

          const token = generateToken(user);
          user.token = token;
          done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Current (JWT - obtener usuario actual por medio del token guardado en la cookie)
  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          const user = new UserDTO(jwt_payload.user)
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await usersService.getUserByID(id)
    done(null, user);
  });
};

export default initializePassport;