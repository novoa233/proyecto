import { Router } from "express";
const router = Router();
import multer from 'multer'
import path from "path";
import { v4 as uuidv4 } from 'uuid';
// import session from "express-session";
// import {encryptPassword, matchPassword} from '../helpers/encrypterpass.js'

import { renderSignUpForm, singup, renderSigninForm, signin, logout, validateUser, userLogout, saveMode} from "../controllers/users.controller";



//midlewares para esta ruta
///Multer para subir foto de perfil
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../profile_img'),
  filename: (req, file, cb)=>{
    console.log(req.file)
      let nameFile =uuidv4() +path.extname(file.originalname.toLocaleLowerCase())
    cb(null, nameFile )
  }
});

const profileImg=multer({
  storage:storage,
  dest: path.join(__dirname, 'profile_img'),
  limits: { fileSize: 3000000},
  fileFilter: (req, file, cb)=>{
    const filetypes= /jpeg|jpg|png/;
    const mimetype= filetypes.test(file.mimetype)
    const extname= filetypes.test(path.extname(file.originalname))
    if(mimetype && extname){
      console.log(req.file)
      return cb(null, true)
    }
    cb("Error: el archivo debe ser una imagen válida")
  }
}).single('foto');

router.post("/login",profileImg, singup);
router.post('/validateuser', validateUser)
router.put('/saveconfigmode', saveMode)


router.get('/logout', userLogout)

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup",profileImg, singup);


//para la ruta de prueba
const prueba=async(req, res)=>{

  console.log('aca')
  req.session.userId='fernando'
  console.log(req.session.userId)
  // res.send(`<h2>DATO: ${req.session.usuario}</h2>`)
  res.redirect('/prueba2')
  }

const prueba2=async(req, res)=>{

  res.send(`<h2>DATO: ${req.session.userId}</h2>`)
}
  //////////////////////////
router.get("/prueba", prueba);
router.get("/prueba2", prueba2);

// router.get("/users/signin", renderSigninForm);

// router.post("/users/signin", signin);

// router.get("/users/logout", logout);

export default router;
