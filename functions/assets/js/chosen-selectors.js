(function ($) {
	$(document).ready(function () {
		var $el, classes_string, classes;
		$( '.wf-field select' ).chosen({ disable_search_threshold: 8, width: '75px' });
		/* Play the classes from the select element on top of the corresponding "chosen-container". */
		$( '.wf-field select' ).each( function () {
			$el = $( this );
			classes_string = $( this ).attr( 'class' );
			if ( undefined !== classes_string ) {
				classes = classes_string.split( ' ' );
				if ( 0 < classes.length ) {
					$( classes ).each( function ( j ) {
						$el.next( '.chosen-container' ).addClass( classes[j] );
					});
				}
			}
		});
	});
}(jQuery));