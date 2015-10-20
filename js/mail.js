var submitted = false;
$(document).ready(function($) {
    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }

    $('#contactbutton').click(function (e) {
        e.preventDefault();
        if(!submitted) {
            submitted = true;
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var webSite = $("input#webSite").val();
            var budget = $("#budget option:selected").text();
            var delai = $("#delai option:selected").text();
            var message = $("textarea#message").val();

            if(name != "" && email != "" && isEmail(emailaddress)){
                Parse.initialize("tsVjWn4AwCdEkUkXR1dmuqaAMogtYspBBlHTWNRw", "Xm3zcKBgHkDpprIoTZm5H04BNe5GP6TalznNXuhm");
    
                var mail = "Un nouveau client " + name + " a effectué une demande : \n" +
                    "Son ancien site est : " + webSite + ".\n" +
                    "Son budget est de : " + budget + ".\n" +
                    "Il souhaite que son projet soit réalisé dans un delai de " + delai + ".\n" +
                    "Voici le détail de son projet : \n" + message + ".\n" +
                    "Voici son mail pour le contacter : " + email + ".\n";
    
                Parse.Cloud.run('mailSend', {
                    target: 'edeltil@gmail.com',
                    originator: email,
                    subject: '[Freelance] Nouveau client : ' + name,
                    text: mail
                }, {
                    // Success handler
                    success: function () {
                        $('#sendMail').show();
                        $('#contactForm')[0].reset();
                        submitted = false;
                    },
                    // Error handler
                    error: function (message) {
                        submitted = false;
                        alert('Error: ' + message);
                    }
                });
            }else{
                $('#sendMail').text("Veuillez remplir les champs 'Nom' et 'Email'");
                $('#sendMail').show();
            }
        }
    });
});
