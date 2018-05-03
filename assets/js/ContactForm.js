function ContactForm() {
	this.animationSpeed_ms = 100;
}

ContactForm.prototype.init = function(sectionID, mandrillApiKey) {
	var section = $("#"+sectionID);
	var form = section.find("form");

	var transmissionError = section.find(".transmission_error");

	var defaultSection = section.find(".default");
	var thankYouSection = section.find(".message_sent");

	transmissionError.slideUp(this.animationSpeed_ms);

	form.submit(function(event) {
		event.preventDefault();

		var action = $(this).attr("action");
		var button = section.find("input[type=submit]");
		button.prop('disabled', true);

		var from_name = section.find("#contact_name").val();
		var from_email = section.find("#contact_email").val();
		var from_subject = section.find("#contact_subject").val();
		var from_text = section.find("#contact_message").val();
		var from_reply = from_email;
		if (from_name && from_name.length) {
			from_reply = "'"+from_name+"' <"+from_email+">";
		}

		var data = {
			"key": mandrillApiKey,
			"message": {
				"text": from_text,
				"subject": from_subject,
				"from_email": "no-reply@zackees.com",
				"from_name": "Fashion Glow Jewelry",
				"to": [
					{
					"email": "adonis@zackees.com",
					"name": "New FashionGlow Message",
					"type": "to"
					}
				],
				"headers": {
					"Reply-To": from_reply
				}
			}
		}
		console.log(JSON.stringify(data));

		$.ajax({
			url: action,
			method: "POST", 
			data: data,
			crossDomain: true,
			success: function(response) {
				console.log(response);
				defaultSection.slideUp(this.animationSpeed_ms);
				thankYouSection.slideDown(this.animationSpeed_ms);
				/*
				console.log("message sent");
				if (data.result == "success") {
				} else {
					emailError.slideDown(this.animationSpeed_ms);
				}
				*/
/*

[
    {
        "email": "adonis@zackees.com",
        "status": "sent",
        "_id": "bbce85924e2244be988098c3fe0ab26a",
        "reject_reason": null
    }
]
*/

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
				console.log(errorThrown);
				transmissionError.slideDown(this.animationSpeed_ms);
				button.prop('disabled', false);
			},
			dataType: "json",
			jsonp: false
		});

	});


	
}
