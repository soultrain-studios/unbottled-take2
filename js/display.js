$(function() {
	$("#list_schools").change(function() {
		var anchor = $("[data-school-name='"+ this.value +"']");
		$("html,body").animate({
			scrollTop: anchor.offset().top
		},1000);

		var schoolNum = $(anchor).attr('data-school-number');

		var schoolStats = $("#stats-" + schoolNum);
		schoolStats.slideToggle();

		return false;
	});
});
var myDataRef = new Firebase('https://waterfact.firebaseio.com/');
var messages = [];
myDataRef.on('child_added', function(snapshot) {
	messages.push(snapshot.val());
	var randActive = Math.floor(Math.random() * messages.length);
	displayMessage(messages[randActive].fact);
});
      //only display newest comment
      function displayMessage(fact) {
      	$('#message').text(fact);
      };
      

