import {Request, Response} from 'express';

import pool from '../database';

class PreguntaController{
    
    //DEVOLVER TODOS LAS PREGUNTAS
    public async list (req: Request,res: Response): Promise<any>{
        const pregunta = await pool.query('SELECT * FROM Pregunta WHERE estado = 1');
        if(pregunta.length > 0){
            return res.json(pregunta);
        }
        res.status(404).json({text: 'La pregunta no existe'});
    }
    //CREAR UN NUEVA PREGUNTA
    public async create(req: Request,res: Response): Promise<void>{
        console.log(req.body);  
        await pool.query('INSERT INTO Pregunta set ?',[req.body]);
        res.json('Pregunta creada')
    }
    //DEVOLVER SOLO UNA PREGUNTA
    public async getOne (req: Request,res: Response): Promise<any>{
        const {id}= req.params;
        const pregunta = await pool.query ('SELECT * FROM Pregunta WHERE id_pregunta = ? and estado = 1',[id]);
        if(pregunta.length > 0){
            return res.json(pregunta[0]);
        }
        res.status(404).json({text: 'La pregunta no existe'});
            
    }

}

const preguntaController = new PreguntaController();
export default preguntaController;


/*,
    "build": "tsc -w",
    "dev": "nodemon build/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"*/