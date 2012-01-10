(function($){
	$(function() {
		$('fieldset').addClass('ui-widget ui-corner-all');
		$('fieldset legend').addClass('ui-widget-header ui-corner-all');
		$('header h1, header h2, header h3, header h4, header h5, header h6').addClass('ui-widget-header');
		$('button, a.ui-button, input[type=submit].ui-button').button();
	});
})(jQuery);
