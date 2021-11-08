const axios = require('axios');
module.exports = async function (context, req) {
    const query = req.body.query
    const params = new URLSearchParams();
	params.append('grant_type', 'client_credentials');
	params.append('client_id', "<client_id>");
	params.append('resource', "https://digitaltwins.azure.net")
	params.append('client_secret', "<client_secret>")
	const url = "https://login.microsoftonline.com/<tenant_id>/oauth2/token"
	const token_response = await axios.post(url, params);
    
    const request_body = {
        "query": query
    }
    const response = await axios.post(`https://<Digital Twins Host Name>/query?api-version=2020-10-31`, request_body, {
        headers: {
            "Authorization" : token_response.data.token_type + " " + token_response.data.access_token
        }
        });
    context.res = {
        status: 200,
        body: response.data
    };
}