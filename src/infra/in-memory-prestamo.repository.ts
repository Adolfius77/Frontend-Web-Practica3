//  Vive en `infra/` porque es un DETALLE DE INFRAESTRUCTURA: manana
//  puede ser PostgreSQL y nada mas arriba se enterara.

import type { PrestamoRepository } from '../dominio/prestamo.repository.js';
import type { Prestamo } from '../dominio/prestamo.entity.js';

export class InMemoryPrestamoRepository implements PrestamoRepository {
  // La llave es el folio, el valor es el prestamo completo.
  private readonly datos = new Map<string, Prestamo>();

  async findById(folio: string): Promise<Prestamo | null> {
    return this.datos.get(folio) ?? null;
  }

  async findAll(): Promise<Prestamo[]> {
    return [...this.datos.values()];
  }

  async save(prestamo: Prestamo): Promise<Prestamo> {
    this.datos.set(prestamo.folio, prestamo);
    return prestamo;
  }

  async delete(folio: string): Promise<void> {
    this.datos.delete(folio);
  }

  async findByLibro(libroId: string): Promise<Prestamo[]> {
    return [...this.datos.values()].filter((p) => p.libroId === libroId);
  }
}
