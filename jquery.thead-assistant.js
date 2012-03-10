/**
 * jQuery <thead> Assistant v1.0
 * by Alexander Wallin (http://www.afekenholm.se).
 *
 * Licensed under MIT (http://www.afekenholm.se/license.txt)
 * 
 * The jQuery <thead> Assistant is a plugin that lets your table 
 * header stay in sight while displaying large tables.
 * 
 * For comments, discussion, propsals and/or development; please visit
 * http://www.afekenholm.se/jquery-thead-assistant or send a mail to
 * contact@afekenholm.se.
 * 
 * @author: Alexander Wallin (http://www.afekenholm.se)
 * @version: 1.0
 * @url: http://www.afekenholm.se/jquery-thead-assistant
 */
(function($){
	
	$.theadAssistant = function(el, options){
		
		// Cache references and options
		var base = this;
		base.opts = $.extend({}, $.theadAssistant.defaults, options);
		base.opts.addCSS = base.opts.leaveMyCSSAlone != true;
		base.el = el;
		base.$el = $(el);
		base.$thead = $("thead", base.$el);
		if (base.$thead.size() < 1 || $("th:eq(0)", base.$thead).size() < 1) return;
		
		/* Either clone the entire table or just the <thead>, 
		 * which is then appended to an empty <table> element.
		 */
		base.$clone = base.opts.cloneTable 
			? base.$el.clone(base.opts.cloneTableWithData) // Clone table
					.find("tbody").remove().end()
					.find("tfoot").remove().end() // cleanse
			: $("<table />").append(base.$thead.clone(base.opts.cloneTHEADWithData)); // Clone thead
		
		// Add proper css, if not told otherwise
		base.$clone
		.css(base.opts.addCSS ? {
			position: "relative",
			top: 0,
			left: 0,
			float: "left"
		} : {})
		.addClass("theadAssistant-cloned-table")
		.find("thead").addClass("theadAssistant-cloned-thead").end();
		
		// Build container with fixed position
		base.$cloneContainer = $("<div />").addClass("theadAssistant-container")
		.css(base.opts.addCSS ? {
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			zIndex: base.opts.z
		} : {}).hide().fadeOut(0)
		.append(base.$clone).prependTo($("body"));
		
		// Allow for the user to modify the cloned element
		if (base.opts.cloningFilterFn) 
			base.$clone = base.opts.cloningFilterFn(base.$clone);
		
		// Timer
		base.theadPosTimer = setInterval(function(){
			
			// Calculate when <thead> is outside the window's bounds
			var isTheadAboveWindowBounds = $(window).scrollTop() > base.$thead.offset().top + base.opts.showAtOffset;
			
			/* The table is set as outside the windows bounds when the last <th> or less
			 * is left visible.
			 */
			var isTableAboveWindowBounds = $(window).scrollTop() > 
					base.$el.offset().top + base.$el.height() 
					- base.$cloneContainer.height() - base.$el.find("th:last-child").height();
			
			// Hide and show
			if (base.$cloneContainer.is(":hidden") && 
					(true == isTheadAboveWindowBounds && false == isTableAboveWindowBounds)) {
				base.$cloneContainer.fadeIn(base.opts.fadingTime);
				base.$el.trigger("theadAssistantDidShow");
			}
			else if (base.$cloneContainer.is(":visible") && 
					(false == isTheadAboveWindowBounds || true == isTableAboveWindowBounds)) {
				base.$cloneContainer.fadeOut(base.opts.fadingTime, base.$cloneContainer.hide);
				base.$el.trigger("theadAssistantDidHide");
			}
		}, base.opts.timerInterval);
		
		// Adapt the cloned table to the window on resize
		base.handleResize = function(e){
			if (base.opts.addCSS == false) return;
			
			// Update cloned table offset
			base.$clone.css({
				left: base.$el.offset().left
			});
			
			// Set <th> width, as they have no content to adjust to. (Optional)
			if (base.opts.widenTHEADCells && base.opts.addCSS)
				base.$clone.find("th").each(function(i){
					$(this).css("width", $("th:eq(" + i + ")", base.$thead).width());
				});
		}
		
		/* Wait for images to load before styling the cloned
		 * table to match the window.
		 */
		var $imagesInTable = $("img", base.$el);
		if ($imagesInTable.size() >= 1) {
			$imagesInTable.load(base.handleResize);
		}
		else {
			base.handleResize();
		}
	};
	
	// Default options
	$.theadAssistant.defaults = {
		cloneTableTag: 		false,
		cloneTableWithData: false,
		cloneTHEADWithData: true,
		widenTHEADCells: 	true,
		z: 					100,
		showAtOffset: 		0,
		fadingTime: 		100,
		timerInterval: 		150,
		cloningFilterFn:	null,
		leaveMyCSSAlone: 	false
	}
	
	$.fn.theadAssistant = function(options){
		return this.each(function(i){
			new $.theadAssistant(this, options);
		});
	};
	
})(jQuery);