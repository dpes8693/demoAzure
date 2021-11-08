//ADT2MapByQuery
const axios = require('axios');
module.exports = async function (context, req) {
    const query = req.body.query
    const params = new URLSearchParams();
	params.append('grant_type', 'client_credentials');
	params.append('client_id', "c2880b35-28fb-44eb-957d-b0c2241b50b6");
	params.append('resource', "https://digitaltwins.azure.net")
	params.append('client_secret', "e0a770de-c857-4609-be3f-a52db189e7a6")
	const url = "https://login.microsoftonline.com/91c2e6c6-8af9-444c-a2ed-94c579eaeb56/oauth2/token"
	const token_response = await axios.post(url, params);
    
    const request_body = {
        "query": query
    }
    const response = await axios.post(`https://DigitalTwinsResource.api.wcus.digitaltwins.azure.net/query?api-version=2020-10-31`, request_body, {
        headers: {
            "Authorization" : token_response.data.token_type + " " + token_response.data.access_token
        }
        });
    context.res = {
        status: 200,
        body: response.data
    };
}