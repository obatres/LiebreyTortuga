# Juego Liebre y Tortuga

Este juego es una adaptacion de la obra literia con el mismo nombre.

El juego consiste en que hay 2 jugadores, cada uno representa a uno de los personajes, liebre o tortuga.

Por medio de un tablero con casillas, estos dos jugadores tendran que tirar 2 dados al azar hasta que uno de los dos llegue a la meta y gane la partida, simulando una carrera.

Artefactos:
* 2 dados
* 1 tablero con casillas
* 2 Fichas (cada una con la representacion de uno de los personajes)

Reglas:
Para la liebre:

* Si el valor de los dados son dos números diferentes, se suman ambos dados y si el resultado de esta suma es par sera divido entre 2 y avanzara las casillas del resultado obtenido.
* Si el valor de los dados son dos números diferentes, se suman ambos dados y si el resultad de esta suma es impar, se realizara la resta de ambos números y se avanzara el valor absoluto de ese resultado.
* Si el valor de los dados son iguales, entonces:
    * Si el número en ambos dados es 6, retrocederá 6 casillas.
    * Si el numero en ambos dados es 4, retrocedera 4 casillas.
    * Si el numero en ambos dados es 2, retrocedera 2 casillas.
    * Si el numero en ambos dados es 1, retrocedera a la 1era casilla del tablero.
* * Para el resto de numeros, se avanzara la suma de las caras del dado (por ejemplo: 3 y 3, avanza 6 posiciones).


Para la tortuga:
* Si el valor de los dados es diferente, se suman y si el resultado es par se avanza esa cantidad de espacios.
* Si el valor de los dados es diferente, se suman y si el resultado es impar se retrocederá la cantidad de espacios del dado con menor valor.
* Si el valor de los dados son iguales, entonces:
    * Si el número en ambos dados es 4, 5 o 6 retrocederá el valor de uno de los dados.
    * Si el número en ambos dados es 1, 2 o 3 avanzará el valor de la suma de ambos dados.

Casillas especiales:
* **Estrella**
- Si alguno de los dos jugadores cae en una casilla estrella al terminar su turno, se le otorgara un tiro extra.

* **Arbol**
- Si alguno de los dos jugadores cae en una casilla arbol al terminar su turno, tendra que esperar un turno para realizar su siguiente tiro.

* **Hoyo**
- Si alguno de los dos jugadores cae en una casilla hoyo al terminar su turno, podra intercambiar de personaje dentro del tablero.


## Getting Started

Para ejecutar el proyecto será necesario acceder la siguiente [dirección](http://34.123.240.81:3001/). En este apartado saldrá directamente la funcionalidad del juego.
```
http://34.123.240.81:3001/
```
Esto mostrará el inicio y se podrá seleccionar una de las funcionalidades especificadas previamente. 


### Prerequisitos

Esta aplicación sera implementada utilizando JavaScript y será necesario tener instalado NodeJS para compilarlo.

### Instalación de dependencias

Para instalar todas las dependencias es necesario utilizar el siguiente comando
```
npm install
```

### Construido con

* **NodeJS** - El framework de desarrollo
* **Express** - Utilizado un servidor mediante la utilización de express para que pueda consumir la API externa
* **Javascript** - Lenguaje de desarrollo
* **Html** - Para la visualización de las opciones

# Formateo y estandarés de codigo

Al utilizarse Javascript para la implementación se selecciono el estandard de codigo [Standard JS](https://standardjs.com/)

Tambien se utilizo html con el estandard de codigo [Ckan](https://docs.ckan.org/en/2.8/contributing/html.html)

# Author

Authores del proyecto como parte del curso de Software avanzado de la Universidad de San Carlos de Guatemala.

Grupo 2