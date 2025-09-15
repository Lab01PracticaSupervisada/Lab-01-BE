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

router.put("/:id", (req, res) => {
  const cursos = readJsonFile();
  const curso = cursos.find(c => c.id === Number(req.params.id));
  if (!curso) return res.status(404).json({ message: "Curso no encontrado" });

  const { sigla, nombre, creditos } = req.body;

  if (sigla) curso.sigla = sigla.trim().toUpperCase();
  if (nombre) curso.nombre = nombre.trim();
  if (creditos !== undefined) curso.creditos = Number(creditos);

  writeJsonFile(cursos);
  res.json(curso);
});

router.post('/', (req, res) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Bad Request: Body is missing or empty' });
    }
    const cursos: Curso[] = readJsonFile();
    const nuevoCurso: Curso = req.body;

    const curso : Curso = {} as Curso
    curso["sigla"] = nuevoCurso.sigla
    curso["id"] = idCounter++
    curso["nombre"] = nuevoCurso.nombre
    curso["creditos"] = nuevoCurso.creditos

    cursos.push(curso);
    writeJsonFile(cursos);

    res.status(201).json(curso);
});


router.delete('/:id', (req, res) => {
    const cursos: Curso[] = readJsonFile();
    const cursoIndex = cursos.findIndex((c: Curso) => c.id === parseInt(req.params.id));
  if (cursoIndex === -1) return res.status(404).json({ message: "Curso no encontrado" });

  cursos.splice(cursoIndex, 1);
  writeJsonFile(cursos);
  res.status(204).json({ message: 'Curso eliminado' });

});

export default router;