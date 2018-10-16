var expect = chai.expect;
describe('Probar si al reservar un horario se elimina de los horarios disponibles del array', function () {
	var resto;
	before(function () {
		resto = listadoDeRestaurantes[0]	
	})
	it('Reservar el primer horario del array', function () {
		var horariosOriginales = resto.horarios;
		var reservado = resto.reservarHorario(resto.horarios[0]);
		var arrayFiltrado = horariosOriginales.filter(function(elem, index, self){ 
			return index === self.indexOf(elem);
		})
		expect(resto.horarios).to.eql(arrayFiltrado)
	});
	it('Reservar el segundo horario del array', function () {
		var horariosOriginales = resto.horarios;
		var reservado = resto.reservarHorario(resto.horarios[1]);
		var arrayFiltrado = horariosOriginales.filter(function(elem, index, self){ 
			return index === self.indexOf(elem);
		})
		expect(resto.horarios).to.eql(arrayFiltrado)
	});
	it('Reservar el tercer horario del array', function () {
		var horariosOriginales = resto.horarios;
		var reservado = resto.reservarHorario(resto.horarios[2]);
		var arrayFiltrado = horariosOriginales.filter(function(elem, index, self){ 
			return index === self.indexOf(elem);
		})
		expect(resto.horarios).to.eql(arrayFiltrado)
	});
	it('Reservar horario que no posee el restaurant', function () {
		var horariosOriginales = resto.horarios;
		var reservado = resto.reservarHorario("23:00");
		var arrayFiltrado = horariosOriginales.filter(function(elem, index, self){ 
			return index === self.indexOf(elem);
		})
		expect(resto.horarios).to.eql(arrayFiltrado)
	});
	it('Reservar horario sin pasar parametro a la funcion', function () {
		var horariosOriginales = resto.horarios;
		var reservado = resto.reservarHorario();
		var arrayFiltrado = horariosOriginales.filter(function(elem, index, self){ 
			return index === self.indexOf(elem);
		})
		expect(resto.horarios).to.eql(arrayFiltrado)
	});
})

describe('Probar el promedio de las calificaciones del restaurant', function () {
	var resto
	before(function () {
		resto = listadoDeRestaurantes[1]	
	})
	it('Calculo del promedio de 4 calificaciones', function () {
		var calificaciones = resto.calificaciones
		var promedio = resto.obtenerPuntuacion()
		expect(calificaciones.length).to.not.equal(0)
		expect(promedio).to.equal(6.6)
	});
	it('Calculo del promedio si no hay calificaciones', function () {
		resto.calificaciones = []
		var calificaciones = resto.calificaciones
		var promedio = resto.obtenerPuntuacion()
		expect(calificaciones.length).to.equal(0)
		expect(promedio).to.equal(0)
	})
})

describe('Probar que se haya incorporado una nueva calificacion', function () {
	var resto, calificaciones, cantidadCalificacionesPre
	before(function () {
		resto = listadoDeRestaurantes[2]	
		calificaciones = resto.calificaciones
		cantidadCalificacionesPre = calificaciones.length
	});
	it('Calculo si la calificacion es un numero', function () {		
		var calificacion = 5
		resto.calificar(calificacion)
		var cantidadCalificacionesPost = calificaciones.length
		expect(calificacion).to.be.a('number')
	});
	it('Calculo si la calificacion no es un numero', function () {		
		var calificacion = 'hola'
		resto.calificar(calificacion)
		var cantidadCalificacionesPost = calificaciones.length
		expect(calificacion).to.not.be.a('number')
	});
	it('Calculo si la calificacion es mayor a 0', function () {
		cantidadCalificacionesPre = calificaciones.length //vuelvo a contar porque el test anterior agregó un elemento más
		var calificacion = 5
		resto.calificar(calificacion)
		var cantidadCalificacionesPost = calificaciones.length
		expect(cantidadCalificacionesPost).to.equal(cantidadCalificacionesPre + 1)
	});
	it('Calculo si la calificacion es igual a 0', function () {
		cantidadCalificacionesPre = calificaciones.length //vuelvo a contar porque el test anterior agregó un elemento más
		var calificacion = 0
		resto.calificar(calificacion)
		var cantidadCalificacionesPost = calificaciones.length
		expect(cantidadCalificacionesPost).to.equal(cantidadCalificacionesPre)
	});
	it('Calculo si la calificacion es mayor a 10', function () {
		cantidadCalificacionesPre = calificaciones.length //vuelvo a contar porque el test anterior agregó un elemento más
		var calificacion = 12
		resto.calificar(calificacion)
		var cantidadCalificacionesPost = calificaciones.length
		expect(cantidadCalificacionesPost).to.equal(cantidadCalificacionesPre)
	})
})

describe('Probar que se encuentre un restaurante por id', function () {
	var restaurant;
	before(function () {
		restaurant = listadoDeRestaurantes[1];
	});
	it('Probar que el id sea un numero', function () {
		var id = restaurant.id;
		expect(id).to.be.an('number');
	});
	it('Probar que devuelva el restaurant correspondiente a un id', function () {
		var id = restaurant.id;
		expect(id).to.be.equal(2);
	})
})

describe('Probar la funcion obtener restaurantes', function () {
	var ciudades, rubros, horarios
	before(function () {
		ciudades = listado.obtenerUbicaciones();
		rubros = listado.obtenerRubros();
		horarios = listado.obtenerHorarios();
	});
	it('Verifico que no se elija una ciudad diferente de las opciones disponibles', function () {
		var ciudadInexistente = 'Bariloche'
		expect(ciudades).to.be.an('array').that.does.not.include(ciudadInexistente);
	});
	it('Verifico que no se elija un rubro diferente de las opciones disponibles', function () {
		var ciudadInexistente = 'Brasilera'
		expect(ciudades).to.be.an('array').that.does.not.include(ciudadInexistente);
	});
	it('Verifico que no se elija un horario diferente de las opciones disponibles', function () {
		var ciudadInexistente = '08:00'
		expect(ciudades).to.be.an('array').that.does.not.include(ciudadInexistente);
	});
})

describe('Validar reservas', function () {
	var reserva1
	before(function () {
		reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, 'DES1')
	});
	it('Verifico el precio base de la reserva', function () {
		var precioBase = reserva1.calcularPrecioBase();
		expect(precioBase).to.be.equal(2800);
	});
	it('Verifico el precio final de la reserva', function () {
		var precioFinal = reserva1.calcularPrecioFinal();
		expect(precioFinal).to.be.equal(2170);
	})
})