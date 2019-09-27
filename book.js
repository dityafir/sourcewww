/*start edit by albert*/
var codeToFind = "";

$(function() {
function GetQueryStringParams(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
    {
       var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function autopopulateBookPanel(){
	var cityFrom = GetQueryStringParams('cityFrom');
	var cityDestination = GetQueryStringParams('cityTo');
	var depDate = GetQueryStringParams('depDate');
	var arrDate = GetQueryStringParams('arrDate');
	var paxAdult = GetQueryStringParams('paxAdult');
	var paxChild = GetQueryStringParams('paxChild');
	var paxInfant = GetQueryStringParams('paxInfant');
	var cabinFlight = GetQueryStringParams('cabinFlight');
	var promoCode = GetQueryStringParams('promoCode');
	var trip_type = GetQueryStringParams('tripType');
	
	if(trip_type !=null && trip_type !=""){
		if(trip_type == 'R')
		{
			$("#returntrip").click();
		}
		else if(trip_type == 'O')
		{
			$("#oneway").click();
		}else if(trip_type == 'M')
		{
			$("#multicity").click();
		}
	}
	else{
		trip_type == 'R';
		$("#returntrip").click();
	}
		if(trip_type != 'M')
		{
			var resultFrom = "";
			var resultTo = "";
			if(cityFrom !=null && cityFrom !="")
			{
				resultFrom = $.grep(citylist, function(e){ return e.desc.indexOf(cityFrom) > 0 ; });
				$("#originairportcode").val(resultFrom[0].value + ", " + resultFrom[0].desc);
				
			}
			else
			{
				resultFrom = $.grep(citylist, function(e){ return e.label.indexOf(cityFrom) >= 0 ; });
			}
			
			if(cityDestination !=null && cityDestination !="")
			{
				resultTo = $.grep(citylist, function(e){ return e.desc.indexOf(cityDestination) > 0 ; });
				$("#destairportcode").val(resultTo[0].value + ", " + resultTo[0].desc);
			}
			else
			{
				resultTo = $.grep(citylist, function(e){ return e.label.indexOf(cityDestination) >= 0 ; });
				//$("#destairportcode").val(resultTo[0].value + ", " + resultTo[0].desc);
			}

			if(depDate != null && depDate!="")
			{
				$("#departuredate").val(depDate);
				if(arrDate != null && arrDate!="")
				{
					$("#departuredate").datepicker("option", "maxDate", new Date(arrDate.split("/")[2], arrDate.split("/")[1]-1,arrDate.split("/")[0]));
				}
			}
			else
			{
				$("#departuredate").val("");
			}
			if(arrDate != null && arrDate !="")
			{
				$("#arrivaldate").val(arrDate);	
				$("#arrivaldate").datepicker("option", "maxDate", new Date(arrDate.split("/")[2], arrDate.split("/")[1]-1,arrDate.split("/")[0]));
			}
			else
			{
				$("#arrivaldate").val("");
			}
			
			if(cabinFlight !=null && cabinFlight!=""){
				$("#pick-class").val(cabinFlight);
				$("#pick-class").click();
			}
			
			if(paxAdult !=null && paxAdult != "")
				$("#guestTypes\\[0\\]\\.amount").val(paxAdult);
			if(paxChild !=null && paxChild != "")
				$("#guestTypes\\[1\\]\\.amount").val(paxChild);
			if(paxInfant != null && paxInfant != "")
				$("#guestTypes\\[2\\]\\.amount").val(paxInfant);
			
			if(promoCode !=null && promoCode !=""){
				$("#promoCode").val(promoCode.trim());
			}
		}
	}

	if(GetQueryStringParams('cityFrom')!=null || GetQueryStringParams('cityTo')!=null || GetQueryStringParams('depDate')!=null || GetQueryStringParams('arrDate')!=null || GetQueryStringParams('paxAdult')!=null || GetQueryStringParams('paxChild')!=null || GetQueryStringParams('paxInfant')!=null || GetQueryStringParams('cabinFlight')!=null || GetQueryStringParams('promoCode')!=null || GetQueryStringParams('tripType')!=null){
		autopopulateBookPanel();
	}
	else{
		$("#destairportcode").val("");
		$("#originairportcode").val("");
	}
	
/*if($(window).width() > 640) 
		{
			
		}
		else
		{
			$(".m-book-flight").click();
		}*/
		
		$('#schedule-return').parent().attr("class", "checked");
/*end edit by albert*/
});

function processBookCitilink(){
	//GA-QG
	var citiTrip = "";
	var citiOri = "";
	var citiDest = "";
	var citiDepart = "";
	var citiArrive = "";
	var citiAdult = "";
	var citiChildren = "";
	var citiInfant = "";
	
	var currentForm = $('.flight_search_typeahead_from').parents('form:visible');

	var tripType = currentForm.find('input#TRIP_TYPE').val();
	if(tripType=="R"){
		citiTrip="RoundTrip";
		citiArrive = currentForm.find('input[id$="arrivaldate"]').val().replace(/\//g,'-');
	}else if(tripType=="O"){
		citiTrip="OneWay";
	}

	
	citiOri = currentForm.find('#originairportcode').val().substring(currentForm.find('#originairportcode').val().lastIndexOf('(')+1, currentForm.find('#originairportcode').val().lastIndexOf(')'));
	citiDest = currentForm.find('#destairportcode').val().substring(currentForm.find('#destairportcode').val().lastIndexOf('(')+1, currentForm.find('#destairportcode').val().lastIndexOf(')'));

	citiDepart = currentForm.find('input[id$="departuredate"]').val().replace(/\//g,'-');
	
	citiAdult = currentForm.find('input[name="guestTypes[0].amount"]').val();
	citiChildren = currentForm.find('input[name="guestTypes[1].amount"]').val();
	citiInfant = currentForm.find('input[name="guestTypes[2].amount"]').val()

	window.open("http://bookgaqg.garuda-indonesia.com/from-garuda?flight_origin="+citiOri+"&flight_destination="+citiDest+"&flight_adult="+citiAdult+"&flight_child="+citiChildren+"&flight_infant="+citiInfant+"&flight_going="+citiDepart+"&flight_return="+citiArrive+"&flight_class=E", "_self");

}

//Fitur Refund
function processRefund(){
	submitExternalBooking($("#ajax").val(),"refund","");
}

function processIBE(captchaSubmit){
	var cif = checkInterFlight();
	//var currentForm = $('select#originairportcode').parents('form:visible');
	var currentForm = $('input#originairportcode').parents('form:visible');
	
	//set cookie last search
	
	//var lastSearchFrom = $('#originairportcode').val().substring($('#originairportcode').val().lastIndexOf('(')+1,$('#originairportcode').val().lastIndexOf(')'));
	//var lastSearchTripType = $('.ui-state-active').find('.typetrip').attr('id');
	var lastSearchFrom = currentForm.find('#originairportcode').val().substring(currentForm.find('#originairportcode').val().lastIndexOf('(')+1,currentForm.find('#originairportcode').val().lastIndexOf(')'));
	var lastSearchTripType = $('.flyingtriptype:visible:checked').attr('id');
	
	setCookie("lsf",lastSearchFrom,30,"path=/");
	setCookie("lstt",lastSearchTripType,30,"path=/");
	
	//var lastSearchTo = $('#destairportcode').val().substring($('#destairportcode').val().lastIndexOf('(')+1,$('#destairportcode').val().lastIndexOf(')'));
	var lastSearchTo = currentForm.find('#destairportcode').val().substring(currentForm.find('#destairportcode').val().lastIndexOf('(')+1,currentForm.find('#destairportcode').val().lastIndexOf(')'));
	setCookie("lst",lastSearchTo,30,"path=/");
	
	var lastSearchAdult = currentForm.find('input[name="guestTypes[0].amount"]').val();
	var lastSearchChildren = currentForm.find('input[name="guestTypes[1].amount"]').val();
	var lastSearchInfant = currentForm.find('input[name="guestTypes[2].amount"]').val();
	setCookie("lsadt",lastSearchAdult,30,"path=/");
	setCookie("lschd",lastSearchChildren,30,"path=/");
	setCookie("lsinf",lastSearchInfant,30,"path=/");

	var lastSearchDepart = currentForm.find('input[id$="departuredate"]').val();
	setCookie("lsdd",lastSearchDepart,30,"path=/");
	var lastSearchArrive = currentForm.find('input[id$="arrivaldate"]').val();
	setCookie("lsad",lastSearchArrive,30,"path=/");

	var lastSearchCabin = currentForm.find('select#cabindesk').val();
	setCookie("lsc",lastSearchCabin,30,"path=/");

	
	if(cif == true){
			//var x = confirm(ifn);
			//if(x == true){
				//callDoubleclickTracking();
	
				var formtest = document.getElementById('searchflightform');
				//formtest.action=formtest.host.value + formtest.formAction.value;
				//formtest.target='_blank';
				var tripType = $("input#TRIP_TYPE").val();		
				//alert(tripType);				
				//console.log("tripType checked : "+tripType);
				//Custom Herry

				
				//$('input[name=iwPreActions]').val('booking');
				if(tripType=="M"){
					submitBooking(captchaSubmit);
				}else if(tripType=="R"){
					submitBooking(captchaSubmit);
				}else if(tripType=="O"){submitBooking(captchaSubmit);}
				
			
	}else{
			
			//callDoubleclickTracking();
			var formtest = document.getElementById('searchflightform');
			//formtest.action=formtest.host.value + formtest.formAction.value;
			//formtest.target='_blank';
			var tripType = $("input#TRIP_TYPE").val();			
			//alert(tripType);
			//console.log("tripType checked : "+tripType);
			//Custom Herry

			
			//$('input[name=iwPreActions]').val('booking');
			if(tripType=="M"){
				submitBooking(captchaSubmit);
			}else if(tripType=="R"){
				submitBooking(captchaSubmit);
			}else if(tripType=="O"){
				submitBooking(captchaSubmit);
			}  
	}	
}

function processIBEMobile(captchaSubmit){
	var cif = checkInterFlight();
	//var currentForm = $('select#originairportcode').parents('form:visible');
	var currentForm = $('input#originairportcode').parents('form:visible');
	
	//set cookie last search
	
	//var lastSearchFrom = $('#originairportcode').val().substring($('#originairportcode').val().lastIndexOf('(')+1,$('#originairportcode').val().lastIndexOf(')'));
	//var lastSearchTripType = $('.ui-state-active').find('.typetrip').attr('id');
	var lastSearchFrom = currentForm.find('#originairportcode').val().substring(currentForm.find('#originairportcode').val().lastIndexOf('(')+1,currentForm.find('#originairportcode').val().lastIndexOf(')'));
	var lastSearchTripType = $('.flyingtriptype:visible:checked').attr('id')
	
	setCookie("lsf",lastSearchFrom,30,"path=/");
	setCookie("lstt",lastSearchTripType,30,"path=/");
	
	//var lastSearchTo = $('#destairportcode').val().substring($('#destairportcode').val().lastIndexOf('(')+1,$('#destairportcode').val().lastIndexOf(')'));
	var lastSearchTo = currentForm.find('#destairportcode').val().substring(currentForm.find('#destairportcode').val().lastIndexOf('(')+1,currentForm.find('#destairportcode').val().lastIndexOf(')'));
	setCookie("lst",lastSearchTo,30,"path=/");
	
	var lastSearchAdult = currentForm.find('input[name="guestTypes[0].amount"]').val();
	var lastSearchChildren = currentForm.find('input[name="guestTypes[1].amount"]').val();
	var lastSearchInfant = currentForm.find('input[name="guestTypes[2].amount"]').val();
	setCookie("lsadt",lastSearchAdult,30,"path=/");
	setCookie("lschd",lastSearchChildren,30,"path=/");
	setCookie("lsinf",lastSearchInfant,30,"path=/");

	var lastSearchDepart = currentForm.find('input[id$="departuredate"]').val();
	setCookie("lsdd",lastSearchDepart,30,"path=/");
	var lastSearchArrive = currentForm.find('input[id$="arrivaldate"]').val();
	setCookie("lsad",lastSearchArrive,30,"path=/");

	var lastSearchCabin = currentForm.find('select#cabindesk').val();
	setCookie("lsc",lastSearchCabin,30,"path=/");

	if(cif == true){
			//var x = confirm(ifn);
			//if(x == true){
				//callDoubleclickTracking();
	
				var formtest = document.getElementById('searchflightform_mobile');
				//formtest.action=formtest.host.value + formtest.formAction.value;
				//formtest.target='_blank';
				var tripType = $("input#TRIP_TYPE").val();		
				//alert(tripType);				
				//console.log("tripType checked : "+tripType);
				//Custom Herry

				
				//$('input[name=iwPreActions]').val('booking');
				if(tripType=="M"){
					submitBooking(captchaSubmit);
				}else if(tripType=="R"){
					submitBooking(captchaSubmit);
				}else if(tripType=="O"){submitBooking(captchaSubmit);}
				
			
	}else{
			
			//callDoubleclickTracking();
			var formtest = document.getElementById('searchflightform_mobile');
			//formtest.action=formtest.host.value + formtest.formAction.value;
			//formtest.target='_blank';
			var tripType = $("input#TRIP_TYPE").val();			
			//alert(tripType);
			//console.log("tripType checked : "+tripType);
			//Custom Herry

			
			//$('input[name=iwPreActions]').val('booking');
			if(tripType=="M"){
				submitBooking(captchaSubmit);
			}else if(tripType=="R"){
				submitBooking(captchaSubmit);
			}else if(tripType=="O"){
				submitBooking(captchaSubmit);
			}  
	}	
}

$(function() {
                var dp1 = [];

/*
		var dates = $( "#departuredate" ).datepicker({
		showButtonPanel: true,
	      	closeText: 'Close',
		minDate: 0,
		maxDate: "+1Y-1D",
		dateFormat: "dd/mm/yy",
		numberOfMonths: 1,
		firstDay: 1,
		beforeShow: function() {
			setTimeout(function(){
				$('.ui-datepicker').css('z-index', 99999999999999);
			}, 0);
		},
		onSelect: function( selectedDate ) {
                        dp1 = [];
                        dp1.push(selectedDate);
			var tripType = $("input#TRIP_TYPE").val();
			if(tripType!="M")
			{
				var option = "minDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
				dates.not( this ).datepicker( "option", option, date );
			}
			else
			{
				var from = $("#departuredate").val().split("/");				
				f = new Date(from[2], from[1] - 1, from[0]);				
				
				$("#departuredate2").datepicker(
                    "change",
                    { 
						minDate: f,
						maxDate: "+1Y-1D"
					}
				);
			}
			$(".tooltip-date").removeClass("active");
		},
	});              
*/
	/*
	var dates = $("#departuredate, #arrivaldate" ).datepicker({
		showButtonPanel: true,
	      	closeText: 'Close',
		minDate: 0,
		maxDate: "+1Y-1D",
		dateFormat: "dd/mm/yy",
		numberOfMonths: 1,
		firstDay: 1,
		beforeShow: function() {
			setTimeout(function(){
				$('.ui-datepicker').css('z-index', 99999999999999);
			}, 0);
		},
		//ini buat apa ya? gw matiin dulu ya
		
		beforeShowDay: function (date) {
				if(this.id == "arrivaldate")
				{
				   dmy =  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
				   if ($.inArray(dmy, dp1) >= 0) 
				   {
					  return [true, "foo"];
				   } else {
					 return [true, ""];
				   }
				}
				else return false;
			  },
		
		onSelect: function( selectedDate ) {
                        dp1 = [];
                        dp1.push(selectedDate);
			var tripType = $(".section-book_floating input#TRIP_TYPE").val();
			alert(tripType);
			if(tripType!="M")
			{
				var option = this.id == "departuredate" ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
				dates.not( this ).datepicker( "option", option, date );
			}
			else
			{
				var from = $("#departuredate").val().split("/");				
				f = new Date(from[2], from[1] - 1, from[0]);				
				
				$("#departuredate2").datepicker(
                    "change",
                    { 
						minDate: f,
						maxDate: "+1Y-1D"
					}
				);
			}

			$(".tooltip-date").removeClass("active");
		},
	});              
	*/
});
		

$(function() {
	var dates = $( "#departuredate2, #departuredate3, #departuredate4, #departuredate5, #departuredate6" ).datepicker({
		showButtonPanel: true,
	      	closeText: 'Close',
		minDate: 0,
		maxDate: "+1Y-1D",
		dateFormat: "dd/mm/yy",
		numberOfMonths: 1,
		firstDay: 1,
		beforeShow: function() {
			setTimeout(function(){
				$('.ui-datepicker').css('z-index', 99999999999999);
			}, 0);
		},
		onSelect: function( selectedDate ) {
			
			if($(this).attr('id')=='departuredate2')
			{
				var from = $("#departuredate2").val().split("/");				
				f = new Date(from[2], from[1] - 1, from[0]);				
				
				$("#arrivaldate").val($(this).val());
				
				$("#departuredate3").datepicker(
					"change",
					{ 
						minDate: f,
						maxDate: "+1Y-1D"
					}
				);
				
			}
			
			if($(this).attr('id')=='departuredate3')
			{
				var from = $("#departuredate3").val().split("/");				
				f = new Date(from[2], from[1] - 1, from[0]);				
				
				$("#departuredate4").datepicker(
					"change",
					{ 
						minDate: f,
						maxDate: "+1Y-1D"
					}
				);
			}
			
			if($(this).attr('id')=='departuredate4')
			{
				var from = $("#departuredate4").val().split("/");				
				f = new Date(from[2], from[1] - 1, from[0]);				
				
				$("#departuredate5").datepicker(
					"change",
					{ 
						minDate: f,
						maxDate: "+1Y-1D"
					}
				);
			}
			
			if($(this).attr('id')=='departuredate5')
			{
				var from = $("#departuredate5").val().split("/");				
				f = new Date(from[2], from[1] - 1, from[0]);				
				
				$("#departuredate6").datepicker(
					"change",
					{ 
						minDate: f,
						maxDate: "+1Y-1D"
					}
				);
			}
		}
	});
});

$(function() {
		var dates = $( "#departuredatebd2, #arrivaldatebd2" ).datepicker({
		showButtonPanel: true,
	      	closeText: 'Close',
		minDate: 0,
		maxDate: "+1Y-1D",
		dateFormat: "dd/mm/yy",
		numberOfMonths: 1,
		firstDay: 1,
		beforeShow: function() {
			setTimeout(function(){
				$('.ui-datepicker').css('z-index', 99999999999999);
			}, 0);
		},
		onSelect: function( selectedDate ) {
			
			var option = this.id == "departuredatebd2" ? "minDate" : "maxDate",
			instance = $( this ).data( "datepicker" ),
			date = $.datepicker.parseDate(
				instance.settings.dateFormat ||
				$.datepicker._defaults.dateFormat,
				selectedDate, instance.settings );
			dates.not( this ).datepicker( "option", option, date );
			
		}				
	});              
});

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}


function checkInterFlight(){
	var b = $("#outboundOption\\.originLocationCode").val();
	var c = $("#outboundOption\\.destinationLocationCode").val();
	var orglocarr = "";
	var deslocarr = "";
	for (a in boolcities) {
		if(boolcities.hasOwnProperty(a)){
			explodeorg = boolcities[a].split(':');
			if((explodeorg[0]==b)) {
				orglocarr = explodeorg;
				break;
			}
		}		
	}
	for (a in boolcities){
		if(boolcities.hasOwnProperty(a)){
			explodedes = boolcities[a].split(':');
			if((explodedes[0]==c)) {
				deslocarr = explodedes;
				break;
			}
		}
	}
	if((orglocarr[1] == 0 && deslocarr[1] == 1) || (orglocarr[1] == 1 && deslocarr[1] == 0) || (orglocarr[1] == 1 && deslocarr[1] == 1)){
		//submitSearchFlight();
		
		return true;
	}
	else {
			return false;
	}
}

function validateRT(a) {

	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");

	var b = true;
	var c = document.getElementById("originairportcode").value;
	var d = document.getElementById("destairportcode").value;
	var e = document.getElementById("departuredate").value;
	var f = document.getElementById("arrivaldate").value;
	if (c.length < 1) {
		if(galangid=="en")
			alert("Please choose departure city");
		else if(galangid=="id")
			alert("Silahkan pilih kota keberangkatan");
		else
			alert("Please choose departure city");

		b = false
	} else if (d.length < 1) {
		if(galangid=="en")
			alert("Please choose arrival city");
		else if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else
			alert("Please choose arrival city");
		
		b = false
	} else if (e.length < 1) {
		if(galangid=="en")
			alert("Please choose date of departure");
		else if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please choose date of departure");

		
		b = false
	} else if (f.length < 1) {
		if(galangid=="en")
			alert("Please choose date of arrival");
		else if(galangid=="id")
			alert("Silahkan pilih tanggal kembali yang valid");
		else
			alert("Please choose date of arrival");

		
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			if(galangid=="en")
				alert("Please choose departure city");
			else if(galangid=="id")
				alert("Silahkan pilih kota keberangkatan");
			else
				alert("Please choose departure city");
			
			return false
		}
		if (!validateCityCode(d, a)) {
			if(galangid=="en")
				alert("Please choose arrival city");
			else if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else
				alert("Please choose arrival city");
			
			return false
		}
	}
	return b
}
function validateOW(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");

	var b = true;
	var c = document.forms["searchflightform"]["originairportcode"].value;
	var d = document.forms["searchflightform"]["destairportcode"].value;
	var e = document.forms["searchflightform"]["departuredate"].value;
	

	if (c.length < 1) {
		if(galangid=="en")
			alert("Please choose departure city");
		else if(galangid=="id")
			alert("Silahkan pilih kota keberangkatan");
		else
			alert("Please choose departure city");

		b = false
	} else if (d.length < 1) {
		if(galangid=="en")
			alert("Please choose arrival city");
		else if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else
			alert("Please choose arrival city");

		b = false
	} else if (e.length < 1) {
		if(galangid=="en")
			alert("Please choose date of departure");
		else if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please choose date of departure");

		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			if(galangid=="en")
				alert("Please choose departure city");
			else if(galangid=="id")
				alert("Silahkan pilih kota keberangkatan");
			else
				alert("Please choose departure city");

			return false
		}
		if (!validateCityCode(d, a)) {
			if(galangid=="en")
				alert("Please choose arrival city");
			else if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else
				alert("Please choose arrival city");
			
			return false
		}
	}
	return b
}

function validateRTMobile(a) {

	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");

	var b = true;
	var c = document.getElementById("originairportcode").value;
	var d = document.getElementById("destairportcode").value;
	var e = document.getElementById("mobile_departuredate").value;
	var f = document.getElementById("mobile_arrivaldate").value;
	if (c.length < 1) {
		if(galangid=="en")
			alert("Please choose departure city");
		else if(galangid=="id")
			alert("Silahkan pilih kota keberangkatan");
		else
			alert("Please choose departure city");

		b = false
	} else if (d.length < 1) {
		if(galangid=="en")
			alert("Please choose arrival city");
		else if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else
			alert("Please choose arrival city");
		
		b = false
	} else if (e.length < 1) {
		if(galangid=="en")
			alert("Please choose date of departure");
		else if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please choose date of departure");

		
		b = false
	} else if (f.length < 1) {
		if(galangid=="en")
			alert("Please choose date of arrival");
		else if(galangid=="id")
			alert("Silahkan pilih tanggal kembali yang valid");
		else
			alert("Please choose date of arrival");

		
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			if(galangid=="en")
				alert("Please choose departure city");
			else if(galangid=="id")
				alert("Silahkan pilih kota keberangkatan");
			else
				alert("Please choose departure city");
			
			return false
		}
		if (!validateCityCode(d, a)) {
			if(galangid=="en")
				alert("Please choose arrival city");
			else if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else
				alert("Please choose arrival city");
			
			return false
		}
	}
	return b
}
function validateOWMobile(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");

	var b = true;
	var c = document.forms["searchflightform_mobile"]["originairportcode"].value;
	var d = document.forms["searchflightform_mobile"]["destairportcode"].value;
	var e = document.forms["searchflightform_mobile"]["mobile_departuredate"].value;
	

	if (c.length < 1) {
		if(galangid=="en")
			alert("Please choose departure city");
		else if(galangid=="id")
			alert("Silahkan pilih kota keberangkatan");
		else
			alert("Please choose departure city");

		b = false
	} else if (d.length < 1) {
		if(galangid=="en")
			alert("Please choose arrival city");
		else if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else
			alert("Please choose arrival city");

		b = false
	} else if (e.length < 1) {
		if(galangid=="en")
			alert("Please choose date of departure");
		else if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please choose date of departure");

		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			if(galangid=="en")
				alert("Please choose departure city");
			else if(galangid=="id")
				alert("Silahkan pilih kota keberangkatan");
			else
				alert("Please choose departure city");

			return false
		}
		if (!validateCityCode(d, a)) {
			if(galangid=="en")
				alert("Please choose arrival city");
			else if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else
				alert("Please choose arrival city");
			
			return false
		}
	}
	return b
}

