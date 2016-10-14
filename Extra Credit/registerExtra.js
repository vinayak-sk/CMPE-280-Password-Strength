var all = false;
var cond1, cond2, cond3, cond4, cond5, cond6 = false;
var progressValue = 0;

$( "#inputPassword" ).keyup(function() {

	var userId = $('#inputUserId').val();
	var content = $('#inputPassword').val();

	if(/[A-Z]/.test(content)){
		//console.log("Capital Word : " + content);
		$("#cond1False").css("visibility", "hidden");
		$("#cond1True").css("visibility", "visible");
		cond1 = true;
	}
	else{
		$("#cond1False").css("visibility", "visible");
		$("#cond1True").css("visibility", "hidden");
		cond1 = false;
	}

	if(/[a-z]/.test(content)){
		//console.log("Small Word : " + content);
		$("#cond2False").css("visibility", "hidden");
		$("#cond2True").css("visibility", "visible");
		cond2 = true;
	}
	else{
		$("#cond2False").css("visibility", "visible");
		$("#cond2True").css("visibility", "hidden");
		cond2 = false;
	}

	if(/\d/.test(content) ){
		//console.log("number : " + content);
		$("#cond3False").css("visibility", "hidden");
		$("#cond3True").css("visibility", "visible");
		cond3 = true;
	}
	else{
		$("#cond3False").css("visibility", "visible");
		$("#cond3True").css("visibility", "hidden");
		cond3 = false;
	}

	if(content.length >7 && content.length <21){
		//console.log("Length : true");
		$("#cond4False").css("visibility", "hidden");
		$("#cond4True").css("visibility", "visible");
		cond4 = true;
	}
	else{
		$("#cond4False").css("visibility", "visible");
		$("#cond4True").css("visibility", "hidden");
		cond4 = false;
	}

	var specialChar = /^(?=.*?[^\w\s])/;
	if(specialChar.test(content)){
		//console.log("Special char : true");
		$("#cond5False").css("visibility", "hidden");
		$("#cond5True").css("visibility", "visible");
		cond5 = true;
	}
	else{
		$("#cond5False").css("visibility", "visible");
		$("#cond5True").css("visibility", "hidden");
		cond5 = false;
	}

	if(userId != content){
		//console.log("same as uid : false" );
		$("#cond6False").css("visibility", "hidden");
		$("#cond6True").css("visibility", "visible");
		cond6 = true;
	}
	else{
		$("#cond6False").css("visibility", "visible");
		$("#cond6True").css("visibility", "hidden");
		cond6 = false;
	}
	
	var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,20}$/ ;
	if(regex.test(content)){
		console.log("All Entries : " + regex.test(content));
		all = true;
	}

	progressValue = (20 * cond1) + (20 * cond2) + (20 * cond3) + (20 * cond4) + (20 * cond5);
	$("#progressBar").val(progressValue);

	if($("#progressBar").val()>80){
		$("#weak").css("visibility", "hidden");
		$("#strong").css("visibility", "visible");
	}

});


$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();

    // Get some values from elements on the page:
    var $form = $( this ),
        userId = $form.find( "input[id='inputUserId']" ).val(),
        password = $form.find( "input[id='inputPassword']" ).val(),
        verifyPassword = $form.find( "input[id='inputVerifyPassword']" ).val(),
        verifyEmaiId = $form.find( "input[id='inputVerifyEmailID']" ).val(),
        emailId = $form.find( "input[id='inputEmailID']" ).val(),
        sequrityQuestion1 = $form.find( "input[id='inputSequrityQuestion1']" ).val(),
        sequrityAnswer1 = $form.find( "input[id='inputSequrityAnswer1']" ).val(),
        sequrityQuestion2 = $form.find( "input[id='inputSequrityQuestion2']" ).val(),
        sequrityAnswer2 = $form.find( "input[id='inputSequrityAnswer2']" ).val(),
        mobile = $form.find( "input[id='inputMobile']" ).val(),
        address = $form.find( "input[id='inputAddress']" ).val(),
        interestedAreas = $form.find( "input[id='interestedAreas']" ).val(),
        url = $form.attr( "action" );

    var data = {
      		userId:userId, password:password, emailId:emailId, sequrityQuestion1:sequrityQuestion1,
      		sequrityQuestion2:sequrityQuestion2, sequrityAnswer2:sequrityAnswer2, sequrityAnswer2:sequrityAnswer2,
      		mobile:mobile, address:address, interestedAreas:interestedAreas
    	}

    localStorage.setItem("data", data);

	//all=true;
	if((verifyPassword==password) && (verifyEmaiId==emailId)){
		if((userId != password) && (all == true)){
			url = 'LandingPage.html?data=' + encodeURIComponent(data);
			document.location.href = url;
		}
		else{
			alert("Error in password and userid");
			var txt1 = " <div class=\"alert alert-danger\"><strong>Error</strong> Renter Password and User Id.</div>";
			$("#alertErrors").append(txt1);
		}
	}
	else{
		alert('error in verify');
		var txt2 = " <div class=\"alert alert-danger\"><strong>Error</strong> Verify Password and Email Id again. </div>";
		$("#alertErrors").append(txt2);
	}

    //alert(userId);        
    });
});

$("#inputEmailID").keyup(function(){
	$("#result").text("");
	var email = $("#inputEmailID").val();
	if (validateEmail(email)) {
		$("#inputEmailID").css("color", "black");
    	$("#inputEmailID").css("border", "1px solid #ccc");
	}
	else {
    	$("#inputEmailID").css("color", "red");
    	$("#inputEmailID").css("border", "2px solid #ff0000");
	}
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}