import {Router} from 'express';
const router=Router()
import multer from 'multer'
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import{getContactos, postContacto, updateContacts} from '../controllers/contactos.controllers.js'

//midlewares para esta ruta
///Multer para subir foto de perfil
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../contactsImg'),
    filename: (req, file, cb)=>{
        let nameFile =uuidv4() +path.extname(file.originalname.toLocaleLowerCase())
      cb(null, nameFile )
    }
  });
  
  const profileImg2=multer({
    storage:storage,
    dest: path.join(__dirname, 'contactsImg'),
    limits: { fileSize: 5000000},
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


  //multer para editar una foto de contacto
  const storageEdit = multer.diskStorage({
    destination: path.join(__dirname, '../contactsImg'),
    filename: (req, file, cb)=>{
        let nameFile =file.originalname
        console.log("FILE==>",file.originalname)
      cb(null, nameFile )
    }
  });
  const profileImgEdit=multer({
    storage:storageEdit,
    dest: path.join(__dirname, 'contactsImg'),
    limits: { fileSize: 5000000},
    fileFilter: (req, file, cb)=>{
      const filetypes= /jpeg|jpg|png/;
      const mimetype= filetypes.test(file.mimetype)
      const extname= filetypes.test(path.extname(file.originalname))
      if(mimetype && extname){
        console.log("REC1==>",req.file)
        return cb(null, true)
      }
      cb("Error: el archivo debe ser una imagen válida")
    }
  }).single('foto');
  

router.get('/contactos', getContactos)
router.post('/contactos',profileImg2, postContacto)
router.put('/contactos', profileImgEdit, updateContacts)


export default router