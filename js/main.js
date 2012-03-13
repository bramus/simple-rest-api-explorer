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
			$.JSONView(data, $('#result'));
			$('#loading').hide();
		}).error(function(jqXHR, textStatus, errorThrown) {
			alert('Oops, something went wrong while processing your request! Please refresh!');
			$('#loading').hide();
		});
	}
	
	// hook sidebar clicks
	$('#sidebar').on('click', 'a', function(e, dontpush) {
		e.preventDefault();
		if ($('#loading').is(':hidden')) {
			$('#sidebar a').removeClass('active');
			$(this).addClass('active');
			var url = $(this).attr('href');
			$('#apiurl').val(apiBaseUrl + url);
			!dontpush && history.pushState({'href': url}, 'clicked ' + url, '#' + url);
			makeCall(apiBaseUrl + url, $(this).data('requestmethod') || 'get', $(this).data('extradata') || {});
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
	
	// History Popstate
	$(window).on('popstate', function(e) {
		e.preventDefault();
		$('#sidebar a').removeClass('active');
		if (e.originalEvent.state && e.originalEvent.state.href) {
			$('#sidebar a[href="' + e.originalEvent.state.href + '"]').trigger('click', true);
		} else {
			if (window.location.hash) {
				$('#sidebar a[href="' + window.location.hash.substr(1) + '"]').trigger('click', true);
			} else {
				$('#sidebar a:first').addClass('active').trigger('click', true);
			}
		}
	});
	
});