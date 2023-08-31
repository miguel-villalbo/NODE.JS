import express from "express";
import { conectar } from "../modelo/db_conectar.js"; 

var crud_estudiantes = {};

crud_estudiantes.leer = (req, res) => {
    conectar.query('select * from estudiantes', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error de base de datos');
        } else {
            res.render('estudiantes/index', { resultado: results });
        }
    });
};

crud_estudiantes.eliminar = (req, res) => {
    const id_estudiantes = req.params.id_estudiantes;
    
    conectar.query('DELETE FROM estudiantes WHERE id_estudiantes = ?', [id_estudiantes], (error, results) => {
       if (error) {
           console.log(error);
           res.status(500).send('Error de base de datos');
       } else {
           res.redirect('/');
       }
    });
};


crud_estudiantes.cud = (req, res) => {
    const btn_crear = req.body.btn_crear;
    const btn_leer = req.body.btn_leer;
    const btn_actualizar = req.body.btn_actualizar;
    const btn_borrar = req.body.btn_borrar;
    const id_estudiantes = req.body.txt_id_estudiantes;
    const carnet = req.body.txt_carnet;
    const nombres = req.body.txt_nombres;
    const apellidos = req.body.txt_apellidos;
    const dirección = req.body.txt_dirección;
    const telefono = req.body.txt_telefono;
    const correo_electronico = req.body.txt_correo_electronico;
    const tipo_de_sangre = req.body.txt_tipo_de_sangre;
    const fecha_nacimiento = req.body.txt_fecha_nacimiento;
    if (btn_crear){
        conectar.query('insert into estudiantes set ?', {carnet:carnet,nombres:nombres,apellidos:apellidos,dirección:dirección,telefono:telefono,correo_electronico:correo_electronico,tipo_de_sangre:tipo_de_sangre,fecha_nacimiento:fecha_nacimiento},(error,results)=>{
            if (error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });
    }
    if (btn_leer) {
        conectar.query('SELECT * FROM estudiantes', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.render('estudiantes/index', { resultado: results });
            }
        });
    }    
    if (btn_actualizar){
        conectar.query('update estudiantes set ? where id_estudiantes = ?',[{carnet:carnet,nombres:nombres,apellidos:apellidos,dirección:dirección,telefono:telefono,correo_electronico:correo_electronico,tipo_de_sangre:tipo_de_sangre,fecha_nacimiento:fecha_nacimiento},id_estudiantes],(error,results)=>{
            if (error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });
    }
    if (btn_borrar){
        conectar.query('delete from estudiantes where id_estudiantes = ?',[id_estudiantes],(error,results)=>{
            if (error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });
    }
};
export default crud_estudiantes;
