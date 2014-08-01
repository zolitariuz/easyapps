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

		// /*** RESPONSIVE ***/

		$(window).resize(function(event) {
			copyHeight( $('.hero'), $('.bg-hero') );
			copyHeight( $('.hero'), $('.screen') );
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

	function activar(elemento, hermanos){
		hermanos.removeClass('active');
		elemento.addClass('active');
	}

	function callMasonry(){
		var container = $('.masonry');
		var msnry = new Masonry( container[0], {
		  itemSelector: '.opcion'
		});
	}

})(jQuery);

