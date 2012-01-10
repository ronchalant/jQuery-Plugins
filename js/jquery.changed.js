(function($) {
	// takes in hh:mm[:ss] and returns total seconds elapsed in day
	var timeRegex = /^([0-2]?[0-9]):([0-5][0-9])(:([0-5][0-9]))?$/, calcTime = function(t) {
		var ts = 0;
		if( m = t.match(timeRegex)) {
			// m[1] = hrs, m[2] = mins, m[4] = seconds (if exists)
			ts = parseInt(m[1], 10) * 3600 + parseInt(m[2], 10) * 60 + parseInt(m[4] || '0', 10);
		}
		return ts;
	}, timeCompare = function(t0, t1) {
		if(t0 === t1)
			return true;
		return calcTime(t0) === calcTime(t1);
	};

	$(function() {
		$('select').each(function(idx, el) {
			var $t = $(el);
			// for standard selects/dropdowns, we have to "fix" it so the 0-index
			// item is "defaultSelected=true" if no other options were defaultSelected
			// we only need to do this once.
			if(el.multiple !== true && !$t.data('_defaultSet')) {
				if (el.selectedIndex === 0) {
					$t.find(':selected')[0].defaultSelected = true;
				}
				$t.data('_defaultSet', true);
			}
		});
	});

	$.fn.hasChanged = function() {
		if(this.is('form')) {
			// handle form
			var formChanged = false;
			this.find(':input').each(function() {
				if($(this).hasChanged()) {
					formChanged = true;
					return false;
				}
			})
			return formChanged;
		}

		if(!this.length || !this.is(':input'))
			return false;

		// only care about first one
		var ip = this[0], $t = this.first(), name = $t.attr('name'), type = (ip.nodeName === 'SELECT' ? 'select' : $t.attr('type') || 'text').toLowerCase(), changed = false;

		switch (type) {
			case 'submit':
			case 'button':
				break;
			case 'select':

				$.each($t.children('option'), function(idx, o) {
					if(this.selected !== this.defaultSelected) {
						changed = true;
						return false;
					}
				});
				break;
			case 'checkbox':
			case 'radio':
				changed = ip.checked !== ip.defaultChecked;
				break;

			case 'time':
				// time may be in hh:mm:ss or hh:mm...
				changed = !timeCompare(ip.value, ip.defaultValue);
				break;

			default:
				changed = ip.value !== ip.defaultValue;
				break;

		}
		return changed;
	};

	$.extend($.expr[':'], {
		changed : function(el) {
			return $(el).is(':input') && $(el).hasChanged();
		}
	});

})(jQuery);
