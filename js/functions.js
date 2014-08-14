(function($){

	"use strict";

	$(function(){

		$('#bg-hero').backstretch('images/hero.jpg');

		copyHeight( $('.hero'), $('.bg-hero') );
		copyHeight( $('.hero'), $('.screen') );

		$('body').on('click', '.modal-wrapper .cerrar' ,function(){
			cerrarModal($(this));
		});

		$('.boton[data-link="login"]').on('click' ,function(){
			abrirModal($(this));
		});

		$('body').on('click', 'button[type="submit"]' ,function(e){
			e.preventDefault();
			siguientePaso($(this));
		});

		$('body').on('click', '.pasos-container .boton' ,function(){
			activar( $(this), $('.pasos-container .boton') );
		});

		$('body').on('click', '.secciones a' ,function(e){
			e.preventDefault();
			loadConfiguracion($(this));
		});

		alturaTabla();

		// /*** RESPONSIVE ***/

		$(window).resize(function(event) {
			copyHeight( $('.hero'), $('.bg-hero') );
			copyHeight( $('.hero'), $('.screen') );
			alturaTabla();
		});


	});

	function copyHeight(source, destiny){
		var sourceHeight = source.outerHeight();
		destiny.height(sourceHeight);
	}

	function abrirModal(elemento){
		var modalClass = elemento.data('link');
		$('.modal-wrapper.'+modalClass).fadeIn('fast', function(){
			$(this).removeClass('hide');
		});
	}

	function cerrarModal(elemento){
		var aCerrar = elemento.parent().parent();
		aCerrar.fadeOut('fast', function(){
			$(this).addClass('hide');
		});
	}

	function siguientePaso(elemento){
		var pasoSiguiente = elemento.data('paso-siguiente');
		//var pasoActual = elemento.data('paso-actual');
		var stepCompleted = $(".step[data-step='step-"+pasoSiguiente+"']");
		stepCompleted.addClass('completed');
		$('.pasos-container').empty();
		$('.pasos-container').load('pasos.html .paso-'+pasoSiguiente, function(response, status, xhr ){
			if ( status == 'success' ){
				if ( $('.masonry').length > 0 ){
					callMasonry();
				}
			}
		});
	}

	function loadConfiguracion(elemento){
		var dataSeccion = elemento.data('seccion');
		var seccion = '.seccion-'+dataSeccion;
		$('.secciones li').removeClass('active');
		elemento.parent().addClass('active');
		//var seccionActiva = $(".seccion[data-seccion='"+seccion+"']");
		//stepCompleted.addClass('completed');
		$('.frame-config').empty();
		$('.frame-config').load('area-de-configuracion.html '+seccion);
	}

	function activar(elemento, hermanos){
		hermanos.removeClass('active');
		elemento.addClass('active');
	}

	function callMasonry(){
		var container = $('.masonry');
		container.imagesLoaded( function() {
			var msnry = new Masonry( container[0], {
			  itemSelector: '.opcion'
			});
		});
	}

	function alturaTabla(){
		var maxHeight;
		var outerMaxHeight;
		$('.tabla .fila').each(function(){
			var alturasSpans = $(this).children('.span').map(function() {
				return $(this).height();
			}).get();
			maxHeight = Math.max.apply(null, alturasSpans);
			$(this).children('.span').find('i').css({
				lineHeight: maxHeight+'px'
			});

			var outerAlturasSpans = $(this).children('.span').map(function() {
				return $(this).outerHeight();
			}).get();
			outerMaxHeight = Math.max.apply(null, outerAlturasSpans);


			$(this).children('.span').css({
				minHeight: outerMaxHeight
			});

			console.log(maxHeight);
		});
	}

})(jQuery);