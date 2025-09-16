import { Router } from 'express';

import { Curso } from '../models/curso.js';
import { readJsonFile, writeJsonFile } from '../utils/jsonUtils.js';

let idCounter = 1;

const router = Router();

router.get('/', (req, res) => {
  const cursos = readJsonFile();
  res.status(200).json(cursos);
});

router.get('/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Bad Request: id is required' });
  }

  const cursos = readJsonFile();
  const curso = cursos.find((c: Curso) => c.id === parseInt(req.params.id));
  if (curso) {
    res.status(200).json(curso);
  } else {
    res.status(404).json({ message: 'Curso not found' });
  }
});

router.put('/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Bad Request: id is required' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: 'Bad Request: Body is missing or empty' });
  }

  if (!req.body.sigla || !req.body.nombre || !req.body.creditos) {
    return res.status(400).json({
      message: 'Bad Request: sigla, nombre and creditos are required',
    });
  }

  const cursos = readJsonFile();
  const curso = cursos.find((c) => c.id === Number(req.params.id));
  if (!curso) return res.status(404).json({ message: 'Curso not found' });

  const { creditos, nombre, sigla } = req.body;

  if (sigla) curso.sigla = sigla.trim().toUpperCase();
  if (nombre) curso.nombre = nombre.trim();
  if (creditos !== undefined) curso.creditos = Number(creditos);

  writeJsonFile(cursos);
  res.status(200).json(curso);
});

router.post('/', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: 'Bad Request: Body is missing or empty' });
  }

  if (!req.body.sigla || !req.body.nombre || !req.body.creditos) {
    return res.status(400).json({
      message: 'Bad Request: sigla, nombre and creditos are required',
    });
  }

  const cursos: Curso[] = readJsonFile();
  const nuevoCurso: Curso = req.body;

  const curso: Curso = {} as Curso;
  curso.sigla = nuevoCurso.sigla;
  curso.id = idCounter++;
  curso.nombre = nuevoCurso.nombre;
  curso.creditos = nuevoCurso.creditos;

  cursos.push(curso);
  writeJsonFile(cursos);

  res.status(201).json(curso);
});

router.delete('/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Bad Request: id is required' });
  }

  const cursos: Curso[] = readJsonFile();
  const cursoIndex = cursos.findIndex(
    (c: Curso) => c.id === parseInt(req.params.id),
  );
  if (cursoIndex === -1)
    return res.status(404).json({ message: 'Curso not found' });

  cursos.splice(cursoIndex, 1);
  writeJsonFile(cursos);
  res.status(204).json({ message: 'Curso deleted' });
});

export default router;
