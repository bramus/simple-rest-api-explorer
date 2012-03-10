jQuery(function($) {
	
	var makeCall = function(apiUrl, requestMethod, extraData) {
		
		// show spinnner
		$('#loading').show();
		
		// make the call
		$.ajax({
			url : apiUrl + apiUrlSuffix,
			type: requestMethod,
			dataType : apiDataType,
			headers: apiExtraHeaders,
			data : extraData
		}).success(function(data, textStatus, jqXHR) {
			$.JSONView(data, $('#result').empty());
			$('#loading').hide();
		}).error(function(jqXHR, textStatus, errorThrown) {
			alert('Oops, something went wrong while processing your request! Please refresh!');
			$('#loading').hide();
		});
	}
	
	// hook sidebar clicks
	$('#sidebar').on('click', 'a', function(e) {
		e.preventDefault();
		if ($('#loading').is(':hidden')) {
			$('#sidebar a').removeClass('active');
			$(this).addClass('active');
			$('#apiurl').val(apiBaseUrl + $(this).attr('href'));
			makeCall(apiBaseUrl + $(this).attr('href'), $(this).data('requestmethod') || 'get', $(this).data('extradata') || {});
		}
	});
		
	// don't send forms
	$('form').on('submit', function(e){
		e.preventDefault();
		
		if ($('#apiurl').val().indexOf(apiBaseUrl) == 0)
			makeCall($('#apiurl').val());
		else
			alert('You are only allowed make calls to ' + apiBaseUrl);
			
	});
	
	// prefill on load
	$('#sidebar a:first').trigger('click');
	
});