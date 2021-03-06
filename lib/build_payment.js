var Client = require('ripple-rest-client');
var gateway = require(__dirname+'/../');

var client = new Client({
  api: gateway.config.get('RIPPLE_REST_API'),
  account: gateway.config.get('gateway_hot_wallet').address,
  secret: gateway.config.get('gateway_hot_wallet').secret,
});

function buildPayment(recipient, amount, currency, fn) {
  var newPayment = {
    currency: currency.toUpperCase(),
    amount: amount,
    recipient: recipient
  };

  if (!currency == 'XRP') {
    newPayment.issuer = gateway.config.get('gateway_cold_wallet');
  }

  client.buildPayment(newPayment, function(err, resp) {
    if (err) { fn(err, null); return };
    if (resp.success) {
      fn(null, resp.payments[0]);  
    } else {
      fn(resp.error, null);
    }
  })
}

module.exports = buildPayment;