function validateCityCode(a, b) {
	found = false;
	for (j = 0; j < b.length; j++) {
		if (b[j] == a) {
			found = true;
			break
		}
	}
	return found
}
function validateMC(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");

	var b = true;

	if(!document.getElementById("originairportcode").value)
	{
		if(galangid=="id")
			alert('Harap masukan kota keberangkatan pada baris 1');
		else
			alert('Please input departure city on row 1');

		return false;
	}
	/*	
	for (i = 0; i < 6; i++) {
		var c;
		var index = i+1;
		if(i==0)
			c = document.getElementById("originairportcode").value;
		else
			c = document.getElementById("originairportcode" + index).value;
			
		if (c == null || c.length <= 0)
			continue;
		found = false;
		for (j = 0; j < a.length; j++) {
			if (a[j] == c) {
				found = true;
				break
			}
		}
		
		if (!found) {
			if(galangid=="id")
				alert("Kota keberangkatan salah!");
			else				
				alert("Please choose departure city correctly!");
			
			return false
		}
	}
	for (i = 0; i < 6; i++) {
		var d;
		var index = i+1;
		if(i==0)
			d = document.getElementById("destairportcode").value;
		else
			d = document.getElementById("destairportcode" + index).value;
			
		if (d == null || d.length <= 0)
			continue;
		found = false;
		for (j = 0; j < a.length; j++) {
			if (a[j] == d) {
				found = true;
				break
			}
		}
		if (!found) {
			if(galangid=="id")
				alert("Kota tujuan salah!");
			else
				alert("Please choose arrival city correctly!");

			return false
		}
	}
	*/
	
	for (i = 0; i < 6; i++) {
		var or;
		var de;
		var da;
		var index = i+1;
		
		
		
		if(i==0)
		{
			or = document.getElementById("originairportcode").value;
			de = document.getElementById("destairportcode").value;
			da = document.getElementById("departuredate").value;
		}
		else
		{
			or = document.getElementById("originairportcode" + index).value;
			de = document.getElementById("destairportcode" + index).value;
			da = document.getElementById("departuredate" + index).value;
		}
		
		if(!$("#originairportcode"+index).is(":visible"))
			break;

		if((!or && de && da) || (or && !de && da) || (or && de && !da) || (!or && !de && da) || (or && !de && !da) || (!or && de && !da))
		{
			if(galangid=="id")
				alert('Harap melengkapi penerbangan pada baris ' + index + ' ');
			else
				alert('Please complete the flight on row ' + index + ' ');

			b=false;
		}
		else if (or && de && or == de) 
		{
			if(galangid=="id")
				alert("Kota tujuan dan keberangkatan tidak boleh sama (baris:" + index + ")");
			else
				alert("Departure city and arrival city must not be the same (row:" + index + ")");

			return false
		}

	}
	//END CUSTOM HERRY

	return b
}

function validateShowSchedule(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");
	var b = true;
	var c = document.forms["frmShowScheduleByDate"]["originbd-2"].value;
	var d = document.forms["frmShowScheduleByDate"]["destinationbd-2"].value;
	if (c.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota asal");
		else
			alert("Please select departure city");*/
			
		b = false
	} else if (d.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else	
			alert("Please select return city");*/
			
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota asal");
			else
				alert("Please select departure city");*/
				
			return false
		}
		if (!validateCityCode(d, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else	
				alert("Please select return city");*/
				
			return false
		}
	}
	return b
}
function validateShowScheduleByDate(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");
	var b = true;
	var c = document.forms["frmShowScheduleByDate"]["originbd-2"].value;
	var d = document.forms["frmShowScheduleByDate"]["destinationbd-2"].value;
	var e = document.getElementById("departuredatebd2").value;
	var f = document.getElementById("arrivaldatebd2").value;
	if (c.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota asal");
		else
			alert("Please select departure city");*/
			
		b = false
	} else if (d.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else	
			alert("Please select return city");*/
			
		b = false
	} else if (e.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please select valid departure date");*/

		b = false
	} else if (f.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih tanggal kembali yang valid");
		else
			alert("Please select valid arrival date");*/
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota asal");
			else
				alert("Please select departure city");*/
			return false
		}
		if (!validateCityCode(d, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else	
				alert("Please select return city");*/
			return false
		}
	}
	return b
}
function validateShowScheduleByDateOW(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");
	var b = true;
	var c = document.forms["frmShowScheduleByDate"]["originbd-2"].value;
	var d = document.forms["frmShowScheduleByDate"]["destinationbd-2"].value;
	var e = document.getElementById("departuredatebd2").value;
	if (c.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota asal");
		else
			alert("Please select departure city");*/
			
		b = false
	} else if (d.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else
			alert("Please select return city");*/
		b = false
	} else if (e.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please select valid departure date");*/
			
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota asal");
			else
				alert("Please select departure city");*/
				
			return false
		}
		if (!validateCityCode(d, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else
				alert("Please select return city");*/
			return false
		}
	}
	return b
}

function processShowSchedule() {				
	/*
	if($("#ss-schedule1").hasClass( "active" ))
	{
		return processForm1();
	}
	else if($("#ss-schedule2").hasClass( "active" ))
		return processForm2();
	*/
	return processForm2();
	return false;
}

function processForm1()
{
	var formtest = document.getElementById('frmShowSchedule');
	
	if(validateShowSchedule(cities))
	{						
		var galocid = readCookie("galocid"); 
		var galangid = readCookie("galangid"); 
		//$.blockUI({ message: $('#loader'), showOverlay: true}); 
		$(".loader").show(); 
		var origin = $('#originbd-2').val(); 
		origin = origin.substring(origin.lastIndexOf('(')+1, origin.lastIndexOf(')')); 
		var dest = $('#destinationbd-2').val(); 
		dest = dest.substring(dest.lastIndexOf('(')+1, dest.lastIndexOf(')')); 
		var host = window.location.hostname; 
		var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_schedule_week.page?from=' + origin + '&to=' + dest + '&trip=' + $(				'input:radio[name=TypeOfJourney]:checked').val().toUpperCase(); 
		//var formtest = document.getElementById('frmShowSchedule'); 
		//$('input[id=iwPreActionSchedule]').val('callWSScheduleInfo'); 
		window.location = url; 
		return false; 

	}
	else
	{
		return false;
	}

	return false;	
	
}
function processForm2() {
	var galocid = readCookie("galocid"); 
	var galangid = readCookie("galangid"); 
	//var $TypeOfJourney = $("input[name='TypeOfJourney']").val();
	var $TypeOfJourney = $("input.flyingtriptypeSchedule:checked").val();
	if ($TypeOfJourney=="R")
	{
		if(validateShowScheduleByDate(cities))
		{				
			$(".loader").show();
			//var formtest = document.getElementById('frmShowScheduleByDate'); 
			//$('input[id=iwPreActionSchedule]').val('callWSScheduleInfoByDate'); 
			var origin = $('#originbd-2').val(); 
			origin = origin.substring(origin.lastIndexOf('(')+1, origin.lastIndexOf(')')); 
			var dest = $('#destinationbd-2').val(); 
			dest = dest.substring(dest.lastIndexOf('(')+1, dest.lastIndexOf(')')); 
			var deptDate = $('#departuredatebd2').val().split('/')[2] + '-' + $('#departuredatebd2').val().split('/')[1] + '-' + $('#departuredatebd2').val().split('/')[0]; 
			var arrDate = $('#arrivaldatebd2').val().split('/')[2] + '-' + $('#arrivaldatebd2').val().split('/')[1] + '-' + $('#arrivaldatebd2').val().split('/')[0]; 
			var host = window.location.hostname; 
			var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_schedule_date.page?from=' + origin + '&to=' + dest + '&trip=' + $('input:radio[name=TypeOfJourney]:checked').val().toUpperCase() + '&departdate=' + deptDate + '&returndate=' + arrDate; 
			//var formtest = document.getElementById('frmShowSchedule'); 
			//$('input[id=iwPreActionSchedule]').val('callWSScheduleInfo'); 
			window.location = url; 

			return false; 
		}
		else
		{
			return false;
		}
	}
	
	if ($TypeOfJourney=="O")
	{
		if(validateShowScheduleByDateOW(cities))
		{	
			$(".loader").show();
			//var formtest = document.getElementById('frmShowScheduleByDate'); 
			//$('input[id=iwPreActionSchedule]').val('callWSScheduleInfoByDate'); 
			var origin = $('#originbd-2').val(); 
			origin = origin.substring(origin.lastIndexOf('(')+1, origin.lastIndexOf(')')); 
			var dest = $('#destinationbd-2').val(); 
			dest = dest.substring(dest.lastIndexOf('(')+1, dest.lastIndexOf(')')); 
			var deptDate = $('#departuredatebd2').val().split('/')[2] + '-' + $('#departuredatebd2').val().split('/')[1] + '-' + $('#departuredatebd2').val().split('/')[0]; 
			var arrDate = $('#arrivaldatebd2').val().split('/')[2] + '-' + $('#arrivaldatebd2').val().split('/')[1] + '-' + $('#arrivaldatebd2').val().split('/')[0]; 
			var host = window.location.hostname; 
			var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_schedule_date.page?from=' + origin + '&to=' + dest + '&trip=' + $('input.flyingtriptypeSchedule:checked').val().toUpperCase() + '&departdate=' + deptDate; 
			window.location = url; 
			return false; 
		}
		else
		{
			return false;
		}
	}			
	
	return false;
}

