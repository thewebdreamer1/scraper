$( function(){

});

$.getJSON( "output.json", function( data ) {
  var wrapper = $("#wrapper");
  $.each( data, function(key, value) {
    var modalName = data[key].name.toLowerCase().replace(/\s/g, '').replace(/\./g,'');
    var date = data[key].birthday;
    var format = $.datepicker.formatDate('MM dd, yy', new Date(date));
    var term = data[key].term.replace('In office','In Office: ');
    wrapper.append( "<div class='prez_block' data-modal='" + modalName + "' style='background-image:url(" + data[key].image + ")'><div class='overlay'></div><div class='content'><p class='name'>" + data[key].name + "</p></div></div>" );
    wrapper.append( "<div class='modal modal-for-" + modalName + "'><div class='modal-content'><p class='modal-name'>" + data[key].name + "</p><p class='modal-birthday'>Birthday: " + format + "</p><p class='modal-term'>" + term + "</p></div></div>" );
  });
  $(".prez_block").click(function(){
    var name = $(this).find(".name").text().toLowerCase().replace(/\s/g, '').replace(/\./g,'');
    $(".modal-for-" + name).show();
  });
  $(".modal").click(function(){
    $(this).hide();
  });
});
