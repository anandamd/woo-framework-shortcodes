(function ($) {
    $(document).ready(function () {
        /* Remove the 'style' attribute from all '.chosen-container' select fields, to give more control over their widths. We need to specify the width to prevent hidden 'Chosen' fields from having a 0 width. */
        $( '.wf-field .chosen-container' ).removeAttr( 'style' );

        $( '.wf-field-typography .woo-typography-unit' ).on( 'change', function () {
            var $el, classes_string, classes, selected_unit;

            $el = $( this ).parent( '.unit-container' ); // The wrapping 'span' tag.

            /* Detect all the classes and remove any that aren't "unit-container". */
            classes_string = $el.attr( 'class' );
            if ( undefined !== classes_string ) {
                classes = classes_string.split( ' ' );
                $( classes ).each( function ( i ) {
                    if ( 'unit-container' !== classes[i] ) {
                        $el.removeClass( classes[i] );
                    }
                });
            }

            /* Apply a new class with the selected value. */
            selected_unit = $( this ).find( 'option:selected' ).val();

            if ( undefined !== selected_unit ) {
                $el.addClass( 'unit-' + selected_unit );
            }
        });
    });
}(jQuery));