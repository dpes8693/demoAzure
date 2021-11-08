const axios = require('axios');
module.exports = async function (context, req) {
    const unit_name = req.body.unit_name
    const params = new URLSearchParams();
	params.append('grant_type', 'client_credentials');
	params.append('client_id', "<client_id>");
	params.append('resource', "https://digitaltwins.azure.net")
	params.append('client_secret', "<client_secret>")
	const url = "https://login.microsoftonline.com/<tenant ID>/oauth2/token"
	const token_response = await axios.post(url, params);
    
    const response = await axios.get(`https://<Digital Twins Host Name>/digitaltwins/${unit_name}?api-version=2020-05-31-preview`, {
        headers: {
            "Authorization" : token_response.data.token_type + " " + token_response.data.access_token
        }
        });
    context.res = {
        body: response.data
    };
}