function validateShowScheduleMobile(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");
	var b = true;
	var c = document.forms["frmShowScheduleByDateMobile"]["originbd-2-mobile"].value;
	var d = document.forms["frmShowScheduleByDateMobile"]["destinationbd-2-mobile"].value;
	
	if (c.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota asal");
		else
			alert("Please select departure city");*/
			
		b = false
	} else if (d.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else	
			alert("Please select return city");*/
			
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota asal");
			else
				alert("Please select departure city");*/
				
			return false
		}
		if (!validateCityCode(d, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else	
				alert("Please select return city");*/
				
			return false
		}
	}
	return b
}

function validateShowScheduleByDate(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");
	var b = true;
	var c = document.forms["frmShowScheduleByDate"]["originbd-2"].value;
	var d = document.forms["frmShowScheduleByDate"]["destinationbd-2"].value;
	var e = document.getElementById("departuredatebd2").value;
	var f = document.getElementById("arrivaldatebd2").value;
	if (c.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota asal");
		else
			alert("Please select departure city");*/
			
		b = false
	} else if (d.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else	
			alert("Please select return city");*/
			
		b = false
	} else if (e.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please select valid departure date");*/

		b = false
	} else if (f.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih tanggal kembali yang valid");
		else
			alert("Please select valid arrival date");*/
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota asal");
			else
				alert("Please select departure city");*/
			return false
		}
		if (!validateCityCode(d, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else	
				alert("Please select return city");*/
			return false
		}
	}
	return b
}
function validateShowScheduleByDateOW(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");
	var b = true;
	var c = document.forms["frmShowScheduleByDate"]["originbd-2"].value;
	var d = document.forms["frmShowScheduleByDate"]["destinationbd-2"].value;
	var e = document.getElementById("departuredatebd2").value;
	if (c.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota asal");
		else
			alert("Please select departure city");*/
			
		b = false
	} else if (d.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else
			alert("Please select return city");*/
		b = false
	} else if (e.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please select valid departure date");*/
			
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota asal");
			else
				alert("Please select departure city");*/
				
			return false
		}
		if (!validateCityCode(d, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else
				alert("Please select return city");*/
			return false
		}
	}
	return b
}

function validateShowScheduleByDateMobile(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");
	var b = true;
	var c = document.forms["frmShowScheduleByDateMobile"]["originbd-2-mobile"].value;
	var d = document.forms["frmShowScheduleByDateMobile"]["destinationbd-2-mobile"].value;
	var e = document.getElementById("departuredatebd2-mobile").value;
	var f = document.getElementById("arrivaldatebd2-mobile").value;
	if (c.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota asal");
		else
			alert("Please select departure city");*/
			
		b = false
	} else if (d.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else	
			alert("Please select return city");*/
			
		b = false
	} else if (e.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please select valid departure date");*/

		b = false
	} else if (f.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih tanggal kembali yang valid");
		else
			alert("Please select valid arrival date");*/
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota asal");
			else
				alert("Please select departure city");*/
			return false
		}
		if (!validateCityCode(d, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else	
				alert("Please select return city");*/
			return false
		}
	}
	return b
}
function validateShowScheduleByDateOWMobile(a) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");
	var b = true;
	var c = document.forms["frmShowScheduleByDateMobile"]["originbd-2-mobile"].value;
	var d = document.forms["frmShowScheduleByDateMobile"]["destinationbd-2-mobile"].value;
	var e = document.getElementById("departuredatebd2-mobile").value;
	if (c.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota asal");
		else
			alert("Please select departure city");*/
			
		b = false
	} else if (d.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih kota tujuan");
		else
			alert("Please select return city");*/
		b = false
	} else if (e.length < 1) {
		/*if(galangid=="id")
			alert("Silahkan pilih tanggal keberangkatan yang valid");
		else
			alert("Please select valid departure date");*/
			
		b = false
	} else {
		b = true
	}
	if (b) {
		if (!validateCityCode(c, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota asal");
			else
				alert("Please select departure city");*/
				
			return false
		}
		if (!validateCityCode(d, a)) {
			/*if(galangid=="id")
				alert("Silahkan pilih kota tujuan");
			else
				alert("Please select return city");*/
			return false
		}
	}
	return b
}

function processShowScheduleMobile() {				
	/*
	if($("#ss-schedule1-mobile").hasClass( "active" ))
	{
		return processForm1Mobile();
	}
	else if($("#ss-schedule2-mobile").hasClass( "active" ))
		return processForm2Mobile();
	*/
	return processForm2Mobile();
	return false;
}

function processForm1Mobile()
{
	var formtest = document.getElementById('frmShowSchedule');
	if(validateShowScheduleMobile(cities))
	{						
		var galocid = readCookie("galocid"); 
		var galangid = readCookie("galangid"); 
		//$.blockUI({ message: $('#loader'), showOverlay: true}); 
		$(".loader").show(); 
		var origin = $('#originbd-2-mobile').val(); 
		origin = origin.substring(origin.lastIndexOf('(')+1, origin.lastIndexOf(')')); 
		var dest = $('#destinationbd-2-mobile').val(); 
		dest = dest.substring(dest.lastIndexOf('(')+1, dest.lastIndexOf(')')); 
		var host = window.location.hostname; 
		var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_schedule_week.page?from=' + origin + '&to=' + dest + '&trip=' + $(				'input:radio[name=TypeOfJourney]:checked').val().toUpperCase(); 
		//var formtest = document.getElementById('frmShowSchedule'); 
		//$('input[id=iwPreActionSchedule]').val('callWSScheduleInfo'); 
		window.location = url; 
		return false; 

	}
	else
	{
		return false;
	}

	return false;	
	
}
function processForm2Mobile() {
	var galocid = readCookie("galocid"); 
	var galangid = readCookie("galangid"); 
	//var $TypeOfJourney = $("input.TypeOfJourneyMobile:checked").val();	
	var $TypeOfJourney = $("input.flyingtriptypeSchedule-mobile:checked").val();
	
	if ($TypeOfJourney=="R")
	{
		if(validateShowScheduleByDateMobile(cities))
		{				
			$(".loader").show();
			//var formtest = document.getElementById('frmShowScheduleByDate'); 
			//$('input[id=iwPreActionSchedule]').val('callWSScheduleInfoByDate'); 
			var origin = $('#originbd-2-mobile').val(); 
			origin = origin.substring(origin.lastIndexOf('(')+1, origin.lastIndexOf(')')); 
			var dest = $('#destinationbd-2-mobile').val(); 
			dest = dest.substring(dest.lastIndexOf('(')+1, dest.lastIndexOf(')')); 
			var deptDate = $('#departuredatebd2-mobile').val().split('/')[2] + '-' + $('#departuredatebd2-mobile').val().split('/')[1] + '-' + $('#departuredatebd2-mobile').val().split('/')[0]; 
			var arrDate = $('#arrivaldatebd2-mobile').val().split('/')[2] + '-' + $('#arrivaldatebd2-mobile').val().split('/')[1] + '-' + $('#arrivaldatebd2-mobile').val().split('/')[0]; 
			var host = window.location.hostname; 
			var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_schedule_date.page?from=' + origin + '&to=' + dest + '&trip=' + $('input.TypeOfJourneyMobile:checked').val().toUpperCase() + '&departdate=' + deptDate + '&returndate=' + arrDate; 
			//var formtest = document.getElementById('frmShowSchedule'); 
			//$('input[id=iwPreActionSchedule]').val('callWSScheduleInfo'); 
			window.location = url; 

			return false; 
		}
		else
		{
			return false;
		}
	}
	
	if ($TypeOfJourney=="O")
	{
		if(validateShowScheduleByDateOWMobile(cities))
		{	
			$(".loader").show();
			//var formtest = document.getElementById('frmShowScheduleByDate'); 
			//$('input[id=iwPreActionSchedule]').val('callWSScheduleInfoByDate'); 
			var origin = $('#originbd-2-mobile').val(); 
			origin = origin.substring(origin.lastIndexOf('(')+1, origin.lastIndexOf(')')); 
			var dest = $('#destinationbd-2-mobile').val(); 
			dest = dest.substring(dest.lastIndexOf('(')+1, dest.lastIndexOf(')')); 
			var deptDate = $('#departuredatebd2-mobile').val().split('/')[2] + '-' + $('#departuredatebd2-mobile').val().split('/')[1] + '-' + $('#departuredatebd2-mobile').val().split('/')[0]; 
			var arrDate = $('#arrivaldatebd2-mobile').val().split('/')[2] + '-' + $('#arrivaldatebd2-mobile').val().split('/')[1] + '-' + $('#arrivaldatebd2-mobile').val().split('/')[0]; 
			var host = window.location.hostname; 
			var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_schedule_date.page?from=' + origin + '&to=' + dest + '&trip=' + $('input.TypeOfJourneyMobile:checked').val().toUpperCase() + '&departdate=' + deptDate; 
			window.location = url; 
			return false; 
		}
		else
		{
			return false;
		}
	}			
	
	return false;
}

function departureProcess(){
	$('input[name=arrivaldeparture]').val('departure');													
}
function arrivalProcess(){
	$('input[name=arrivaldeparture]').val('arrival');									
}

function departureProcessMobile(){
	$('input#arrivaldeparturemobile').val('departure');													
}
function arrivalProcessMobile(){
	$('input#arrivaldeparturemobile').val('arrival');									
}

function checkFlightProcess() {
	
	var arrivaldepartureCity = $("input#select-city").val();
	var desV = $("#formDepartureArrival #select-city").val();
	var desSplit = desV.split(", ");
		
	var des = desSplit[0].substring(0, desSplit[0].indexOf("(")) + " ("+ desSplit[1].substring(0, desSplit[1].indexOf(" ("))+")";
	var desCo = desSplit[1].substring(desSplit[1].indexOf("(")+1, desSplit[1].indexOf(")"));

	var arrivaldeparture=document.forms['formDepartureArrival']['arrivaldeparture'].value;
	var galocid = readCookie("galocid");
	var galangid = readCookie("galangid");
	
	if (!(arrivaldepartureCity==""))
	{
		$(".loader").show();
		var form=document.getElementById('formDepartureArrival');
		if (arrivaldeparture=="arrival")
		{
			//$('input[name=iwPreActions]').val('callWSArrivalInfo');									
			var host = window.location.hostname;
			var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_arrival_info.page?airportCode=' + desCo;
			window.location = url;
		}
		if (arrivaldeparture=="departure")
		{
			//$('input[name=iwPreActions]').val('callWSDepartureInfo');												
			var host = window.location.hostname;
			var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_departure_info.page?airportCode=' + desCo;
			window.location = url;
		}
		return false;
	}
	else
	{
		if (arrivaldeparture=="arrival")
		{
			//alert('Arrival');					
		}
		if (arrivaldeparture=="departure")
		{
			//alert('Departure');					
		}
		return false;
	}
}

function checkFlightProcessMobile() {
	
	var arrivaldepartureCity = $("input#select-city-mobile option:selected").val();
	var desV = $("#formDepartureArrival-mobile #select-city-mobile").val();
	var desSplit = desV.split(", ");
		
	var des = desSplit[0].substring(0, desSplit[0].indexOf("(")) + " ("+ desSplit[1].substring(0, desSplit[1].indexOf(" ("))+")";
	var desCo = desSplit[1].substring(desSplit[1].indexOf("(")+1, desSplit[1].indexOf(")"));
	
	var arrivaldeparture=document.forms['formDepartureArrival-mobile']['arrivaldeparturemobile'].value;
	var galocid = readCookie("galocid");
	var galangid = readCookie("galangid");
	
	if (!(arrivaldepartureCity==""))
	{
		$(".loader").show();
		var form=document.getElementById('formDepartureArrival-mobile');
		if (arrivaldeparture=="arrival")
		{
			//$('input[name=iwPreActions]').val('callWSArrivalInfo');									
			var host = window.location.hostname;
			var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_arrival_info.page?airportCode=' + desCo;
			window.location = url;
		}
		if (arrivaldeparture=="departure")
		{
			//$('input[name=iwPreActions]').val('callWSDepartureInfo');												
			var host = window.location.hostname;
			var url = 'https://' + host + '/' + galocid + '/' + galangid + '/web-service-form/flight_departure_info.page?airportCode=' + desCo;
			window.location = url;
		}
		return false;
	}
	else
	{
		if (arrivaldeparture=="arrival")
		{
			//alert('Arrival');					
		}
		if (arrivaldeparture=="departure")
		{
			//alert('Departure');					
		}
		return false;
	}
}

function isRowValid(a, b, c, d) {
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");

	var e = true;
	var f = d + 1;
	if (a.length > 0) {
		if (b.length < 1) {
			if(galangid=="id")
				alert("Kota keberangkatan salah, baris : " + f);
			else
				alert("Wrong departure city, row : " + f);
			e = false
		} else if (c.length < 1) {
			if(galangid=="id")
				alert("Kota tujuan salah, baris : " + f);
			else
				alert("Wrong arrival city, row : " + f);

			e = false
		} else {
			if (a == b) {
				if(galangid=="id")
					alert("Kota tujuan dan keberangkatan tidak boleh sama (baris:" + f + ")");
				else
					alert("Departure city and arrival city must not be the same (row:" + f + ")");

				return false
			}
		}
	} else if (b.length > 0) {
		if (a.length < 1) {
			if(galangid=="id")
				alert("Kota keberangkatan salah, baris : " + f);
			else
				alert("Wrong departure city, row : " + f);

			e = false
		}
		if (c.length < 1) {
			if(galangid=="id")
				alert("Kota tujuan salah, baris : " + f);
			else
				alert("Wrong arrival city, row : " + f);

			e = false
		}
		if (a == b) {
			if(galangid=="id")
				alert("Kota tujuan dan keberangkatan tidak boleh sama (baris:" + f + ")");
			else
				alert("Departure city and arrival city must not be the same (row:" + f + ")");

			return false
		}
	} else if (c.length > 0) {
		if (a.length < 1) {
			if(galangid=="id")
				alert("Kota keberangkatan salah, baris : " + f);
			else
				alert("Wrong departure city, row : " + f);

			e = false
		}
		if (b.length < 1) {
			if(galangid=="id")
				alert("Kota tujuan salah, baris : " + f);
			else
				alert("Wrong arrival city, row : " + f);

			e = false
		}
		if (a == b) {
			if(galangid=="id")
				alert("Kota tujuan dan keberangkatan tidak boleh sama (baris:" + f + ")");
			else
				alert("Departure city and arrival city must not be the same (row:" + f + ")");

			return false
		}
	} else {
		e = false
	}
	return e
}

