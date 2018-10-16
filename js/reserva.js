var Reserva = function (horario, cantidadPersonas, precioPorPersona, codigoDescuento) {
	this.horario = horario,
	this.cantidadPersonas = cantidadPersonas,
	this.precioPorPersona = precioPorPersona,
	this.codigoDescuento = codigoDescuento
}

Reserva.prototype.calcularPrecioBase = function () {
	if(Number.isInteger(this.cantidadPersonas) && Number.isInteger(this.precioPorPersona)) {
		return this.cantidadPersonas * this.precioPorPersona;		
	} else {
		return 0;
	}
}

Reserva.prototype.calcularPrecioFinal = function () {
	var adicionales = 0, descuentos = 0
	var precioBase = this.calcularPrecioBase();
	adicionales = calcularAdicionales(this.horario.getHours());
	descuentos = calcularDescuentoPorCantidadPersonas(precioBase, this.cantidadPersonas) + calcularDescuentoPorCodigo(precioBase, this.precioPorPersona, this.codigoDescuento)
	return precioBase + adicionales - descuentos;
}


function esHoraMuyConcurrida (horario) {
	if((horario>=13 && horario<=14) || (horario>=20 && horario<=21)) {
		return true
	} else {
		return false
	}
}

function calcularAdicionales (horario) {
	var adicionales;
	if(esHoraMuyConcurrida(horario)) {
		adicionales = parseFloat(precioBase) * 0.05;
	} else {
		adicionales = 0
	}
	return adicionales;
}

function calcularDescuentoPorCantidadPersonas (precioBase, cantidadPersonas) {
	console.log(precioBase, cantidadPersonas)
	var descuento;
	if(cantidadPersonas>=4 && cantidadPersonas<=6) {
		descuento = parseFloat(precioBase) * 0.05;
	} else if(cantidadPersonas>6 && cantidadPersonas<=8) {
		descuento = parseFloat(precioBase) * 0.1;
	} else if(cantidadPersonas>8) {
		descuento = parseFloat(precioBase) * 0.15;
	} else {
		descuento = 0;
	}
	return descuento;
}

function calcularDescuentoPorCodigo (precioBase, precioPorPersona, codigoDescuento) {
	console.log(precioBase, precioPorPersona, codigoDescuento)
	var descuento;
	switch(codigoDescuento) {
		case 'DES15': descuento = parseFloat(precioBase) * 0.15; break;
		case 'DES200': descuento = 200; break;
		case 'DES1': descuento = precioPorPersona; break;
		default: descuento = 0;
	}
	return descuento;
}
