//  Contrato generico de persistencia, reutilizable para cualquier entidad.
//     T  -> la entidad
//     ID -> el tipo de la llave (string por defecto)

export interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entidad: T): Promise<T>;
  delete(id: ID): Promise<void>;
}