$(document)
		.ready(
				function() {
					var currUrl = window.location.href;
					if(currUrl.indexOf("https://www.garuda-indonesia.com/jp/en/special-offers/sales-promotion/corporate-gotanda-denshi.page") > -1){
						$('#originairportcode').click();
						setTimeout(function (){
							$("#NRT").click();
						},200);
					}
					//lang bidupgrade
					/*if(window.location.href.indexOf('bid-upgrade')>0){
					var lang = document.forms['formManageBooking']['lang'].value;
					document.forms['formManageBookingbid']['lang'].value = lang;
					}*/
					/*
                                        setTimeout(function(){
						$('.select-pax').parent().css('width','48%');
						$('.select-pax').parent().css('margin','1%');
					}, 3000);*/
                                        //redemption button width
					//$('#btnShowSchedule').css('width',parseInt($('a#btnSearchFlightRedeem').css('width').substring(0,3))+parseInt($('#btnSearchFlight').css('width').substring(0,3))+10);

					//font size for site NL
					if(getCookie("galangid") == "nl")
						$('.btn-primary').css('font-size', '12px');
					
					//Default Economy
					$("#pick-class").val("E");
					$("#pick-class").click();
					if(membertypelogin != ""){
						if(membertypelogin.indexOf("GFF")>-1){
							$("#nav-menu-normal").hide();
							$("#nav-menu-garudamiles").show();
						}
					}	
					
					if(membertypelogin == ""){
						
							//$("a#btnSearchFlightRedeem").hide();
							$("#btnShowSchedule").show();
					}
					
					$(".typetrip").click(function(){
						var texttes = $(this).attr("id");
						//alert(texttes);

						if(membertypelogin != ""){
							if(membertypelogin =="IBE"){
								if(texttes=="returntrip"){
									$("#flight-div").show();
									$("#TRIP_TYPE").val("R");
									$(".return").show();
									$(".date-input").addClass("block-grid-2");
									$("#divRoute1").removeClass("multi-city-route");
									$("#divRoute1 fieldset:first").removeClass("m-all-0");
									$("#divRoute2").hide();
									$("#divRoute2 fieldset:first").removeClass("m-all-0");
									$("#divRoute3").hide();
									$("#divRoute3 fieldset:first").removeClass("m-all-0");
									$("#divRoute4").hide();
									$("#divRoute4 fieldset:first").removeClass("m-all-0");
									$("#divRoute5").hide();
									$("#divRoute5 fieldset:first").removeClass("m-all-0");
									$("#divRoute6").hide();
									$("#divRoute6 fieldset:first").removeClass("m-all-0");
									
									$("#divRoute1 .return").show();
									
									//$('#pick-airline').parent().show();
									
									//if($('#pick-airline').val() == "GA"){
										$("a#btnSearchFlightRedeem").hide();
										$("#btnShowSchedule").show();
									//}
									var validator = $( "#searchflightform" ).validate();
									validator.resetForm();
									
								}
								if(texttes=="oneway"){
									$("#flight-div").show();
									$("#TRIP_TYPE").val("O");
									$(".date-input").removeClass("block-grid-2");
									$("#divRoute1").removeClass("multi-city-route");
									$("#divRoute1 fieldset:first").removeClass("m-all-0");
									$("#divRoute2").hide();
									$("#divRoute2 fieldset:first").removeClass("m-all-0");
									$("#divRoute3").hide();
									$("#divRoute3 fieldset:first").removeClass("m-all-0");
									$("#divRoute4").hide();
									$("#divRoute4 fieldset:first").removeClass("m-all-0");
									$("#divRoute5").hide();
									$("#divRoute5 fieldset:first").removeClass("m-all-0");
									$("#divRoute6").hide();
									$("#divRoute6 fieldset:first").removeClass("m-all-0");
									
									$("#divRoute1 .return").hide();
									
									//$('#pick-airline').parent().show();
									
									//if($('#pick-airline').val() == "GA"){
										$("a#btnSearchFlightRedeem").show();
										$("#btnShowSchedule").show();
									//}
									var validator = $( "#searchflightform" ).validate();
									validator.resetForm();
								}
								if(texttes=="multicity"){
									$("#flight-div").hide();
									$("#TRIP_TYPE").val("M");
									$(".date-input").removeClass("block-grid-2");
									$("#divRoute1").addClass("multi-city-route");
									$("#divRoute1 fieldset:first").addClass("m-all-0");
									$("#divRoute2").show();
									$("#divRoute2 fieldset:first").addClass("m-all-0");
									$("#divRoute3").hide();
									$("#divRoute3 fieldset:first").addClass("m-all-0");
									$("#divRoute4").hide();
									$("#divRoute4 fieldset:first").addClass("m-all-0");
									$("#divRoute5").hide();
									$("#divRoute5 fieldset:first").addClass("m-all-0");
									$("#divRoute6").hide();
									$("#divRoute6 fieldset:first").addClass("m-all-0");
									
									$("#divRoute1 .return").hide();
									
									//$('#pick-airline').parent().hide();
									
									$("a#btnSearchFlightRedeem").hide();
									$("#btnShowSchedule").hide();
									var validator = $( "#searchflightform" ).validate();
									validator.resetForm();
								}
							}
							if(membertypelogin !="IBE"){
								if(texttes=="returntrip"){
									$("#flight-div").show();
									$("#TRIP_TYPE").val("R");
									$(".return").show();
									$(".date-input").addClass("block-grid-2");
									$("#divRoute1").removeClass("multi-city-route");
									$("#divRoute1 fieldset:first").removeClass("m-all-0");
									$("#divRoute2").hide();
									$("#divRoute2 fieldset:first").removeClass("m-all-0");
									$("#divRoute3").hide();
									$("#divRoute3 fieldset:first").removeClass("m-all-0");
									$("#divRoute4").hide();
									$("#divRoute4 fieldset:first").removeClass("m-all-0");
									$("#divRoute5").hide();
									$("#divRoute5 fieldset:first").removeClass("m-all-0");
									$("#divRoute6").hide();
									$("#divRoute6 fieldset:first").removeClass("m-all-0");
									
									$("#divRoute1 .return").show();
									
									//$('#pick-airline').parent().show();
									
									//if($('#pick-airline').val() == "GA"){
										$("a#btnSearchFlightRedeem").show();
										$("#btnShowSchedule").show();
									//}
									var validator = $( "#searchflightform" ).validate();
									validator.resetForm();
								}
								if(texttes=="oneway"){
									$("#flight-div").show();
									$("#TRIP_TYPE").val("O");
									$(".date-input").removeClass("block-grid-2");
									$("#divRoute1").removeClass("multi-city-route");
									$("#divRoute1 fieldset:first").removeClass("m-all-0");
									$("#divRoute2").hide();
									$("#divRoute2 fieldset:first").removeClass("m-all-0");
									$("#divRoute3").hide();
									$("#divRoute3 fieldset:first").removeClass("m-all-0");
									$("#divRoute4").hide();
									$("#divRoute4 fieldset:first").removeClass("m-all-0");
									$("#divRoute5").hide();
									$("#divRoute5 fieldset:first").removeClass("m-all-0");
									$("#divRoute6").hide();
									$("#divRoute6 fieldset:first").removeClass("m-all-0");
									
									$("#divRoute1 .return").hide();
									
									//$('#pick-airline').parent().show();
									
									//if($('#pick-airline').val() == "GA"){
										$("a#btnSearchFlightRedeem").show();
										$("#btnShowSchedule").show();
									//}
									var validator = $( "#searchflightform" ).validate();
									validator.resetForm();
								}
								if(texttes=="multicity"){
									$("#flight-div").hide();
									$("#TRIP_TYPE").val("M");
									$(".date-input").removeClass("block-grid-2");
									$("#divRoute1").addClass("multi-city-route");
									$("#divRoute1 fieldset:first").addClass("m-all-0");
									$("#divRoute2").show();
									$("#divRoute2 fieldset:first").addClass("m-all-0");
									$("#divRoute3").hide();
									$("#divRoute3 fieldset:first").addClass("m-all-0");
									$("#divRoute4").hide();
									$("#divRoute4 fieldset:first").addClass("m-all-0");
									$("#divRoute5").hide();
									$("#divRoute5 fieldset:first").addClass("m-all-0");
									$("#divRoute6").hide();
									$("#divRoute6 fieldset:first").addClass("m-all-0");
									
									$("#divRoute1 .return").hide();
									
									//$('#pick-airline').parent().hide();
									
									$("a#btnSearchFlightRedeem").hide();
									$("#btnShowSchedule").hide();
									var validator = $( "#searchflightform" ).validate();
									validator.resetForm();
								}
							}
						}
						if(membertypelogin == ""){
							if(texttes=="returntrip"){
									$("#flight-div").show();
									$("#TRIP_TYPE").val("R");
									$(".return").show();
									$(".date-input").addClass("block-grid-2");
									$("#divRoute1").removeClass("multi-city-route");
									$("#divRoute1 fieldset:first").removeClass("m-all-0");
									$("#divRoute2").hide();
									$("#divRoute2 fieldset:first").removeClass("m-all-0");
									$("#divRoute3").hide();
									$("#divRoute3 fieldset:first").removeClass("m-all-0");
									$("#divRoute4").hide();
									$("#divRoute4 fieldset:first").removeClass("m-all-0");
									$("#divRoute5").hide();
									$("#divRoute5 fieldset:first").removeClass("m-all-0");
									$("#divRoute6").hide();
									$("#divRoute6 fieldset:first").removeClass("m-all-0");
									
									$("#divRoute1 .return").show();
									
									//$('#pick-airline').parent().show();
									
									//if($('#pick-airline').val() == "GA"){
										$("a#btnSearchFlightRedeem").show();
										$("#btnShowSchedule").show();
									//}
									var validator = $( "#searchflightform" ).validate();
									validator.resetForm();
								}
								if(texttes=="oneway"){
									$("#flight-div").show();
									$("#TRIP_TYPE").val("O");
									$(".date-input").removeClass("block-grid-2");
									$("#divRoute1").removeClass("multi-city-route");
									$("#divRoute1 fieldset:first").removeClass("m-all-0");
									$("#divRoute2").hide();
									$("#divRoute2 fieldset:first").removeClass("m-all-0");
									$("#divRoute3").hide();
									$("#divRoute3 fieldset:first").removeClass("m-all-0");
									$("#divRoute4").hide();
									$("#divRoute4 fieldset:first").removeClass("m-all-0");
									$("#divRoute5").hide();
									$("#divRoute5 fieldset:first").removeClass("m-all-0");
									$("#divRoute6").hide();
									$("#divRoute6 fieldset:first").removeClass("m-all-0");
									
									$("#divRoute1 .return").hide();
									
									//$('#pick-airline').parent().show();
									
									//if($('#pick-airline').val() == "GA"){
										$("a#btnSearchFlightRedeem").show();
										$("#btnShowSchedule").show();
									//}
									var validator = $( "#searchflightform" ).validate();
									validator.resetForm();
								}
								if(texttes=="multicity"){
									$("#flight-div").hide();
									$("#TRIP_TYPE").val("M");
									$(".date-input").removeClass("block-grid-2");
									$("#divRoute1").addClass("multi-city-route");
									$("#divRoute1 fieldset:first").addClass("m-all-0");
									$("#divRoute2").show();
									$("#divRoute2 fieldset:first").addClass("m-all-0");
									$("#divRoute3").hide();
									$("#divRoute3 fieldset:first").addClass("m-all-0");
									$("#divRoute4").hide();
									$("#divRoute4 fieldset:first").addClass("m-all-0");
									$("#divRoute5").hide();
									$("#divRoute5 fieldset:first").addClass("m-all-0");
									$("#divRoute6").hide();
									$("#divRoute6 fieldset:first").addClass("m-all-0");
									
									$("#divRoute1 .return").hide();
									
									//$('#pick-airline').parent().hide();
									
									$("a#btnSearchFlightRedeem").hide();
									$("#btnShowSchedule").hide();
									var validator = $( "#searchflightform" ).validate();
									validator.resetForm();
								}
						}
						
					});
					/*				
					$(".typeschedule").click(function(){
						if($(this).attr('id') == "ss-schedule1")
						{
							$(this).addClass("active");
							$("#ss-schedule2").removeClass("active");
							
							$(".inputDate2").hide();
							
							
						}
						else
						{
							$(this).addClass("active");
							$("#ss-schedule1").removeClass("active");
							
							$(".inputDate2").show();
							
						}
						
					});
					
					$(".typeschedule-mobile").click(function(){
						if($(this).attr('id') == "ss-schedule1-mobile")
						{
							$(this).addClass("active");
							$("#ss-schedule2-mobile").removeClass("active");
							
							$(".inputDate2").hide();
							
							
						}
						else
						{
							$(this).addClass("active");
							$("#ss-schedule1-mobile").removeClass("active");
							
							$(".inputDate2").show();
							
						}
						
					});
					*/
					var lastOri = getCookie('lsf');
					var lastDest = getCookie('lst');
					var lastTType = getCookie('lstt');
					var lastAdult = getCookie('lsadt');
					var lastChild = getCookie('lschd');
					var lastInfant = getCookie('lsinf');
					var lastDepart = getCookie('lsdd');
					var lastArrive = getCookie('lsad');
					var lastCabin = getCookie('lsc');
					var currentForm = $('input#originairportcode').parents('form:visible');
					
					setTimeout(function(){
						$("#schedule-oneway").parent().addClass("checked");
						
						var tempNL = window.location.href;	
						
						if(lastTType!=null){
							if(lastTType=="oneway" || lastTType=="radioOW"){
								currentForm.find($('input[name="trip"][value="O"]')).prop('checked', true);
								currentForm.find($('input[name="trip"][value="O"]')).change();
							}else{
								currentForm.find($('input[name="trip"][value="R"]')).prop('checked', true);
								currentForm.find($('input[name="trip"][value="R"]')).change();
							}
						}else{
							if(tempNL.indexOf("/nl/")>0 || tempNL.indexOf("/sg/")>0 || tempNL.indexOf("/my/")>0 
							|| tempNL.indexOf("/th/")>0 || tempNL.indexOf("/au/")>0 || tempNL.indexOf("/jp/")>0 
							|| tempNL.indexOf("/cn/")>0 || tempNL.indexOf("/kr/")>0 || tempNL.indexOf("/hk/")>0 
							|| tempNL.indexOf("/sa/")>0){
								currentForm.find($('input[name="trip"][value="R"]')).prop('checked', true);
								currentForm.find($('input[name="trip"][value="R"]')).change();
							}
							else
							{
								currentForm.find($('input[name="trip"][value="O"]')).prop('checked', true);
								currentForm.find($('input[name="trip"][value="O"]')).change();
							}
						}
						$("#schedule-oneway").click();
						

						if(lastAdult!=null){
							currentForm.find('input[name="guestTypes[0].amount"]').val(lastAdult);
							currentForm.find('input[name="guestTypes[1].amount"]').val(lastChild);
							currentForm.find('input[name="guestTypes[2].amount"]').val(lastInfant);
						}

						if(lastDepart!=null)
							currentForm.find('input[id$="departuredate"]').val(lastDepart);

						if(lastArrive!=null)
							currentForm.find('input[id$="arrivaldate"]').val(lastArrive);

						if(lastCabin!=null){
							if(lastCabin=="F"){
								if(currentForm.find("#cabindesk option[value=" + 'F' + "]").attr("disabled")==undefined){
									currentForm.find('select#cabindesk').val(lastCabin);
								}
							}else{
								currentForm.find('select#cabindesk').val(lastCabin);
							}
							currentForm.find('select#cabindesk').change();
						}


						//auto select origin
						if(tempNL.indexOf("/id/")>0 || tempNL.indexOf("/other-countries/")>0){
							setDefaultOrigin('CGK', lastOri, lastDest);
						}else if(tempNL.indexOf("/sg/")>0){
							setDefaultOrigin('SIN', lastOri, lastDest);
						}else if(tempNL.indexOf("/my/")>0){
							setDefaultOrigin('KUL', lastOri, lastDest);
						}else if(tempNL.indexOf("/th/")>0){
							setDefaultOrigin('BKK', lastOri, lastDest);
						}else if(tempNL.indexOf("/au/")>0){
							setDefaultOrigin('PER', lastOri, lastDest);
						}else if(tempNL.indexOf("/jp/")>0){
							setDefaultOrigin('HND', lastOri, lastDest);
						}else if(tempNL.indexOf("/cn/")>0){
							setDefaultOrigin('PVG', lastOri, lastDest);
						}else if(tempNL.indexOf("/kr/")>0){
							setDefaultOrigin('ICN', lastOri, lastDest);
						}else if(tempNL.indexOf("/hk/")>0){
							setDefaultOrigin('HKG', lastOri, lastDest);
						}else if(tempNL.indexOf("/nl/")>0){
							setDefaultOrigin('AMS', lastOri, lastDest);
						}else if(tempNL.indexOf("/uk/")>0){
							setDefaultOrigin('LHR', lastOri, lastDest);
						}else if(tempNL.indexOf("/sa/")>0){
							setDefaultOrigin('JED', lastOri, lastDest);
						}
					},10);

					$("#schedule-oneway").click();
					/*
					$("input[name='TypeOfJourney']").click(function(){
						if($(this).attr("id") == "schedule-return")
						{
							$(this).val("r");
						}
						else if($(this).attr("id") == "schedule-oneway")
						{
							$(this).val("o");
						}
						if($(this).val() == "o")
						{
							$("#arrivaldatebd2").val("");
							$("#frmShowScheduleByDate .return").hide();
							$(".inputDate2").removeClass("block-grid-2");
							$("input[name='TypeOfJourney']").val("o");
							
						}
						else
						{
							$("#arrivaldatebd2").val("");
							$("#frmShowScheduleByDate .return").show();
							$(".inputDate2").addClass("block-grid-2");
							$("input[name='TypeOfJourney']").val("r");

						}
						
					});
					*/
					//Start modif by Albert
					$(".flyingtriptypeSchedule-mobile").click(function (){
						var thisVar = $(this).val();
						if(thisVar == "O"){
							$("#schedule-oneway-mobile").click();
						}
						else if(thisVar == "R"){
							$("#schedule-return-mobile").click();
						}
					});
					
					$(".flyingtriptypeSchedule-mobile").click(function (){
						var thisVar = $(this).val();
						if(thisVar == "O"){
							$("#frmShowScheduleByDate #schedule-oneway").click();
						}
						else if(thisVar == "R"){
							$("#frmShowScheduleByDate #schedule-return").click();
						}
					});
					
					function popuplateShowSchedule(){
						$("a#ss-schedule2").click();
						if($("#TRIP_TYPE_SCHEDULE").val()=="O"){
							$("#schedule-oneway").click();	
						}
						if($("#TRIP_TYPE_SCHEDULE").val()=="R"){
							$("#schedule-return").click();	
						}
						//alert("popuplateShowSchedule");
						$("#originbd-2").val($("#showSchedule #originairportcode").val());
						$("#destinationbd-2").val($("#showSchedule #destairportcode").val());
						$("#departuredatebd2").val($("#showSchedule #departuredateSchedule").val());
						$("#arrivaldatebd2").val($("#showSchedule #arrivaldateSchedule").val());
						$( "input[name='submitQSByDate']" ).click();						
					}
					
					function popuplateShowScheduleMobile(){
						$("a#ss-schedule2-mobile").click();
						if($("#TRIP_TYPE_SCHEDULE_MOBILE").val()=="O"){
							$("#schedule-oneway-mobile").click();	
						}
						if($("#TRIP_TYPE_SCHEDULE_MOBILE").val()=="R"){
							$("#schedule-return-mobile").click();	
						}
						
						$("#originbd-2-mobile").val($("#showSchedule-mobile #originairportcode-mobile").val());
						$("#destinationbd-2-mobile").val($("#showSchedule-mobile #destairportcode-mobile").val());
						$("#departuredatebd2-mobile").val($("#showSchedule-mobile #departuredateSchedule-mobile").val());
						$("#arrivaldatebd2-mobile").val($("#showSchedule-mobile #arrivaldateSchedule-mobile").val());
						$( "input#submitQSByDate-mobile" ).click();						
					}

					/*$("#btnSearchFlight").click(function(e){
						$("#bookingType").val("IBE");
						$("#searchflightform").submit();
						
						//processIBE();
					});*/
					$("a#btnSearchFlightRedeem").click(function(e){
						//garudamiles login form
						/*$.fancybox(
							{
								href: '#garudamiles-login-popup',
								height: 208,
								fitToView: false,
								autoSize: false,
								width: 350,
								padding : 0
							}
						);*/
						$("#bookingType").val("REDEEM");
						var currentForm = $('.flight_search_typeahead_from').parents('form:visible');
						currentForm.submit();
						
						//processIBE();
					});
					$("#btnShowSchedule").click(function(e){
						$("#bookingTypeSchedule").val("SHOWSCHEDULE");
						$("#showSchedule").submit();
						//alert("btnShowSchedule");
						
						//processIBE();
					});
					
					$("#btnShowSchedule-mobile").click(function(e){
						$("#bookingTypeSchedule-mobile").val("SHOWSCHEDULE");
						$("#showSchedule-mobile").submit();
						//alert("btnShowSchedule");
						
						//processIBE();
					});
					
					$("#submitManageStatusMobile").click(function(e){
						$("#formManageBookingMobile").submit();
					});
					
					$("#submitManageStatus").click(function(e){
						$("#formManageBooking").submit();
					});
					
					/*$("#submitManageStatusbid").click(function(e){
						$("#formManageBookingbid").submit();
					});*/
					
					$("#btnContinueCheckIn").click(function(e){
						//alert("testZ");
						$("#continueCheckIn").submit();
						
					});
					
					$("#btnContinueCheckInmobile").click(function(e){
						//alert("testZ");
						$("#continueCheckInMobile").submit();
						
					});

					$("#continueCheckIn").validate({              
						rules: {
						 noticecheckin	:{required:true}
						},
						submitHandler: function(form){
						  continuecheckin();
					   	}				  
					  });
					  
					  $("#continueCheckInMobile").validate({              
						rules: {
						 noticecheckin	:{required:true}
						},
						submitHandler: function(form){
						  continuecheckin();
					   	}				  
					  });
					  
					$("#showSchedule").validate({              
						rules: {
							originairportcode		:{required:true, minlength:1},
							destairportcode		:{required:true, minlength:1},
							BOOKING_DATE_TIME_1		:{required:true},
							BOOKING_DATE_TIME_2		:{required:true, date:false}
						},
						highlight: function(element, errorClass) {
							
							if ($(element).attr("name") == "originairportcode" ){
								//error.insertAfter("#searchflightform #cityfrom");
								$("#showSchedule #cityfrom").addClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "destairportcode" ){
								//error.insertAfter("#searchflightform #cityto");
								$("#showSchedule #cityto").addClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_1" ){
								//error.insertAfter("#searchflightform #depart_date");
								$("#showSchedule #depart_date").addClass("errorVaildate");								
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_2" ){
								//error.insertAfter("#searchflightform #return_date");
								$("#showSchedule #return_date_schedule").addClass("errorVaildate");								
							}
							
						},
						unhighlight: function(element, errorClass) {
							
							if ($(element).attr("name") == "originairportcode" ){
								//error.insertAfter("#searchflightform #cityfrom");
								$("#showSchedule #cityfrom").removeClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "destairportcode" ){
								//error.insertAfter("#searchflightform #cityto");
								$("#showSchedule #cityto").removeClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_1" ){
								//error.insertAfter("#searchflightform #depart_date");
								$("#showSchedule #depart_date").removeClass("errorVaildate");								
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_2" ){
								//error.insertAfter("#searchflightform #return_date");
								$("#showSchedule #return_date_schedule").removeClass("errorVaildate");								
							}
							
						},
						submitHandler: function(form){							
							if($("#bookingTypeSchedule").val()=="SHOWSCHEDULE"){
							  popuplateShowSchedule();
							  //alert("btnShowSchedulePass");
							}						  
					   	}				  
					});
					
					$("#showSchedule-mobile").validate({              
						rules: {
							originairportcode		:{required:true, minlength:1},
							destairportcode		:{required:true, minlength:1},
							BOOKING_DATE_TIME_1		:{required:true},
							BOOKING_DATE_TIME_2		:{required:true, date:false}
						},
						highlight: function(element, errorClass) {
							
							if ($(element).attr("name") == "originairportcode" ){
								//error.insertAfter("#searchflightform #cityfrom");
								$("#showSchedule-mobile #cityfrom").addClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "destairportcode" ){
								//error.insertAfter("#searchflightform #cityto");
								$("#showSchedule-mobile #cityto").addClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_1" ){
								//error.insertAfter("#searchflightform #depart_date");
								$("#showSchedule-mobile #depart_date").addClass("errorVaildate");								
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_2" ){
								//error.insertAfter("#searchflightform #return_date");
								$("#showSchedule-mobile #return_date_schedule_mobile").addClass("errorVaildate");								
							}
							
						},
						unhighlight: function(element, errorClass) {
							
							if ($(element).attr("name") == "originairportcode" ){
								//error.insertAfter("#searchflightform #cityfrom");
								$("#showSchedule-mobile #cityfrom").removeClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "destairportcode" ){
								//error.insertAfter("#searchflightform #cityto");
								$("#showSchedule-mobile #cityto").removeClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_1" ){
								//error.insertAfter("#searchflightform #depart_date");
								$("#showSchedule-mobile #depart_date").removeClass("errorVaildate");								
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_2" ){
								//error.insertAfter("#searchflightform #return_date");
								$("#showSchedule-mobile #return_date_schedule_mobile").removeClass("errorVaildate");								
							}
							
						},
						submitHandler: function(form){							
							if($("#bookingTypeSchedule-mobile").val()=="SHOWSCHEDULE"){
							  popuplateShowScheduleMobile();
							  //alert("btnShowSchedulePass");
							}						  
					   	}				  
					});
					
					$("#searchflightform_mobile").validate({              
						rules: {
						 originairportcode		:{required:true, minlength:1},
						 destairportcode		:{required:true, minlength:1},
						 originairportcode2		:{required:true, minlength:1},
						 destairportcode2		:{required:true, minlength:1},
						 originairportcode3		:{required:true, minlength:1},
						 destairportcode3		:{required:true, minlength:1},
						 originairportcode4		:{required:true, minlength:1},
						 destairportcode4		:{required:true, minlength:1},
						 originairportcode5		:{required:true, minlength:1},
						 destairportcode5		:{required:true, minlength:1},
						 originairportcode6		:{required:true, minlength:1},
						 destairportcode6		:{required:true, minlength:1},
						 BOOKING_DATE_TIME_1		:{required:true},
						 BOOKING_DATE_TIME_2		:{required:true, date:false},
						 BOOKING_DATE_TIME_3		:{required:true, date:false},
						 BOOKING_DATE_TIME_4		:{required:true, date:false},
						 BOOKING_DATE_TIME_5		:{required:true, date:false},
						 BOOKING_DATE_TIME_6		:{required:true, date:false},
						 CABIN		:{required:true}
						 
						},
						highlight: function(element, errorClass) {
							
							if ($(element).attr("name") == "originairportcode" ){
								//error.insertAfter("#searchflightform #cityfrom");
								$("#searchflightform_mobile #cityfrom").addClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "destairportcode" ){
								//error.insertAfter("#searchflightform #cityto");
								$("#searchflightform_mobile #cityto").addClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_1" ){
								//error.insertAfter("#searchflightform #depart_date");
								$("#searchflightform_mobile #depart_date").addClass("errorVaildate");								
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_2" ){
								//error.insertAfter("#searchflightform #return_date");
								$("#searchflightform_mobile #return_date").addClass("errorVaildate");								
							}
							
						},
						unhighlight: function(element, errorClass) {
							
							if ($(element).attr("name") == "originairportcode" ){
								//error.insertAfter("#searchflightform #cityfrom");
								$("#searchflightform_mobile #cityfrom").removeClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "destairportcode" ){
								//error.insertAfter("#searchflightform #cityto");
								$("#searchflightform_mobile #cityto").removeClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_1" ){
								//error.insertAfter("#searchflightform #depart_date");
								$("#searchflightform_mobile #depart_date").removeClass("errorVaildate");								
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_2" ){
								//error.insertAfter("#searchflightform #return_date");
								$("#searchflightform_mobile #return_date").removeClass("errorVaildate");								
							}
							
						},
						submitHandler: function(form){
							
						  if($("#bookingType").val()=="SHOWSCHEDULE"){
							  popuplateShowSchedule();
						  }
						  if($("#bookingType").val()=="BOOKCITILINK"){
							  processBookCitilink();
						  }
						  else if($("#bookingType").val()!="SHOWSCHEDULE"){
							  processIBEMobile();
						  }
					   	}				  
					});
					
					$("#searchflightform").validate({              
						rules: {
						 originairportcode		:{required:true, minlength:1},
						 destairportcode		:{required:true, minlength:1},
						 originairportcode2		:{required:true, minlength:1},
						 destairportcode2		:{required:true, minlength:1},
						 originairportcode3		:{required:true, minlength:1},
						 destairportcode3		:{required:true, minlength:1},
						 originairportcode4		:{required:true, minlength:1},
						 destairportcode4		:{required:true, minlength:1},
						 originairportcode5		:{required:true, minlength:1},
						 destairportcode5		:{required:true, minlength:1},
						 originairportcode6		:{required:true, minlength:1},
						 destairportcode6		:{required:true, minlength:1},
						 BOOKING_DATE_TIME_1		:{required:true},
						 BOOKING_DATE_TIME_2		:{required:true, date:false},
						 BOOKING_DATE_TIME_3		:{required:true, date:false},
						 BOOKING_DATE_TIME_4		:{required:true, date:false},
						 BOOKING_DATE_TIME_5		:{required:true, date:false},
						 BOOKING_DATE_TIME_6		:{required:true, date:false},
						 CABIN		:{required:true}
						 
						},
						highlight: function(element, errorClass) {
							
							if ($(element).attr("name") == "originairportcode" ){
								//error.insertAfter("#searchflightform #cityfrom");
								$("#searchflightform #cityfrom").addClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "destairportcode" ){
								//error.insertAfter("#searchflightform #cityto");
								$("#searchflightform #cityto").addClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_1" ){
								//error.insertAfter("#searchflightform #depart_date");
								$("#searchflightform #depart_date").addClass("errorVaildate");								
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_2" ){
								//error.insertAfter("#searchflightform #return_date");
								$("#searchflightform #return_date").addClass("errorVaildate");								
							}
							
						},
						unhighlight: function(element, errorClass) {
							
							if ($(element).attr("name") == "originairportcode" ){
								//error.insertAfter("#searchflightform #cityfrom");
								$("#searchflightform #cityfrom").removeClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "destairportcode" ){
								//error.insertAfter("#searchflightform #cityto");
								$("#searchflightform #cityto").removeClass("errorVaildate");
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_1" ){
								//error.insertAfter("#searchflightform #depart_date");
								$("#searchflightform #depart_date").removeClass("errorVaildate");								
							}
							else if  ($(element).attr("name") == "BOOKING_DATE_TIME_2" ){
								//error.insertAfter("#searchflightform #return_date");
								$("#searchflightform #return_date").removeClass("errorVaildate");								
							}
							
						},
						submitHandler: function(form){
							
						  if($("#bookingType").val()=="SHOWSCHEDULE"){
							  popuplateShowSchedule();
						  }
						  if($("#bookingType").val()=="BOOKCITILINK"){
							  processBookCitilink();
						  }
						  else if($("#bookingType").val()!="SHOWSCHEDULE"){
							  processIBE();
						  }
					   	}				  
					});
					
					$("#submitTicketRefundMobile").click(function (){
						$("#formTicketRefundMobile").submit();
						//alert("mobile");
					});
					
					$("#submitTicketRefund").click(function (){
						$("#formTicketRefund").submit();
						//alert("desktop");
					});
					
					//Fitur Refund
					$("#formTicketRefundMobile").validate({              
						rules: {
						 refund_booking_code		:{required:true, minlength:1},
						 refund_lastname		:{required:true, minlength:1},
						 refund_email			:{required:true, email:true},
						 refund_booking_date		:{required:true}						 
						},
						highlight: function(element, errorClass) {
							if ($(element).attr("name") == "refund_booking_code" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formTicketRefundMobile #refundbookingcode").addClass("errorVaildate");
							}
							else if ($(element).attr("name") == "refund_lastname" ){
								//error.insertAfter("#formTicketRefund #refundlastname");
								$("#formTicketRefundMobile #refundlastname").addClass("errorVaildate");
							}
							else if ($(element).attr("name") == "refund_email" ){
								//error.insertAfter("#formTicketRefund #refundemail");
								$("#formTicketRefundMobile #refundemail").addClass("errorVaildate");								
							}
							else if ($(element).attr("name") == "refund_booking_date" ){
								//error.insertAfter("#formTicketRefund #refundgffnumber");
								$("#formTicketRefundMobile #refundbookingdate").addClass("errorVaildate");								
							}														
						},
						unhighlight: function(element, errorClass) {
							if ($(element).attr("name") == "refund_booking_code" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formTicketRefundMobile #refundbookingcode").removeClass("errorVaildate");
							}
							else if ($(element).attr("name") == "refund_lastname" ){
								//error.insertAfter("#formTicketRefund #refundlastname");
								$("#formTicketRefundMobile #refundlastname").removeClass("errorVaildate");
							}
							else if ($(element).attr("name") == "refund_email" ){
								//error.insertAfter("#formTicketRefund #refundemail");
								$("#formTicketRefundMobile #refundemail").removeClass("errorVaildate");								
							}
							else if ($(element).attr("name") == "refund_booking_date" ){
								//error.insertAfter("#formTicketRefund #refundgffnumber");
								$("#formTicketRefundMobile #refundbookingdate").removeClass("errorVaildate");								
							}
						},
						submitHandler: function(form){
							processRefund();						  
					   	}				  
					});
					
					$("#formTicketRefund").validate({              
						rules: {
						 refund_booking_code		:{required:true, minlength:1},
						 refund_lastname		:{required:true, minlength:1},
						 refund_email			:{required:true, email:true},
						 refund_booking_date		:{required:true}						 
						},
						highlight: function(element, errorClass) {
							if ($(element).attr("name") == "refund_booking_code" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formTicketRefund #refundbookingcode").addClass("errorVaildate");
							}
							else if ($(element).attr("name") == "refund_lastname" ){
								//error.insertAfter("#formTicketRefund #refundlastname");
								$("#formTicketRefund #refundlastname").addClass("errorVaildate");
							}
							else if ($(element).attr("name") == "refund_email" ){
								//error.insertAfter("#formTicketRefund #refundemail");
								$("#formTicketRefund #refundemail").addClass("errorVaildate");								
							}
							else if ($(element).attr("name") == "refund_booking_date" ){
								//error.insertAfter("#formTicketRefund #refundgffnumber");
								$("#formTicketRefund #refundbookingdate").addClass("errorVaildate");								
							}														
						},
						unhighlight: function(element, errorClass) {
							if ($(element).attr("name") == "refund_booking_code" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formTicketRefund #refundbookingcode").removeClass("errorVaildate");
							}
							else if ($(element).attr("name") == "refund_lastname" ){
								//error.insertAfter("#formTicketRefund #refundlastname");
								$("#formTicketRefund #refundlastname").removeClass("errorVaildate");
							}
							else if ($(element).attr("name") == "refund_email" ){
								//error.insertAfter("#formTicketRefund #refundemail");
								$("#formTicketRefund #refundemail").removeClass("errorVaildate");								
							}
							else if ($(element).attr("name") == "refund_booking_date" ){
								//error.insertAfter("#formTicketRefund #refundgffnumber");
								$("#formTicketRefund #refundbookingdate").removeClass("errorVaildate");								
							}
						},
						submitHandler: function(form){
							processRefund();						  
					   	}				  
					});
					
					$.validator.addMethod("alphanumeric", function(value, element) {
							return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
					});
					
					$.validator.addMethod('onlyNumber', function(value, element) {
						if(value.length!=0){
							return /^[0-9]+$/.test(value);
						}else{
						return true;
						}
					}, 'Please enter only Number.');
	
					$("#reservation").validate({              
						rules: {
						 bookingCode		:{required:true, minlength:6, alphanumeric:true}
						},
						messages: {
							 bookingCode : { minlength: "Input value must be 6 characters length.", alphanumeric:"Input value must be alphanumeric"}
						}
						/*,
						submitHandler: function(form){
						  $("#reservation").submit();
					   }*/
					   					  
					  });
					
					$("#formManageBooking").validate({              
						rules: {
						 bookingCode		:{required:true, minlength:6, alphanumeric:true},
						 bookingLastName		:{required:true, minlength:1}
						},
						messages: {
							 bookingCode : {minlength: "Input value must be 6 characters length.",alphanumeric:"Input value must be alphanumeric"}
						},
						highlight: function(element, errorClass) {
							if ($(element).attr("name") == "bookingCode" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formManageBooking #booking-code").addClass("errorVaildate");
							}
							else if ($(element).attr("name") == "bookingLastName" ){
								//error.insertAfter("#formTicketRefund #refundlastname");
								$("#formManageBooking #booking-last-name").addClass("errorVaildate");
							}																					
						},
						unhighlight: function(element, errorClass) {
							if ($(element).attr("name") == "bookingCode" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formManageBooking #booking-code").removeClass("errorVaildate");
							}
							else if ($(element).attr("name") == "bookingLastName" ){
								//error.insertAfter("#formTicketRefund #refundlastname");
								$("#formManageBooking #booking-last-name").removeClass("errorVaildate");
							}
						},
						submitHandler: function(form){
						  manageBookingProcess();
					   }
					   					  
					  });
					  
					 $("#formManageBookingMobile").validate({              
						rules: {
						 bookingCode		:{required:true, minlength:6, alphanumeric:true},
						 bookingLastName		:{required:true, minlength:1}
						},
						messages: {
							 bookingCode : {minlength: "Input value must be 6 characters length.",alphanumeric:"Input value must be alphanumeric"}
						},
						highlight: function(element, errorClass) {
							if ($(element).attr("name") == "bookingCode" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formManageBookingMobile #booking-code").addClass("errorVaildate");
							}
							else if ($(element).attr("name") == "bookingLastName" ){
								//error.insertAfter("#formTicketRefund #refundlastname");
								$("#formManageBookingMobile #booking-last-name").addClass("errorVaildate");
							}																					
						},
						unhighlight: function(element, errorClass) {
							if ($(element).attr("name") == "bookingCode" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formManageBookingMobile #booking-code").removeClass("errorVaildate");
							}
							else if ($(element).attr("name") == "bookingLastName" ){
								//error.insertAfter("#formTicketRefund #refundlastname");
								$("#formManageBookingMobile #booking-last-name").removeClass("errorVaildate");
							}
						},
						submitHandler: function(form){
						  manageBookingProcess();
					   }
					   					  
					  });
					  
					  /* $("#formManageBookingbid").validate({              
						rules: {
						 bookingCodebid		:{required:true, minlength:6,alphanumeric:true},
						 bookingLastNamebid		:{required:true, minlength:1}
						},
						messages: {
							 bookingCodebid : {minlength: "Input value must be 6 characters length.",alphanumeric:"Input value must be alphanumeric"}
						},
						submitHandler: function(form){
						  manageBookingProcessbid();
					   }
					   					  
					  });*/
					  
					$("#frmShowScheduleByDate").validate({              
						rules: {
						 'origin-2s'		:{required:true, minlength:1},
						 'destination-2s'		:{required:true, minlength:1},
						 departuredate2		:{required:true, date:false},
						 arrivaldate2			:{required:true, date:false}
						}/*,
						submitHandler: function(form){
						  $("#frmShowScheduleByDate").submit();
					   }*/
					   					  
					  });
					  
					$("#formDepartureArrival").validate({              
						rules: {
						  arrivaldepartureCity		:{required:true, minlength:1}
						},
						highlight: function(element, errorClass) {
							if ($(element).attr("name") == "arrivaldepartureCity" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formDepartureArrival #arrivalcity").addClass("errorVaildate");
							}																					
						},
						unhighlight: function(element, errorClass) {
							if ($(element).attr("name") == "arrivaldepartureCity" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formDepartureArrival #arrivalcity").removeClass("errorVaildate");
							}
						}/*,
						submitHandler: function(form){
						  $("#formDepartureArrival").submit();
					   }*/
					   					  
					});
					
					$("#formDepartureArrival-mobile").validate({              
						rules: {
						  arrivaldepartureCity		:{required:true, minlength:1}
						},
						highlight: function(element, errorClass) {
							if ($(element).attr("name") == "arrivaldepartureCity" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formDepartureArrival-mobile #arrivalcity").addClass("errorVaildate");
							}																					
						},
						unhighlight: function(element, errorClass) {
							if ($(element).attr("name") == "arrivaldepartureCity" ){
								//error.insertAfter("#formTicketRefund #refundfirstname");
								$("#formDepartureArrival-mobile #arrivalcity").removeClass("errorVaildate");
							}
						}/*,
						submitHandler: function(form){
						  $("#formDepartureArrival").submit();
					   }*/
					   					  
					});
					
					//End modif by Albert	
					
					$(".departuredate").change(
						function() {							  
								  $(".departuredate").datepicker(
										  "option", "maxdate", -1);									
						  });
				});
				

