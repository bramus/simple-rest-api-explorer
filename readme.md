# Simple REST API Explorer

A simple way to showcasing and exploring all endpoints of your RESTful API.

## Configuration

Edit the tad of JavaScript at the bottom of `index.html`

* `baseApiUrl`: Base URL of your API. All endpoints are a subdomain/subpage of this URL. eg. `http://api.website.tld/`
* `apiDataType`: The data type you expect back. Set this to `json` or `jsonp`.
* `apiExtraHeaders`: Extra headers you want to send along with your request. Object Literal formatted. Provide an empty object if no headers need to be sent. eg. an API-Key or authentication token: `{'X-API-Key':'1234567890'}`
* `apiUrlSuffix`: Extra suffix to add to each URL called. eg. an API-Key or authentication token: `'&token=1234567890'`

## Notes

* Only tested with APIs returning JSON or JSONP.
* Custom headers don't work with JSONP. If you do need both JSONP *and* an API-Key: ask your API provider to enable CORS so you can switch to JSON.
* Only `GET` supported (for now?)

Built by Bramus! - http://www.bram.us/(http://www.bram.us/)

Powered by Highlight.js(http://softwaremaniacs.org/soft/highlight/en/) and Skeleton(http://www.getskeleton.com/)