'use strict'

var soap = require('soap');

class SoapController {

    async index ({ request, response, view }) {
        
        var url = 'http://smn.cna.gob.mx/?method=1';
        var data = [];

        await soap.createClient(url, function(err, client) {
            client.MyFunction(args, function(err, result) {
                data.push(result);
                return response.json(result)
            });
        });

        
      }
}

module.exports = SoapController
