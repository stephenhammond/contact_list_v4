$(function() {

  // ADD NEW CONTACT TO THE DATABASE
  newContactForm = $('#new-contact');
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
        data: newContact,
    });
    this.reset();
  });
  

  // DISPLAY ALL CONTACTS
  $('#button-all-contacts').on('click', function(){
    $.getJSON("http://localhost:3000/api/contact/list",     
      function(data) {
        var items = [];
        $.each( data, function( key, val ) {
          // console.log(data[index].first_name)
          // $('#showdata').text("Name: " + data[key].first_name + " " +  data[key].last_name);
          items.push( 
            "<li class='list-group-item'>" + "Name: "+ data[key].first_name + " " +  data[key].last_name + "<br/>" +
            "Email: "+ data[key].email + "<br/>" +
            "Phone: "+ data[key].phone + "</li>"
          );
        });

    $( "<ul/>", {
      "class": "my-new-list list-group",
      html: items.join( "" )
      }).appendTo( "#showdata" );
    });
  });

  // SEARCH FOR CONTACT BY ID
  searchContactForm = $('#search-form');
  searchContactForm.on('submit', function (evt) {
    evt.preventDefault();
    var id = {};
    var id = searchContactForm.find('[name=id-search]').val();
    $.ajax({
      method: 'get',
      url: '/api/contact/' + id, 
      success: function (contactData) {
        // debugger;
        $("#search-result").html(
          "<div class='list-group-item'>" +
            "<p>Name: " + contactData.first_name + " " + contactData.last_name + "</p>" + "<p>Email: " + contactData.email + "</p>" +
            "<p>Phone: " + contactData.phone + "</p>" + "</div>"
          );
      },
      error: function() {
        $('#search-result').html("<p class='list-group-item'> No ID exists with that number! </p>");
      }
    });
    this.reset();
  });
});



