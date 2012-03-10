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
			$('#result').text(JSON.stringify(data, null, 4));
			hljs.highlightBlock($('#result').get(0),'    ');
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

// JSON.Stringify
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};