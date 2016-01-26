( function() {
	// TinyMCE plugin start.
    tinymce.PluginManager.add( 'WooThemesShortcodes', function( editor, url ) {
		// Register a command to open the dialog.
		editor.addCommand( 'woo_open_dialog', function( ui, v ) {
			wooSelectedShortcodeType = v;
			selectedText = editor.selection.getContent({format: 'text'});
            wooDialogHelper.setupShortcodeType( v );
			wooDialogHelper.loadShortcodeDetails();

			jQuery( '#woo-options' ).addClass( 'shortcode-' + v );

			var f=jQuery(window).width();
			b=jQuery(window).height();
			f=720<f?720:f;
			f-=80;
			b-=84;

			tb_show( "Insert WooThemes ["+ v +"] Shortcode", "#TB_inline?width="+f+"&height="+b+"&inlineId=woo-dialog" );jQuery( "#woo-options h3:first").text( "Customize the ["+v+"] Shortcode" );
		});

		// Register a command to insert the shortcode immediately.
		editor.addCommand( 'woo_insert_immediate', function( ui, v ) {
			var selected = editor.selection.getContent({format: 'text'});

			// If we have selected text, close the shortcode.
			if ( '' != selected ) {
				selected += '[/' + v + ']';
			}

			editor.insertContent( '[' + v + ']' + selected );
		});

        // Add a button that opens a window
        editor.addButton( 'woothemes_shortcodes_button', {
			type: 'menubutton',
			text: 'Shortcodes',
			icon: 'wf-shortcode-icon',
			classes: 'btn wf-shortcode-button',
			tooltip: 'Insert a WooThemes Shortcode',
			menu: [
                {text: 'Button', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'button', { title: 'Button' } ); } },
                {text: 'Icon Link', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'ilink', { title: 'Icon Link' } ); } },
                {text: 'Info Box', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'box', { title: 'Info Box' } ); } },
               	// Typography menu.
                {text: 'Typography', menu: [
                	{text: 'Dropcap', onclick: function() { editor.execCommand( 'woo_insert_immediate', false, 'dropcap', { title: 'Dropcap' } ); } },
                	{text: 'Quote', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'quote', { title: 'Quote' } ); } },
                	{text: 'Highlight', onclick: function() { editor.execCommand( 'woo_insert_immediate', false, 'highlight', { title: 'Highlight' } ); } },
                	{text: 'Abbreviation', onclick: function() { editor.execCommand( 'woo_insert_immediate', false, 'abbr', { title: 'Abbreviation' } ); } },
                	{text: 'Custom Typography', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'typography', { title: 'Custom Typography' } ); } }
                ]},
                {text: 'Content Toggle', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'toggle', { title: 'Content Toggle' } ); } },
                {text: 'Related Posts', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'related', { title: 'Related Posts' } ); } },
                {text: 'Contact Form', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'contactform', { title: 'Contact Form' } ); } },
                {text: 'Column Layout', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'column', { title: 'Column Layout' } ); } },
                {text: 'Tab Layout', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'tab', { title: 'Tab Layout' } ); } },
                // List Generator menu.
                {text: 'List Generator', menu: [
                	{text: 'Unordered List', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'unordered_list', { title: 'Unordered List' } ); } },
                	{text: 'Ordered List', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'ordered_list', { title: 'Ordered List' } ); } }
                ]},
                // Dividers menu.
                {text: 'Dividers', menu: [
                	{text: 'Horizontal Rule', onclick: function() { editor.execCommand( 'woo_insert_immediate', false, 'hr', { title: 'Horizontal Rule' } ); } },
                	{text: 'Divider', onclick: function() { editor.execCommand( 'woo_insert_immediate', false, 'divider', { title: 'Divider' } ); } },
                	{text: 'Flat Divider', onclick: function() { editor.execCommand( 'woo_insert_immediate', false, 'divider_flat', { title: 'Flat Divider' } ); } }
                ]},
                // Social Buttons menu.
                {text: 'Social Buttons', menu: [
                	{text: 'Social Profile Icon', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'social_icon', { title: 'Social Profile Icon' } ); } },
                	{text: 'Twitter', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'twitter', { title: 'Twitter' } ); } },
                	{text: 'Twitter Follow Button', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'twitter_follow', { title: 'Twitter Follow Button' } ); } },
                	{text: 'Tweetmeme', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'tweetmeme', { title: 'Tweetmeme' } ); } },
                	{text: 'Digg', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'digg', { title: 'Digg' } ); } },
                	{text: 'Like on Facebook', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'fblike', { title: 'Like on Facebook' } ); } },
                	{text: 'Share on Facebook', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'fbshare', { title: 'Share on Facebook' } ); } },
                	{text: 'Share on LinkedIn', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'linkedin_share', { title: 'Share on LinkedIn' } ); } },
                	{text: 'Google +1 Button', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'google_plusone', { title: 'Google +1 Button' } ); } },
                	{text: 'Stumbleupon Badge', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'stumbleupon', { title: 'Stumbleupon Badge' } ); } },
                	{text: 'Pinterest "Pin It" Button', onclick: function() { editor.execCommand( 'woo_open_dialog', false, 'pinterest', { title: 'Pinterest "Pin It" Button' } ); } }
                ]},
            ]
        });
    } ); // TinyMCE plugin end.
} )();