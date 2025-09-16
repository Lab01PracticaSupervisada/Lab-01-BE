import request from 'supertest';

import app from '../src/index.js';
import { cleanData } from '../src/utils/jsonUtils.js';

describe('API Endpoints', () => {
  cleanData();

  it('health check endpoint working', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it('Create curso', async () => {
    const response = await request(app).post('/').send({
      creditos: 4,
      nombre: 'Cálculo I',
      sigla: 'MA1001',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.sigla).toBe('MA1001');
    expect(response.body.nombre).toBe('Cálculo I');
    expect(response.body.creditos).toBe(4);
  });

  it('Get all cursos', async () => {
    const response = await request(app).get('/');
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Get curso by id', async () => {
    const newCurso = await request(app).post('/').send({
      creditos: 4,
      nombre: 'Calculo 2',
      sigla: 'MA1002',
    });
    const cursoId = newCurso.body.id;
    const response = await request(app).get(`/${cursoId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(cursoId);
    expect(response.body.sigla).toBe('MA1002');
    expect(response.body.nombre).toBe('Calculo 2');
    expect(response.body.creditos).toBe(4);
  });

  it('Update curso by id', async () => {
    const newCurso = await request(app).post('/').send({
      creditos: 4,
      nombre: 'Calculo 3',
      sigla: 'MA1003',
    });
    const cursoId = newCurso.body.id;
    const response = await request(app).put(`/${cursoId}`).send({
      creditos: 5,
      nombre: 'Calculo III',
      sigla: 'MA1003',
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(cursoId);
    expect(response.body.sigla).toBe('MA1003');
    expect(response.body.nombre).toBe('Calculo III');
    expect(response.body.creditos).toBe(5);
  });

  it('Delete curso by id', async () => {
    const newCurso = await request(app).post('/').send({
      creditos: 4,
      nombre: 'Calculo 4',
      sigla: 'MA1004',
    });
    const cursoId = newCurso.body.id;
    const response = await request(app).delete(`/${cursoId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  cleanData();
});
