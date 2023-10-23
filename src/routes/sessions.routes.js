import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middleware/auth.js"
import { register, login, logout, getUser} from "../controllers/sessions.controller.js";

const router = Router();

router.post("/register", passportCall("register"), register);
router.post("/login", passportCall("login"), login);
router.get("/logout", passportCall("current"), logout);
router.get("/current", passportCall("current"), getUser);
router.get( "/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {});




//Github
// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })
// router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {

//     const user = req.user;

//     req.session.user = {
//         name: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         age: user.age
//     }

//     req.session.admin = true
//     res.redirect('/users')
// })



//Local
// router.post('/register', async (req, res)=>{
//     const {first_name, last_name, email, age, password} = req.body;

//     const usuarioExistente = await usersModel.findOne({email})
//     if (usuarioExistente) {
//         return res.status(400).send({status:'error', message: 'Usuario ya registrado'})
//     }
//     const user ={
//         first_name,
//         last_name,
//         email,
//         age,
//         password: createHash(password)
//     }

//     const result = await usersModel.create(user);
//     res.send({status:'success', message: 'Usuario creado con exito'})
// });

// router.post('/login', async (req, res)=>{
//     const {email, password} = req.body;
//     const user = await usersModel.findOne({email, password});

//     if(!user){
//         return res.status(400).send({status: 'error', message: 'Usuario No encontrado'})
//     }else if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
//         req.session.user ={
//             first_name: `${user.first_name} ${user.last_name} `,
//             email: user.email,
//             age: user.age,
//         }
//         req.session.admin = true
//     }

    //validacion con bcrypt
//     if(!isValidPassword(user, password)){
//         return res.status(401).send({status: 'error', message: 'Password incorrecta'})
//     }

//     req.session.user ={
//         first_name: `${user.first_name} ${user.last_name} `,
//         email: user.email,
//         age: user.age,
//         rol: user
//     }

//     res.send({status: 'success', message: 'Ingresaste correctamente'});


//     function logOut(){
//         req.session.destroy(error =>{
//             if (error){
//                 res.json({ error: "error de salida", message: "No se ha podido cerrar la sesion"})
//             }
//             res.send('Sesion cerrada correctamente')
//         })
//     }
// });




export default router;