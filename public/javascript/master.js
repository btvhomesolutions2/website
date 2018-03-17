// jQuery Hover on Profile Picture
$('.special.cards .image').dimmer({
  on: 'hover'
});

//Popup
//======
$('.deletePopup').popup({
  on: 'click'
});

$('.cancel').popup({
  on: 'click'
});
//---- popup ending ------


// Assign Active Class to NavBar items
$("a.nav-link.smooth-scroll").ready(function() {
	// get current URL path and assign 'active' class
	var pathname = window.location.pathname;
  $("a.nav-link.smooth-scroll").removeClass("active");
	$("li a[href='"+pathname+"']").addClass("active");
})

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})
