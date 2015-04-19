"use strict"
$(document).ready(function(){
	function handleError(message){
		$("#errorMessage").text(message);
	}
	
	function sendAjax(action, data){
		$.ajax({
			cache: false,
			type: "POST",
			url: action,
			data: data,
			dataType: "json",
			success: function(result, status, xhr){
				$("#errorMessage").text("");
				window.location = result.redirect;
			},
			error: function(xhr, status, error){
				var messageObj = JSON.parse(xhr.responseText);
				handleError(messageObj.error);
			}
		});
	}
	
	$("makeToDoSubmit").on("click", function(e){
		e.preventDefault();
		
		$("#errorMessage").text("");
		
		if($("#todoDesc").val() == ''){
			handleError("A description is required");
			return false;
		}
		
		sendAjax($("todoForm").attr("action"), $("#todoForm").serialize();
		
		return false;
	});
});