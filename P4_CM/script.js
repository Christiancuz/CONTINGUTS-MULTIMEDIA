$(document).ready(function(){
	 $("#navMenu ul li").hover(function(){
		 $(this).find("ul").stop().slideToogle(400);
	})
});
