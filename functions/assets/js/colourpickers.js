(function ($) {
    $(document).ready(function () {
    	$( 'input.colour' ).each( function ( i ) {
    		$( this ).wpColorPicker({
    			change: function ( event, ui ) {
    				$( this ).val( $( this ).wpColorPicker( 'color' ) );
    			},
    			clear: function ( event, ui ) {
    				$( this ).val( '' );
    			}
    		});
    	});
    });
}(jQuery));