//Custom Herry Booking
function continueAutofill(captchaSubmit){
	$(".loader").show();
	//$('.fancybox-close').click();
	
	/*
	var paxCounter = 0;
	var paxCounterInf = 0;
	var ckToBeSent = "";

	$('select[id*="pick-adult"]:visible').each(function(ind,key){
		var singlePax = "&&&".split("&");
		if($(this).val()!=null){
			singlePax = atob($(this).val()).split('&');
		}
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_ADT-IDEN_FirstName=" + singlePax[0] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_ADT-IDEN_LastName=" + singlePax[1] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_ADT-IDEN_TitleCode=" + singlePax[3] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_ADT-FREQ_Airline_0=GA&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_ADT-FREQ_Number_0=&";
		
		paxCounter++;
	});

	$('select[id*="pick-child"]:visible').each(function(ind,key){
		var singlePax = "&&--&".split("&");
		if($(this).val()!=null){
			singlePax = atob($(this).val()).split('&');
		}
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_CHD-IDEN_FirstName=" + singlePax[0] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_CHD-IDEN_LastName=" + singlePax[1] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_CHD-IDEN_DateOfBirth-DateYear=" + singlePax[2].split('-')[0] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_CHD-IDEN_DateOfBirth-DateMonth=" + singlePax[2].split('-')[1] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_CHD-IDEN_DateOfBirth-DateDay=" + singlePax[2].split('-')[2] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_CHD-IDEN_TitleCode=" + singlePax[3] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_CHD-FREQ_Airline_0=&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounter+"_CHD-FREQ_Number_0=&";
		
		paxCounter++;
	});

	$('select[id*="pick-infant"]:visible').each(function(ind,key){
		var singlePax = "&&--&".split("&");
		if($(this).val()!=null){
			singlePax = atob($(this).val()).split('&');
		}
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounterInf+"_ADT_INF-IDEN_FirstName=" + singlePax[0] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounterInf+"_ADT_INF-IDEN_LastName=" + singlePax[1] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounterInf+"_ADT_INF-IDEN_DateOfBirth-DateYear=" + singlePax[2].split('-')[0] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounterInf+"_ADT_INF-IDEN_DateOfBirth-DateMonth=" + singlePax[2].split('-')[1] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounterInf+"_ADT_INF-IDEN_DateOfBirth-DateDay=" + singlePax[2].split('-')[2] + "&";
		ckToBeSent += "tpl3_widget-input-travellerList-traveller_"+paxCounterInf+"_ADT_INF-IDEN_TitleCode=" + singlePax[3] + "&";
		
		paxCounterInf++;
	});

	setCookie("ufatp", btoa(ckToBeSent));
	*/
	submitExternalBooking($("#ajax").val(),"book",captchaSubmit);
}

