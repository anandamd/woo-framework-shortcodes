(function($) {
	$(document).ready(function() {
		var frame, attachment, container, imagePreviewHTML, file_id_field, file_path_field, image_preview;

		/* Remove the image preview, URL and ID when we empty the URL field. */
		$( '.upload-field .input-upload' ).on( 'blur', function ( e ) {
			var $el = $( this );

			container = $el.parent( '.upload-field' );

			file_id_field = container.find( '.input-upload-id' );
			image_preview = $el.parents( '.wf-field-upload' ).find( '.image-preview' );

			if ( '' === $el.val() ) {
				file_id_field.attr( 'value', '' );
				image_preview.removeClass( 'has-image' ).addClass( 'no-image' );
				image_preview.find( 'img' ).attr( 'src', '' );
			}

			return false;
		} );

		/* Remove the image preview, URL and ID when we click the "Remove" link. */
		$( '.wf-field-upload .remove, .wf-field-upload-min .remove' ).on( 'click', function ( e ) {
			var $el = $( this );

			container = $el.parents( 'td' ).find( '.upload-field' ); // We use td instead of a CSS class to cater for both wf-field-upload and wf-field-upload-min.

			file_path_field = container.find( '.input-upload' );
			file_id_field = container.find( '.input-upload-id' );
			image_preview = $el.parents( '.wf-field-upload' ).find( '.image-preview' );

			file_path_field.attr( 'value', '' );
			file_id_field.attr( 'value', '' );
			image_preview.removeClass( 'has-image' ).addClass( 'no-image' );
			image_preview.find( 'img' ).attr( 'src', '' );

			return false;
		} );

		$( '.upload-field a.button' ).on( 'click', function( e ) {
				var $el = $( this );

				container = $el.parent( '.upload-field' );

				e.preventDefault();

				file_path_field = container.find( '.input-upload' );
				file_id_field = container.find( '.input-upload-id' );

				// If the media frame already exists, reopen it.
				if ( frame ) {
				  frame.open();
				  return;
				}

				frame = wp.media({
					title: $el.data( 'uploader-title' ),
					button: {
					  text: $el.data( 'uploader-button-text' ),
					},
					multiple: false,  // Set to true to allow multiple files to be selected
					library:   {
						type: 'image'
					}
				});

				// When an image is selected, run a callback.
				frame.on( 'select', function() {
					// We set multiple to false so only get one image from the uploader
					var attachment = frame.state().get('selection').first().toJSON();

					// Do something with attachment.id and/or attachment.url here
					$( file_path_field ).val( attachment.url );
					$( file_id_field ).val( attachment.id );

					// Small preview of the image
					image_preview =  container.parent( '.wf-field' ).find( '.image-preview' );
					image_preview.removeClass( 'no-image' ).addClass( 'has-image' ).find( 'img' ).attr( 'src', attachment.url );
				});

				// Finally, open the modal
				frame.open();
		});
	});
})(jQuery);