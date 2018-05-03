function TonyGWebsite() {
	this.contactForm;
	this.init();
}

TonyGWebsite.prototype.init = function() {
	pageID = $("body").attr("id");

	if (pageID != "splash") {
		this.contactForm = new ContactForm();
		this.initContactForm("contact", mandrillApiKey);
	}
}

TonyGWebsite.prototype.initContactForm = function(contactSectionID, mandrillApiKey) {
	this.contactForm.init(contactSectionID, mandrillApiKey);
}


TonyGWebsite.prototype.linkNavigation = function(pageID) {
	// animate scroll from nav click,
	// cache links and update URL
	// http://stackoverflow.com/a/7717572
	var $root = $('html, body');
	$('a[href^="#"]').click(function(event) {
		event.preventDefault();
		var href = $.attr(this, 'href');

		var scrollValue = 0;
		if (href != "#") {
			scrollValue = $(href).offset().top;
		}

		$root.animate({
			scrollTop: scrollValue
		}, 500, function () {
			//window.location.hash = href;
		});
	});


	// update nav menu when scrolling over sections
	// http://codetheory.in/change-active-state-links-sticky-navigation-scroll/
	var sections = $('article')
		, nav = $('nav')
		, nav_height = nav.outerHeight();

	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop();

		sections.each(function() {
			var top = $(this).offset().top - nav_height,
			bottom = top + $(this).outerHeight();

			if (cur_pos >= top && cur_pos <= bottom) {
				nav.find('li').removeClass('active');
				sections.removeClass('active');

				$(this).addClass('active');
				navmenuitem = nav.find('a[href="#'+$(this).attr('id')+'"]').closest('li');
				if (navmenuitem.length) {
					navmenuitem.addClass('active');
				} else {
					if (pageID == "product") {
						nav.find('a[href="#products"]').closest('li').addClass('active');
					} else {
						nav.find('a[href="#"]').closest('li').addClass('active');
					}
				}
			} else {

			}
		});
	});
}
