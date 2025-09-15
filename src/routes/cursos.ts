import { randomInt } from "crypto";
import { Router } from "express";
import { readJsonFile,writeJsonFile  } from "#utils/jsonUtils.js";
import { Curso } from "#models/curso.js";


let idCounter = 1;
const router = Router();


router.get('/', (req, res) => {
    const cursos = readJsonFile();
    res.json(cursos);
});

router.get('/:id', (req, res) => {
    const cursos = readJsonFile();
    const curso = cursos.find((c: Curso) => c.id === parseInt(req.params.id));
    if (curso) {
        res.json(curso);
    } else {
        res.status(404).json({ message: 'Curso not found' });
    }
});

router.post('/', (req, res) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Bad Request: Body is missing or empty' });
    }
    const nuevoCurso: Curso = req.body;
    const curso : Curso = {} as Curso
    curso["sigla"] = nuevoCurso.sigla
    curso["id"] = idCounter++
    curso["nombre"] = nuevoCurso.nombre
    curso["creditos"] = nuevoCurso.creditos
    writeJsonFile(curso);
    res.status(201).json(curso);
});

export default router;