import { Contacto } from "../models/Contacto.js";
import {Task} from '../models/Task.js'
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import sharp from "sharp";
import { dolar} from'../helpers/apidolar.js'
const axios= require('axios');


export const getContactos=async(req, res)=>{
  try {
    let ruta = __dirname.replace("controllers", "contact");
    const allContacts= await Contacto.findAll({ where: { userId: req.session.userId } })
    const indicadores= await axios.get('https://mindicador.cl/api')
    const respuesta= await indicadores.data
   
    if(allContacts.length > 0){
      res.render('contactos',{
        contacts: allContacts,
        indicadores: respuesta,
        user: req.session.name,
        mode: req.session.config.modo
      })
    
    }else{
      console.log('Sin contactos que mostrar')
      res.render('contactos',{
        user: req.session.name,
        mode: req.session.config.modo
      })
    };
  }catch (error) {
    console.log('Ocurrió un error: ', error)
    res.render('contactos',{
      user: req.session.name,
      mode: req.session.config.modo
    })
  };
};

export const postContacto=async(req, res)=>{
    let errors = [];
    const nombre =req.body.name_new_contact;
    const apellido =req.body.last_name_new_contact;
    const email=req.body.email_new_contact;
    const telefono=req.body.phone_new_contact;
    const config={
        empleo: req.body.job_new_contact
    };
    const nota=req.body.note_new_contact;
    const { filename } = req.file;

    const contac={
        id: uuidv4(),
        nombre,
        apellido,
        email,
        telefono,
        nota,
        config,
        userId: req.session.userId,
        foto: `contac-${filename.replace(path.extname(filename),'.png')}`,

    };

    let ruta = __dirname.replace("controllers", "public");

    let ruta2=path.join(ruta, 'img');
    let ruta3=path.join(ruta2, 'contacts')

    sharp(req.file.path)
        .resize(100)
        .toFormat('png', {palette: true})
        .toFile(ruta3 + `/contac-${filename.replace(path.extname(filename),'.png')}`)
        .then(async (data) => {
          const newContac = await Contacto.create(contac);
            // console.log('newContac==>', newContac)
          const allContacts= await Contacto.findAll({ where: { userId: req.session.userId } })
          
          req.flash("success_msg", "Nuevo contacto guardado con exito");
          res.render("contactos", {
            contacts: allContacts,
            user: req.session.name,
            mode: req.session.config.modo
          });
        })
        .catch((err) => {      
            console.log('Ocurrió un error',err);
            res.render("contactos")
        });

   
};

export const updateContacts=async (req, res) => {
  const id= req.body.id_contactEdit
  const nombre =req.body.name_edit_contact;
  const apellido =req.body.last_name_edit_contact;
  const email=req.body.email_edit_contact;
  const telefono=req.body.phone_edit_contact;
  const config={
      empleo: req.body.job_edit_contact
  };
  const nota=req.body.note_edit_contact;
  const { filename } = req.file;

  console.log("req.file==>", req.file)
  const contac={
    id: id,
    nombre,
    apellido,
    email,
    telefono,
    nota,
    config,
    userId: req.session.userId,
    foto: `contac-${filename.replace(path.extname(filename),'.png')}`,

  };
  console.log(contac)
  res.end()

}