function reloadSelectPax(){
	//clear form
	$('#passenger-title').val('MR');
	$('#passenger-firstname').val('');
	$('#passenger-lastname').val('');
	$('#passenger-dob').val('');
	$('#passenger-title').click();

	$("#select-pax-adult").hide();
	$("#select-pax-child").hide();
	$("#select-pax-infant").hide();
	$(".select-pax").parent().hide();

	if(parseInt($('#adultspax input').val()) > 0)
		$("#select-pax-adult").show();
	if(parseInt($('#childspax input').val()) > 0)
		$("#select-pax-child").show();
	if(parseInt($('#infantspax input').val()) > 0)
		$("#select-pax-infant").show();

	for(var i=1; i<=parseInt($('#adultspax input').val()); i++){
		$("#pick-adult"+i).parent().show();
	}
	for(var i=1; i<=parseInt($('#childspax input').val()); i++){
		$("#pick-child"+i).parent().show();
	}
	for(var i=1; i<=parseInt($('#infantspax input').val()); i++){
		$("#pick-infant"+i).parent().show();
	}
}

function backAutofillPax(){
	$("#passenger-form").fadeIn();
	$("#passenger-details").hide();

	//$('.fancybox-inner').css({height:parseInt($('#passenger-form').parent().css("height").substring(0,3))+parseInt($('#passenger-form').parent().prev().css("height").substring(0,3))+parseInt($('#passenger-form').parent().prev().prev().css("height").substring(0,3))});
}

function submitBooking(captchaSubmit, deeplink)
{	
	//$(".loader").show();
	if(deeplink==undefined)
		showLoaderBanner();
	else
		$(".loader").show();
		
	var ssnCookie = readCookie("ssn");
	if(ssnCookie == null){
		setUniqueCookie();
	}
	setTimeout(function(){
	//Start Modif By Albert
	var bookingType = $("#bookingType").val();
	//alert(bookingType);
	if(bookingType=="IBE"){
		/*autofill ID only*/
		var tempLoc = window.location.href;
		submitExternalBooking($("#ajax").val(),"book",captchaSubmit);
		/*if(tempLoc.indexOf('/id/')>0){
			if($(window).width() > 640){
				if(membertypelogin==""){
					submitExternalBooking($("#ajax").val(),"book",captchaSubmit);
				}else{
					if(captchaSubmit=="redemption"){
								submitExternalBooking($("#ajax").val(),"book",captchaSubmit);
					}else{
						reloadSelectPax();
						$(".loader").hide();			
						$.fancybox({
							href: '#autofill-passenger',
							height: parseInt($('#autofill-passenger').css("height").substring(0,3)),
							fitToView: false,
							autoSize: false,
							width: 550,
							padding : 0
						});
					}
				}
			}else{
				submitExternalBooking($("#ajax").val(),"book",captchaSubmit);
			}
		}else{
			submitExternalBooking($("#ajax").val(),"book",captchaSubmit);
		}*/
		
		/*autofill ID only*/
		/*autofill ALL sites*/
		/*if(membertypelogin==""){
			submitExternalBooking($("#ajax").val(),"book",captchaSubmit);
		}else{
			if(captchaSubmit=="redemption"){
		                submitExternalBooking($("#ajax").val(),"book",captchaSubmit);
			}else{
				reloadSelectPax();
				$(".loader").hide();			
				$.fancybox({
					href: '#autofill-passenger',
					height: parseInt($('#autofill-passenger').css("height").substring(0,3)),
					fitToView: false,
					autoSize: false,
					width: 550,
					padding : 0
				});
			}
		}*/
		/*autofill ALL sites*/
	}
	if(bookingType=="REDEEM"){
		if(membertypelogin.indexOf("GFF")>-1){
			submitExternalBooking($("#ajax").val(),"redeem",captchaSubmit);
		}else{
			if(captchaSubmit=="redemption"){
				submitExternalBooking($("#ajax").val(),"redeem",captchaSubmit);
			}else{
				$("#loader-banner").hide();
				$(".loader").hide();
				if ($(window).width() > 639) {
					$.fancybox(
						{
							href: '#garudamiles-login-popup',
							height: parseInt($('#garudamiles-login-popup').css("height").substring(0,3)),
							fitToView: false,
							autoSize: false,
							width: 400,
							padding : 0
						}
					);
				}else if ($(window).width() < 640) {
					$.fancybox(
						{
							href: '#garudamiles-login-popup',
							height: 264,
							fitToView: false,
							autoSize: false,
							width: '90%',
							padding : 0
						}
					);
				}
			}
		}
	}
	},1000);
	//End Modif By Albert
}

