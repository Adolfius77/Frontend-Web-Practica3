Preguntas de reflexión:

1. ¿Hizo falta una base de datos real para probar la regla de negocio? ¿Qué dice eso sobre para qué sirve el patrón Repository?
   no hizo falta una base de datos para probar el negocio ya que usamos una en memoria para las pruebas , aqui demuestra uno de los propositos del patron repository  que es abstraer por completo la persistencia de la informacion al separar la logica de negocio con la de infra se pueden probar las
   reglas de las entidades de forma aislada sin depender de ninguna base de datos externa
   
2. El Service recibe el repositorio como Repository<Prestamo>, no InMemoryPrestamoRepository. ¿Qué se rompía si usaban la clase concreta?
   rompería uno de los principios solid  que es la D de inversión de dependencias que lo que dice es que los módulos de alto nivel que en este caso seria el servicio que este no debe de depender de módulos de bajo nivel que en mi caso seria la implementación en la memoria si no que deberia depender de abstracciones,
   al depender de una clase en concreta crearía un fuerte acoplamiento 
  
   
4. Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían? ¿Por qué tan pocos?
  pues solo tendriamos que hacer dos cosas primero crear una clase concreta para interactuar con la base de datos que puede ser mongo, mysql , etc , la cual debe implementar la interfaz original que es prestamo.repository.ts
  segundo solo tendríamos que cambiar la instancia en el main.ts y inyectar el nuevo servicio

  Y por que son tan pocos cambios se preguntaría eso es gracias a la interfaz, el service y las entidades ignoran los detalles técnicos de la bd, ya el resto de la app o sistema no se va a enterar cuando se cambie de bd
