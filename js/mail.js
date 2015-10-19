// jQuery plugin to prevent double submission of forms
jQuery.fn.preventDoubleSubmit = function() {
  jQuery(this).submit(function() {
    if (this.beenSubmitted)
      return false;
    else
      this.beenSubmitted = true;
  });
};
jQuery('#contactForm').preventDoubleSubmit();

$(document).ready(function($) {
    
	$("#contactbutton:submit").click(function (e) {
	    $('#sendMail').text("Mail en cours d'envoi.....");//.addClass('submit');
	    $("#contactbutton:submit").attr("disabled", true);	
        // get values from FORM
        var name = $("input#name").val();
        var email = $("input#email").val();
        var webSite = $("input#webSite").val();
        var budget = $("#budget option:selected" ).text();
        var delai = $("#delai option:selected" ).text();
        var message = $("textarea#message").val();

        Parse.initialize("tsVjWn4AwCdEkUkXR1dmuqaAMogtYspBBlHTWNRw", "Xm3zcKBgHkDpprIoTZm5H04BNe5GP6TalznNXuhm");
        
        var mail = "Un nouveau client "+name+" a effectué une demande : \n"+
        "Son ancien site est : "+webSite+".\n"+
        "Son budget est de : "+budget+".\n"+
        "Il souhaite que son projet soit réalisé dans un delai de "+delai+".\n"+
        "Voici le détail de son projet : \n"+message+".\n"+
        "Voici son mail pour le contacter : "+email+".\n";

        Parse.Cloud.run('mailSend', {
            target: 'edeltil@gmail.com',
            originator: email,
            subject : '[Freelance] Nouveau client : '+name,
            text :mail
        }, {
            // Success handler
            success: function() {
                $('#sendMail').text("E-Mail envoyé");
                $('#contactForm')[0].reset();
            },
            // Error handler
            error: function(message) {
                alert('Error: ' + message);
            }
        });
        return false;
    });
});
