import { describe, it, expect } from 'vitest';
import {
  estaAprobado,
  calcularPromedio,
  validarEstudiante,
  calcularResumen
} from './reglas-notas';

describe('estaAprobado', () => {
  it('aprueba una nota por encima del minimo', () => {
    expect(estaAprobado(4.5)).toBe(true);
  });
  it('reprueba una nota por debajo del minimo', () => {
    expect(estaAprobado(2.8)).toBe(false);
  });
  it('aprueba la nota exacta de 3.0', () => { // caso limite
    expect(estaAprobado(3.0)).toBe(true);
  });
});

describe('calcularPromedio', () => {
  it('calcula el promedio de varias notas', () => {
    expect(calcularPromedio([4.5, 3.5, 2.5, 4.0])).toBe(3.625);
  });
  it('devuelve la misma nota si solo hay una', () => {
    expect(calcularPromedio([4.0])).toBe(4.0);
  });
  it('devuelve 0 con una lista vacia', () => { // caso limite
    expect(calcularPromedio([])).toBe(0);
  });
});

describe('validarEstudiante', () => {
  it('acepta datos correctos', () => {
    expect(validarEstudiante({ nombre: 'Ana', nota: 4 }).valido).toBe(true);
  });
  it('rechaza si falta el nombre', () => {
    expect(validarEstudiante({ nota: 4 }).valido).toBe(false);
  });
  it('rechaza una nota negativa', () => {
    expect(validarEstudiante({ nombre: 'Ana', nota: -1 }).valido).toBe(false);
  });
  it('rechaza una nota mayor a 5', () => {
    expect(validarEstudiante({ nombre: 'Ana', nota: 5.1 }).valido).toBe(false);
  });
  it('acepta las notas frontera 0 y 5', () => { // caso limite
    expect(validarEstudiante({ nombre: 'Ana', nota: 0 }).valido).toBe(true);
    expect(validarEstudiante({ nombre: 'Ana', nota: 5 }).valido).toBe(true);
  });
  it('rechaza una nota que no es numero', () => {
    expect(validarEstudiante({ nombre: 'Ana', nota: 'abc' }).valido).toBe(false);
  });
});

describe('calcularResumen', () => {
  it('cuenta aprobados y total', () => {
    const r = calcularResumen([{ nota: 4.5 }, { nota: 2.8 }, { nota: 3.0 }]);
    expect(r.aprobados).toBe(2);
    expect(r.total).toBe(3);
  });
});
