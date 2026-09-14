import { test } from 'node:test';
import assert from 'node:assert/strict';

import { PrestamoService } from './prestamo.service.js';
import type { PrestamoRepository } from '../dominio/prestamo.repository.js';
import type { Prestamo } from '../dominio/prestamo.entity.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

//  Repositorio falso para las pruebas: el Service solo conoce la interfaz,
//  asi que cualquier objeto que la cumpla sirve.
function repoFalso(): PrestamoRepository {
  const datos = new Map<string, Prestamo>();
  return {
    async findById(folio) { return datos.get(folio) ?? null; },
    async findAll() { return [...datos.values()]; },
    async save(p) { datos.set(p.folio, p); return p; },
    async delete(folio) { datos.delete(folio); },
    async findByLibro(libroId) {
      return [...datos.values()].filter((p) => p.libroId === libroId);
    },
  };
}

test('camino feliz: crea un prestamo activo con folio', async () => {
  const repo = repoFalso();
  const servicio = new PrestamoService(repo);

  const p = await servicio.crear({
    libroId: 'LIB-0417',
    socioId: 'S-001',
    ejemplares: [14, 15],
  });

  assert.match(p.folio, /^P-\d+$/);
  assert.equal(p.estado, 'activo');
  assert.deepEqual(p.ejemplares, [14, 15]);
  assert.equal((await repo.findByLibro('LIB-0417')).length, 1);
});

test('ejemplar duplicado: lanza EjemplarPrestadoError', async () => {
  const repo = repoFalso();
  const servicio = new PrestamoService(repo);

  await servicio.crear({ libroId: 'LIB-0417', socioId: 'S-001', ejemplares: [14, 15] });

  await assert.rejects(
    servicio.crear({ libroId: 'LIB-0417', socioId: 'S-002', ejemplares: [15, 16] }),
    (e: unknown) => e instanceof EjemplarPrestadoError && e.ejemplar === 15,
  );
  assert.equal((await repo.findByLibro('LIB-0417')).length, 1);
});
