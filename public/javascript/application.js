$(function() {

var newContactForm = $('#new-contact');

    newContactForm.on('submit', function (evt) {
        evt.preventDefault();
        var newContact = {};
        newContact.first_name = newContactForm.find('[name=first_name]').val();
        newContact.last_name = newContactForm.find('[name=last_name]').val();
        newContact.email = newContactForm.find('[name=email]').val();
        newContact.phone = newContactForm.find('[name=phone]').val();
        $.ajax({
            method: 'POST',
            url: '/', 
            data: JSON.stringify(newContact),
            success: "yay", 
            dataType: 'json',
            contentType: 'application/json;charset=utf-8'
        });
    });
    

    $('#button-all-contacts').on('click', function(){
        $.getJSON("http://localhost:3000/api/contact/list",  { format: "json" },     
            function(data) {
              var items = [];
              $.each( data, function( key, val ) {
                items.push( "<li id='" + key + "'>" + val + "</li>" );
              });
             
              $( "<ul/>", {
                "class": "my-new-list",
                html: items.join( "" )
              }).appendTo( "body" );

            // $('#showdata').html("<p>hello</p>");
        });
    });

});
