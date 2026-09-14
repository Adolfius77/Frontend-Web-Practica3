//  El Service: aqui y SOLO aqui viven las reglas de negocio.
//  Regla: "no se puede prestar un ejemplar que ya esta prestado".

import type { PrestamoRepository } from '../dominio/prestamo.repository.js';
import type { Prestamo } from '../dominio/prestamo.entity.js';
import { nuevoFolio } from '../dominio/prestamo.entity.js';
import type { CrearPrestamoDto } from '../dto/crear-prestamo.dto.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

export class PrestamoService {
  constructor(private readonly repo: PrestamoRepository) {}

  async crear(dto: CrearPrestamoDto): Promise<Prestamo> {
    const prestamos = await this.repo.findByLibro(dto.libroId);

    // Los devueltos liberan sus ejemplares
    const ejemplaresFuera = prestamos
      .filter((p) => p.estado !== 'devuelto')
      .flatMap((p) => p.ejemplares);

    const choque = dto.ejemplares.find((e) => ejemplaresFuera.includes(e));
    if (choque !== undefined) {
      throw new EjemplarPrestadoError(choque);
    }

    const nuevo: Prestamo = {
      folio: nuevoFolio(),
      creadoEn: new Date(),
      libroId: dto.libroId,
      ejemplares: [...dto.ejemplares],
      socioId: dto.socioId,
      estado: 'activo',
      costoReposicion: 0,
    };
    return this.repo.save(nuevo);
  }

  async listarPorLibro(libroId: string): Promise<Prestamo[]> {
    return this.repo.findByLibro(libroId);
  }
}
