//  Un DTO (Data Transfer Object) es el CONTRATO con el exterior:
//  describe exactamente que puede mandar quien nos llama.
//
//  Lo que el cliente NO debe poder mandar:
//    - folio           -> lo genera el sistema
//    - creadoEn        -> lo pone el sistema
//    - estado          -> siempre nace en 'activo'
//    - costoReposicion -> es un dato interno de la biblioteca

import type { Prestamo } from '../dominio/prestamo.entity.js';

export type CrearPrestamoDto = Omit<
  Prestamo,
  'folio' | 'creadoEn' | 'estado' | 'costoReposicion'
>;