function submitExternalBooking(submissionUrl,method,captchaSubmit) 
{
	
	//for ie 9
	$("input[placeholder]").each(function () {
        var $this = $(this);
		if($this.attr("id")!=null)
		{
	        if(document.getElementById($this.attr("id")).value == $this.attr("placeholder"))
		{
			document.getElementById($this.attr("id")).value = "";
        	}
		}
    	});

	
	//$.blockUI({ message: $('#loader'), showOverlay: true});
	//$(".loader").show();
	//alert(method);
	if(method=="book")
	{
		
		var req = new AjaxRequest(submissionUrl, handleRatingSubmissionBooking);
		AjaxRequest.ERROR_REQUEST_STATE = "Connection interrupted. Please check your network or try again later.";
		
		if($("#searchflightform_mobile").length == 1 && $("#searchflightform_mobile").is(":visible")){
			var formBooking = document.getElementById('searchflightform_mobile');
		}
		else{
			var formBooking = document.getElementById('searchflightform');
		}
		
		req.setParameters(formBooking);
		req.setParameter('adsParam',$('#paramforads').val());
		if($(window).width() > 640) 
		{

		}
		else
		{
			req.setParameter('device','mobile');
		}

		req.setParameter('function',method);

		//set parameter autofill passanger
		/*var allPaxData = "";
		$('select[id*="pick-adult"]:visible').each(function(ind,key){
			if($(this).val()!=null)
				allPaxData += atob($(this).val())+"&ADT|";
			else
				allPaxData += "empty&empty&empty&empty&ADT|";
		});
		
		$('select[id*="pick-child"]:visible').each(function(ind,key){
			if($(this).val()!=null)
				allPaxData += atob($(this).val())+"&CHD|";
			else
				allPaxData += "empty&empty&empty&empty&CHD|";
		});
		
		$('select[id*="pick-infant"]:visible').each(function(ind,key){
			if($(this).val()!=null)
				allPaxData += atob($(this).val())+"&INF|";
			else
				allPaxData += "empty&empty&empty&empty&INF|";
		});
		
		req.setParameter('autofillPax',allPaxData.substring(0,allPaxData.length-1));*/
		/*
		req.setParameter('fromCaptcha',captchaSubmit);
		
		var formCaptcha = document.getElementById('inputFormCaptcha');
		req.setParameters(formCaptcha);
		*/
		//New autofill pax
		var allPaxData = "";
		if(membertypelogin.indexOf('GFF')>-1){
			$('select[id="pick-adult1"] option').each(function(ind,key){
				if(ind!=0){
					if($(this).val()!=null)
						allPaxData += atob($(this).val())+"&ADT|";
					else
						allPaxData += "empty&empty&empty&empty&ADT|";
				}
			});
			
			$('select[id="pick-child1"] option').each(function(ind,key){
				if(ind!=0){
					if($(this).val()!=null)
						allPaxData += atob($(this).val())+"&CHD|";
					else
						allPaxData += "empty&empty&empty&empty&CHD|";
				}
			});
			
			$('select[id="pick-infant1"] option').each(function(ind,key){
				if(ind!=0){
					if($(this).val()!=null)
						allPaxData += atob($(this).val())+"&INF|";
					else
						allPaxData += "empty&empty&empty&empty&INF|";
				}
			});
			
			req.setParameter('autofillPax',allPaxData.substring(0,allPaxData.length-1));
		}		
		
		req.submit();
	}
	if(method=="loginGM")
	{
		
		var req = new AjaxRequest(submissionUrl, handleRatingSubmissionLogin);
		AjaxRequest.ERROR_REQUEST_STATE = "Connection interrupted. Please check your network or try again later.";
		
		var formBooking = document.getElementById('garudamiles-login-form');
		req.setParameters(formBooking);
		req.setParameter('function',method);
		//req.setParameter('logusername',$('#gm-no').val());
		req.setParameter('logpassword',$('#gm-pass').val());
				
		req.submit();
	}
	
	//Start Modif By Albert
	if(method=="redeem")
	{
		showLoaderBanner();
		$(".loader").hide();
		var req = new AjaxRequest(submissionUrl, handleRatingSubmissionBooking);
		AjaxRequest.ERROR_REQUEST_STATE = "Connection interrupted. Please check your network or try again later.";
		
		var formBooking = "";
		if($("#searchflightform_mobile").length == 1 && $("#searchflightform_mobile").is(":visible")){
			formBooking = document.getElementById('searchflightform_mobile');
		}
		else{
			formBooking = document.getElementById('searchflightform');
		}
		
		req.setParameters(formBooking);
		req.setParameter('adsParam',$('#paramforads').val());
		req.setParameter('function',method);
		req.setParameter('fromCaptcha',captchaSubmit);
		
		if($(window).width() > 640) 
		{

		}
		else
		{
			req.setParameter('device','mobile');
		}
/*
		var formCaptcha = document.getElementById('inputFormCaptcha');
		req.setParameters(formCaptcha);
	*/	
		req.submit();
	}
	//End Modif By Albert
	if(method=="manageBooking")
	{
		var req = new AjaxRequest(submissionUrl, handleRatingSubmissionManageBooking);
		if($("#formManageBookingMobile").length == 1 && $("#formManageBookingMobile").is(":visible")){
			var formManageBooking = document.getElementById('formManageBookingMobile');
		}
		else{
			var formManageBooking = document.getElementById('formManageBooking');
		}
		
		req.setParameters(formManageBooking);
		req.setParameter('function',method);
		req.submit();
	}
	//Fitur Refund
	if(method=="refund")
	{
		var req = new AjaxRequest(submissionUrl, handleRatingSubmissionRefund);
		
		if($("#formManageBookingMobile").length == 1 && $("#formManageBookingMobile").is(":visible")){
			var refundForm = document.getElementById('formTicketRefundMobile');
		}
		else{
			var refundForm = document.getElementById('formTicketRefund');
		}
		
		req.setParameters(refundForm);
		req.setParameter('function',method);
		req.submit();
	}

	/*if(method=="manageBookingbid")
	{
		var req = new AjaxRequest(submissionUrl, handleRatingSubmissionManageBooking);
		var formManageBooking = document.getElementById('formManageBookingbid');
		req.setParameters(formManageBooking);
		req.setParameter('function','manageBooking');
		req.submit();
	}*/
	


}

function handleRatingSubmissionLogin(xmlDoc, text)
{
	$('#error-login-gm').hide();
	if(xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue=="00"){
		if(xmlDoc.getElementsByTagName("member")[0].childNodes[0].nodeValue.indexOf("GFF")>-1){
			$('.fancybox-close').click();
			submitExternalBooking($("#ajax").val(),"redeem");
		}else{
			$('.loader').hide();
			$('#error-login-label').text("Redemption only available for GarudaMiles member");
			$('#error-login-gm').show();
		}
	}else{
		$('.loader').hide();
		$('#error-login-label').text("Wrong username or password!");
		$('#error-login-gm').show();
	}
	$('.fancybox-inner').css({height:parseInt($('#garudamiles-login-popup').css("height").substring(0,3))});
}

function handleRatingSubmissionBooking(xmlDoc, text) 
{	
	var urlBooking = "";
	if(xmlDoc.getElementsByTagName("PA").length>0)
	{
		for(i=0;i<xmlDoc.getElementsByTagName("PA")[0].childNodes.length;i++)
		{
			if(xmlDoc.getElementsByTagName("PA")[0].childNodes[i].nodeValue=="Error=01NA"){
				//route is blocked
				alert("This Route is Not Available");
				window.location.href="/"+getCookie('galocid')+"/"+getCookie('galangid')+"/index.page";
				return;
			}
			urlBooking = urlBooking + xmlDoc.getElementsByTagName("PA")[0].childNodes[i].nodeValue;
		}
	}
	
	if(xmlDoc.getElementsByTagName("redirectThis").length>0)
	{
		$.ajax({
			type:     "GET",
			url:      "https://www.garuda-indonesia.com/id/en/blankPage.page",
			success: function(data){
				document.open();
				document.write(data);
				document.close();
			}
		});
	}
	
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");
	
	var messageCrawler = "";
	var messageWrongCaptcha = "";
	
	if(xmlDoc.getElementsByTagName("StatusBlocked").length>0)
	{
		//$(".blockUI").hide();
		//$(".loader").hide();
		$("#popup_box").show();
		$("#popup_box").css("z-index", 9900);
		$(".loader").css("z-index", 9000);

		if(galocid=='cn')
		{
			alert('You are blocked, Please try again within one hour');
			window.location.reload();
		}
		else if(typeof Recaptcha == 'undefined')
		{
			alert('You are blocked and you don\'t have a connection to Google Service, Please try again within one hour');
			window.location.reload();
		}
		else
		{
			showRecaptcha();
		}

	}
	
	if(xmlDoc.getElementsByTagName("WSPromo").length>0)
	{
		var messagePMS = xmlDoc.getElementsByTagName("WSPromo")[0].childNodes[0].nodeValue;
		if(messagePMS.indexOf(";")>-1)
		{
			var messagePMS = messagePMS.split(";");		
			if(messagePMS[1]!=""&&messagePMS[2]!=""){
				if(messagePMS.length==2)
				{
					alert(messagePMS[1]);
				}
				else if(messagePMS.length==3)
				{
					if(galangid !="")
					{
						if(galangid =="id")
						{
							alert(messagePMS[1]);
						}
						if(galangid !="id")
						{						
							alert(messagePMS[2]);						
						}
					}
				}
			}			
		}
	}

	if(urlBooking!="")
	{

	   if(urlBooking!="SPAM-DETECTED"){		
	    var params = getUrlParams(urlBooking);
		var actionurl = urlBooking.split('?')[0];
		
		var f = document.createElement("form");
		if(urlBooking.indexOf("booking")>0 || urlBooking.indexOf("wav")>0 || urlBooking.indexOf("pcm")>0)
			f.setAttribute('method',"post");
		else
			f.setAttribute('method',"get");
		f.setAttribute('id',"formBooking");
		
		var pomo = "";
		for(var key in params)
		{
			if(params.hasOwnProperty(key)){
				var i = document.createElement("input"); //input element, text
				i.setAttribute('type',"hidden");
				i.setAttribute('name',key);
				i.setAttribute('value',params[key]);
				f.appendChild(i);		

				if(key=="PROMO")
					pomo = params[key];
			}
		}
		//promo
		if(pomo!="")
			actionurl=actionurl+"?promo=" + pomo + "&";
		else
			actionurl=actionurl+"?";
			
		var currentForm = $('input#originairportcode').parents('form:visible');
		
		if(currentForm.length > 0){
			actionurl+="from=" + currentForm.find("input#originairportcode").val().substring(currentForm.find("input#originairportcode").val().lastIndexOf("(")+1,currentForm.find("input#originairportcode").val().lastIndexOf(")"));
			
			actionurl+="&to=" + currentForm.find("input#destairportcode").val().substring(currentForm.find("input#destairportcode").val().lastIndexOf("(")+1,currentForm.find("input#destairportcode").val().lastIndexOf(")"));
		}
		
		f.setAttribute('action',actionurl);

		//RETARGETING
		var __utma = getCookie("__utma");
		var __utmb = getCookie("__utmb");
		var __utmc = getCookie("__utmc");
		var __utmz = getCookie("__utmz");
		var urlga = "";
		if(urlBooking.indexOf("booking")>0 || urlBooking.indexOf("wav")>0)
			urlga ="https://booking.garuda-indonesia.com/plnext/garuda-indonesia/Override.action?utm_nooverride=1&process=2&__utma=" + __utma + "&__utmb=" + __utmb + "&__utmc=" + __utmc + "&__utmz=" + __utmz;
		else
			urlga = urlBooking + "&utm_nooverride=1&process=2&__utma=" + __utma + "&__utmb=" + __utmb + "&__utmc=" + __utmc + "&__utmz=" + __utmz;
			
		var divBooking = document.getElementById('divBooking');
		divBooking.appendChild(f);
		var formtest = document.getElementById('formBooking');
		
		if (typeof _gaq != 'undefined')
		{
			if(_gaq.I==undefined){
				formtest.submit();
			} else {				
				_gaq.push(['_link', urlga]);
				_gaq.push(['_linkByPost', formtest]);
				_gaq.push(function() { formtest.submit(); });
			}
		}
		else
		{
			formtest.submit();
		}
		
	   }
	   if(urlBooking=="SPAM-DETECTED"){
		alert("YOU CANNOT GO TO THE NEXT STEP DUE TO THE SPAMING");
		location.reload();
	   }	
	}
	
}

function handleRatingSubmissionRefund(xmlDoc, text) 
{
	if(xmlDoc.getElementsByTagName("urlRefund").length>0)
	{
		window.open(xmlDoc.getElementsByTagName("urlRefund")[0].childNodes[0].nodeValue);
	}
}

function handleRatingSubmissionManageBooking(xmlDoc, text) 
{	
	var urlBooking = "";
	if(xmlDoc.getElementsByTagName("PA").length>0)
	{
		for(i=0;i<xmlDoc.getElementsByTagName("PA")[0].childNodes.length;i++)
		{
			urlBooking = urlBooking + xmlDoc.getElementsByTagName("PA")[0].childNodes[i].nodeValue;
		}
	}
	
	if(urlBooking!="")
	{
		var params = getUrlParams(urlBooking);
		var actionurl = urlBooking.split('?')[0];
		
		
		var f = document.createElement("form");
		f.setAttribute('method',"post");
		if($("#formManageBookingMobile").length == 1 && $("#formManageBookingMobile").is(":visible")){
			f.setAttribute('id',"formManageBookingMobileSubmit");
		}
		else{
			f.setAttribute('id',"formManageBooking");
		}
		
		f.setAttribute('action',actionurl);

		for(var key in params)
		{
			if(params.hasOwnProperty(key)){
				var i = document.createElement("input"); //input element, text
				i.setAttribute('type',"hidden");
				i.setAttribute('name',key);
				i.setAttribute('value',params[key]);
				f.appendChild(i);
			}			
		}
		//f.submit();
		var divBooking = document.getElementById('divBooking');
		divBooking.appendChild(f);
		if($("#formManageBookingMobile").length == 1 && $("#formManageBookingMobile").is(":visible")){
			var formtest = document.getElementById('formManageBookingMobileSubmit');
		}
		else{
			var formtest = document.getElementById('formManageBooking');
		}
		
		formtest.submit();
		
	}

	
}

function getUrlParams(url) {
	var params = {};
	url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
	params[key] = value;
	});

	return params;
}


