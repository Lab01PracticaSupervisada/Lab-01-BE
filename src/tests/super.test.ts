// import supertest from 'supertest';
import request from 'supertest';

import app from '../index.js';
import { cleanData } from '../utils/jsonUtils.js';

describe('GET /health', () => {
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
});
