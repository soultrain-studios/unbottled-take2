$(function() {
	$("#list_schools").change(function() {
		var anchor = $("[name="+ this.value +"]");
		$("html,body").animate({
			scrollTop: anchor.offset().top
		},1000);
		return false;
	});
}) 