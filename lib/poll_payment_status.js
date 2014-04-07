var nconf = require("../config/nconf");
var Client = require('ripple-rest-client');

var client = new Client({
    api: 'http://localhost:5990/',
    account: nconf.get('gateway_hot_wallet').address,
    secret: ''
});

function poll(hash, fn){
    client.getPayment(hash, function(err, payment){
        if(err) {
            fn(err, null)
            return;
        } else {
            if(payment){
                fn(null, payment)
            } else {
                setTimeout(function(){
                    poll(hash, fn);
                }, 10000)
            }
        }
    });
}

module.exports = poll;
//poll('04eb9a30-9075-4e5f-ac31-7989cf585119', console.log);