function customStrTrim(str) {
	  return str.replace(/^\s+|\s+/g, '');
}
function manageBookingProcess(){
	if($("#formManageBookingMobile").length == 1 && $("#formManageBookingMobile").is(":visible")){
		var bookingCode=document.forms['formManageBookingMobile']['bookingCode'].value;
		bookingCode = bookingCode.toUpperCase();

		var bookingLastName=document.forms['formManageBookingMobile']['bookingLastName'].value;
		bookingLastName = bookingLastName.toUpperCase();
	}
	else{
		var bookingCode=document.forms['formManageBooking']['bookingCode'].value;
		bookingCode = bookingCode.toUpperCase();

		var bookingLastName=document.forms['formManageBooking']['bookingLastName'].value;
		bookingLastName = bookingLastName.toUpperCase();
	}

	if (customStrTrim(bookingCode)=="" && customStrTrim(bookingLastName)=="")
	{
		/*if ($.browser.msie && $.browser.version <= 8){
			document.forms['formManageBooking']['bookingCode'].style.border="1px #FF2626 solid";
			document.forms['formManageBooking']['bookingLastName'].style.border="1px #FF2626 solid";
		}else{*/
			$("#formManageBooking input[name=bookingCode]").css({'border':'0px','-webkit-box-shadow':'0px 0px 4px #F70909','-moz-box-shadow':'0px 0px 4px #F70909','box-shadow':'0px 0px 4px #F70909','outline':'0'});
			$("#formManageBooking input[name=bookingLastName]").css({'border':'0px','-webkit-box-shadow':'0px 0px 4px #F70909','-moz-box-shadow':'0px 0px 4px #F70909','box-shadow':'0px 0px 4px #F70909','outline':'0'});
		//}
	}else if (customStrTrim(bookingCode)!="" && customStrTrim(bookingLastName)==""){
		/*if ($.browser.msie && $.browser.version <= 8){
			document.forms['formManageBooking']['bookingCode'].style.border="none";
			document.forms['formManageBooking']['bookingLastName'].style.border="1px #FF2626 solid";
		}else{*/
			$("#formManageBooking input[name=bookingCode]").removeAttr('style');
			$("#formManageBooking input[name=bookingLastName]").css({'border':'0px','-webkit-box-shadow':'0px 0px 4px #F70909','-moz-box-shadow':'0px 0px 4px #F70909','box-shadow':'0px 0px 4px #F70909','outline':'0'});
		//}
	}else if(customStrTrim(bookingLastName)!="" && customStrTrim(bookingCode)==""){
		/*if ($.browser.msie && $.browser.version <= 8){
			document.forms['formManageBooking']['bookingLastName'].style.border="none";
			document.forms['formManageBooking']['bookingCode'].style.border="1px #FF2626 solid";
		}else {*/
			$("#formManageBooking input[name=bookingLastName]").removeAttr('style');
			$("#formManageBooking input[name=bookingCode]").css({'border':'0px','-webkit-box-shadow':'0px 0px 4px #F70909','-moz-box-shadow':'0px 0px 4px #F70909','box-shadow':'0px 0px 4px #F70909','outline':'0'});
		//}
	}		
	else
	{
		if($("#formManageBookingMobile").length == 1 && $("#formManageBookingMobile").is(":visible")){
			$("#formManageBookingMobile input[name=bookingCode]").removeAttr('style');
			$("#formManageBookingMobile input[name=bookingLastName]").removeAttr('style');
		}
		else{
			$("#formManageBooking input[name=bookingCode]").removeAttr('style');
			$("#formManageBooking input[name=bookingLastName]").removeAttr('style');
		}
				
		submitExternalBooking($("#ajax").val(),"manageBooking");	
		
	}	
}

/*BidUpgrade
function manageBookingProcessbid(){					
	var bookingCode=document.forms['formManageBookingbid']['bookingCodebid'].value;
	bookingCode = bookingCode.toUpperCase();

	var bookingLastName=document.forms['formManageBookingbid']['bookingLastNamebid'].value;
	bookingLastName = bookingLastName.toUpperCase();

	if (customStrTrim(bookingCode)=="" && customStrTrim(bookingLastName)=="")
	{
		
			$("#formManageBookingbid input[name=bookingCodebid]").css({'border':'0px','-webkit-box-shadow':'0px 0px 4px #F70909','-moz-box-shadow':'0px 0px 4px #F70909','box-shadow':'0px 0px 4px #F70909','outline':'0'});
			$("#formManageBookingbid input[name=bookingLastNamebid]").css({'border':'0px','-webkit-box-shadow':'0px 0px 4px #F70909','-moz-box-shadow':'0px 0px 4px #F70909','box-shadow':'0px 0px 4px #F70909','outline':'0'});
		//}
	}else if (customStrTrim(bookingCode)!="" && customStrTrim(bookingLastName)==""){
		
			$("#formManageBookingbid input[name=bookingCodebid]").removeAttr('style');
			$("#formManageBookingbid input[name=bookingLastNamebid]").css({'border':'0px','-webkit-box-shadow':'0px 0px 4px #F70909','-moz-box-shadow':'0px 0px 4px #F70909','box-shadow':'0px 0px 4px #F70909','outline':'0'});
		//}
	}else if(customStrTrim(bookingLastName)!="" && customStrTrim(bookingCode)==""){
	
			$("#formManageBookingbid input[name=bookingLastNamebid]").removeAttr('style');
			$("#formManageBookingbid input[name=bookingCodebid]").css({'border':'0px','-webkit-box-shadow':'0px 0px 4px #F70909','-moz-box-shadow':'0px 0px 4px #F70909','box-shadow':'0px 0px 4px #F70909','outline':'0'});
		//}
	}		
	else
	{
		$("#formManageBookingbid input[name=bookingCodebid]").removeAttr('style');
		$("#formManageBookingbid input[name=bookingLastNamebid]").removeAttr('style');
		
		submitExternalBooking($("#ajax").val(),"manageBookingbid");	
		
	}	
}
*/

function checkStatusProcess(){
	var galangid = getCookie("galangid");
	var galocid = getCookie("galocid");

	var bookingCode=document.forms['reservation']['bookingCode'].value;
	bookingCode = bookingCode.toUpperCase();
	var validasi = $( "#reservation" ).valid();

	if (validasi!=false)

	{
		$(".loader").show();
	
		//var form=document.getElementById('reservation'); 
		//$('input[name=iwPreActions]').val('callWSCheckStatusInfo'); 
		//return true; 
		window.location = 'https://' + window.location.hostname + '/' + galocid + '/' + galangid + '/web-service-form/status_booking.page?PNR=' + bookingCode; 

		return false; 
	}
	else
	{
		/*if(galangid=="id")
			alert('Silahkan masukan kode booking anda');
		else
			alert('Please insert booking code');*/
		
		return false;
	}			
}

function onBookNow(from,to,start_dot,end_dot,trip_type,flight_class,pax_adult,pax_child,pax_infant,promo_code)
{
	if($(window).width() > 640){
		if($(".section-book_floating").length>0){
			$('html, body').scrollTop($(".section-book_floating").offset().top-30);
		}else{
			if(!$('#floating-widget .nav-menu li').eq(0).hasClass('trigger'))
				$(".style-toggle a").eq(0).click();
		}
	}else{
		$('.mobile-book_floating-page').eq(0).find('.mobile-book_floating').addClass('open');
		$('.mobile-book_floating-page').eq(0).find('.mobile-book_floating .tab-content._submenu > div').each(function(){$(this).removeClass('active in')});
		$('#submenu-1_mobile').addClass('active in');
	}
	
	setTimeout(function(){
		var currentForm = $('.flight_search_typeahead_from').parents('form:visible');

		if(trip_type == 'R')
		{
			currentForm.find("#radioRT").click();
		}
		else if(trip_type == 'O')
		{
			currentForm.find("#radioOW").click();
		}
		
		var resultFrom = "";
		var resultTo = "";
		if(from.indexOf('(')>=0){
			from = from.substring(from.indexOf('(')+1, from.indexOf(')'));
			to = to.substring(to.indexOf('(')+1, to.indexOf(')'));
			resultFrom = $.grep(cities, function(e){ return e.indexOf(from) > 0 ; });
			resultTo = $.grep(cities, function(e){ return e.indexOf(to) > 0 ; });
		}else{
			resultFrom = $.grep(cities, function(e){ return e.indexOf(from) >= 0 ; });
			resultTo = $.grep(cities, function(e){ return e.indexOf(to) >= 0 ; });
		}
		/*
		currentForm.find("select#originairportcode").val(resultFrom[0]);
		currentForm.find("select#originairportcode").selectpicker('refresh');
		currentForm.find("select#destairportcode").val(resultTo[0]);
		currentForm.find("select#destairportcode").selectpicker('refresh');
		*/
		currentForm.find('.flight_search_typeahead_from').val(resultFrom[0]);
		currentForm.find('.flight_search_typeahead_to').val(resultTo[0]);
		
		if(start_dot.length > 0)
		{
			var currentTime = new Date();
			var startDot = new Date(start_dot.split("/")[2], start_dot.split("/")[1]-1,start_dot.split("/")[0]);
			
			currentForm.find("input[name='BOOKING_DATE_TIME_1']").val(start_dot);
			if(startDot < currentTime)
				currentForm.find("input[name='BOOKING_DATE_TIME_1']").datepicker("option", "minDate", 0);
			else
				currentForm.find("input[name='BOOKING_DATE_TIME_1']").datepicker("option", "minDate", new Date(start_dot.split("/")[2], start_dot.split("/")[1]-1,start_dot.split("/")[0]));
			
			if(end_dot.length > 0)
			{
				currentForm.find("input[name='BOOKING_DATE_TIME_1']").datepicker("option", "maxDate", new Date(end_dot.split("/")[2], end_dot.split("/")[1]-1,end_dot.split("/")[0]));
			}
		}
		else
		{
			currentForm.find("input[name='BOOKING_DATE_TIME_1']").val("");
		}
		
		var berangkat = currentForm.find("input[name='BOOKING_DATE_TIME_1']").datepicker("getDate");
		if(end_dot.length > 0)
		{
			//currentForm.find("input[name='BOOKING_DATE_TIME_2']").datepicker("option", "maxDate", new Date(end_dot.split("/")[2], end_dot.split("/")[1]-1,end_dot.split("/")[0]));
			currentForm.find("input[name='BOOKING_DATE_TIME_2']").datepicker("option", "minDate", new Date(start_dot.split("/")[2], start_dot.split("/")[1]-1,start_dot.split("/")[0]));
			if((end_dot.split("/")[1]-start_dot.split("/")[1]==0)&&(end_dot.split("/")[2]==start_dot.split("/")[2])){
				currentForm.find("input[name='BOOKING_DATE_TIME_2']").val(end_dot);
				
			}else{
				
				var month = berangkat .getMonth();
				berangkat .setMonth(month+1);
				currentForm.find("input[name='BOOKING_DATE_TIME_2']").datepicker( "setDate", berangkat );			
			}	
			
		}
		else
		{
			currentForm.find("input[name='BOOKING_DATE_TIME_2']").val("");
		}
		currentForm.find('select[name="CABIN"]').val(flight_class);
		currentForm.find('select[name="CABIN"]').selectpicker('refresh');
		
		if(pax_adult != "")
			currentForm.find("#guestTypes\\[0\\]\\.amount").val(pax_adult);
		if(pax_child != "")
			currentForm.find("#guestTypes\\[1\\]\\.amount").val(pax_child);
		if(pax_infant != "")
			currentForm.find("#guestTypes\\[2\\]\\.amount").val(pax_infant);
		
		if(promo_code!=""){
			currentForm.find("#promoCode").val(promo_code.trim());
		}
	}, 500);
}

function getCity(data){
    return data.airportcode == codeToFind;
}

function setDefaultOrigin(ori, lastOrigin, lastDest){
	var curPageUrl = window.location.href;
	
	if(curPageUrl.indexOf("/multicity-third-party")<0 && curPageUrl.indexOf("/multicity.page")<0){
		if(lastOrigin!=null)
			codeToFind = lastOrigin;
		else
			codeToFind = ori;
			
		var singleCity = citylist.find(getCity);
		
		var currenForm = $('.flight_search_typeahead_from').parents('form:visible');
		currenForm.find('.flight_search_typeahead_from').val(singleCity.value + ' (' + singleCity.citycode + '), ' + singleCity.airport + ' (' + singleCity.airportcode + ')');
		
		if(lastDest!=null){
			codeToFind = lastDest;
			singleCity = citylist.find(getCity);
			currenForm.find('.flight_search_typeahead_to').val(singleCity.value + ' (' + singleCity.citycode + '), ' + singleCity.airport + ' (' + singleCity.airportcode + ')');
		}
		checkFF();
		
		/*setTimeout(function(){
			$("select#originairportcode").selectpicker('refresh');
			var toPopulate = "";
			if(lastOrigin!=null)
				toPopulate = lastOrigin;
			else
				toPopulate = ori;
				
			$("select#originairportcode").val($('select#originairportcode option[value*="'+toPopulate+'"]').val());
			$("select#originairportcode").selectpicker('refresh');
			var ac = $("select#originairportcode").val();		
			$("select#destairportcode option[value*='"+ac+"']").prop('disabled',true);		
			var bc = $("select#destairportcode option:disabled");
			$("select#destairportcode").selectpicker('refresh');
			
			if(lastDest!=null){
				$("select#destairportcode").val($('select#destairportcode option[value*="'+lastDest+'"]').val());
				$("select#destairportcode").selectpicker('refresh');
			}
			$('#destairportcode').blur();
			checkFF();
		}, 500);*/
	}
}


$(document).ready(function () {
	var checkTraveldoc = setInterval(function(){		
		if($(window).width() > 640){
			if($("#submenu-traveldoc_mobile .traveldoc_widget").length > 0){
				$("#submenu-traveldoc_mobile .traveldoc_widget").appendTo("#submenu-traveldoc");
				clearInterval(checkTraveldoc);
			}
		}else{
			if($("#submenu-traveldoc-floating .traveldoc_widget").length > 0){
				$("#submenu-traveldoc-floating .traveldoc_widget").appendTo("#submenu-traveldoc-floating_mobile");
				clearInterval(checkTraveldoc);
			}
		}
	}, 500);

	//$( "#promoCode" ).focus(function() {

	$('#campaign_name').val(window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1));
	$('#campaign_name_mobile').val(window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1));

	$('#bestfare-content').on('click', 'div.fares-list' , function(){
	     $('#campaign_name').val('Farebox|'+window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1));
		 $('#campaign_name_mobile').val('Farebox|'+window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1));
	});
	/*
	if($('#promoCode').val() == "" && window.location.pathname.indexOf('/id/') < 0)
		$('#promoCode').val('GATF17');*/
		
var startDateGOTF = new Date(2018, 10, 23, 00, 00, 00);
var endDateGOTF = new Date(2018, 10, 30, 00, 00, 00);

var startDateHarpelNasga = new Date(2018, 8, 4, 00, 00, 00);
var endDateHarpelNasga = new Date(2018, 8, 6, 00, 00, 00);

var datenow = new Date();

	if(datenow>startDateGOTF && datenow<endDateGOTF){
		if($('#promoCode').val() == "" && window.location.pathname.indexOf('/sg/') < 0 && window.location.pathname.indexOf('/my/') < 0 && window.location.pathname.indexOf('/th/') < 0 && window.location.pathname.indexOf('/au/') < 0){
			$('#promoCode').val('GOTF');
		}
		
		if($('#promoCodeDesk').val() == "" && window.location.pathname.indexOf('/sg/') < 0 && window.location.pathname.indexOf('/my/') < 0 && window.location.pathname.indexOf('/th/') < 0 && window.location.pathname.indexOf('/au/') < 0){
			$('#promoCodeDesk').val('GOTF');
			$('#promoCodeMobile').val('GOTF');
		}
	}
	if(datenow>startDateHarpelNasga && datenow<endDateHarpelNasga){
		if($('#promoCode').val() == ""){
			$('#promoCode').val('HARPELNASGA');
		}
		
		if($('#promoCodeDesk').val() == ""){
			$('#promoCodeDesk').val('HARPELNASGA');
			$('#promoCodeMobile').val('HARPELNASGA');
		}
	}
	
		if($(window).width() > 640) 
		{
			//if(window.location.href.indexOf("/id/")>-1)
			//	$('#promoCode').val('GA17AN');			
			//if($('#promoCode').val() == "" && window.location.pathname.indexOf('/id/') > -1)
			//	$('#promoCode').val('GA17AN');
		}
		else
		{
			//$("#warning-mobile").show();
			//if($('#promoCode').val() == "" && window.location.pathname.indexOf('/id/') > -1)
			//	$('#promoCode').val('GA17AN');
			$('#btnShowSchedule').css('margin-right','10px');
			$('#btnShowSchedule').css('width','130px');
			//$('a#btnSearchFlightRedeem').remove();
			$('#book-flight > .box > .booking-content > .tabs > ul').removeClass('block-grid-3');
			$('#book-flight > .box > .booking-content > .tabs > ul').addClass('block-grid-2')
			$('#book-flight > .box > .booking-content > .tabs > ul').find('a#multicity').parent().remove();
		}
	/*if(window.location.pathname.indexOf('/id/') < 0){
		if(window.location.pathname.indexOf('/sa/') > -1)
			$('#pick-airline').remove();
		else
			$('#pick-airline').parent().remove();
	}*/
	//});
});

//START Custom Erik//
String.prototype.insertChar = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

function priceSeparatedByComa(thePrice){
	var pisah = "";
	var priceLength = 0;
	
		priceLength = thePrice.length;
		
		var counter = 0;
	
		for(var i=priceLength-1; i>0; i--){
			counter++;
			if(counter%3 == 0){
				thePrice = thePrice.insertChar(i, ",");
			}
		}
	
	return thePrice;
}
//END Custom Erik//
//End Custom Herry// JavaScript Document