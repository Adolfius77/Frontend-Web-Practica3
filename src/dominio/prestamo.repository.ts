//  Cada entidad hereda el contrato comun y agrega SOLO sus consultas
//  propias. Eso es lo que hace `extends` sobre una interfaz generica.
// =====================================================================

import type { Repository } from './repository.js';
import type { Prestamo } from './prestamo.entity.js';

export interface PrestamoRepository extends Repository<Prestamo> {
  findByLibro(libroId: string): Promise<Prestamo[]>;
}
