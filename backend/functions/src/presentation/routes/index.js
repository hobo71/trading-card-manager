const { Router } = require('express');
const router = Router();
const squareConnect = require('square-connect');
const defaultClient = squareConnect.ApiClient.instance;
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = 'sandbox-sq0atb-QpnNds8xp3pZtRx-5NpkGQ';

const { notFound } = require('./notFound');
const { cardsRouter } = require('./card.route');
const { errorHandler } = require('./errorHandler');

const welcome = {
  title: 'Welcome to MTG Deals',
  message: 'If this is your first time? <br /> <b>Enjoy it!</b>',
};

router.get('/', (req, res) => res.send(process.env.TEST_SECRET || 'Failed'));
router.get('/welcome', (req, res) => res.send(welcome));
router.get('/:userId/welcome', (req, res) => res.send(welcome));

router.post('/test', (req, res) => {
  const stringReq = JSON.stringify(req.body);
  console.log(stringReq);

  res.status(201).json(stringReq);
});

router.post('/process-payment', function(req, res, next) {
  const locationId = 'CBASEBIMvkZYhR526gwNVKD5mpcgAQ';

  const request_params = req.body;

  if (request_params.card_nonce === null) {
    res.status(422).json({ message: 'card_nouce veio null' });
  }

  const idempotency_key = require('crypto')
    .randomBytes(64)
    .toString('hex');

  // Charge the customer's card
  const transactions_api = new squareConnect.TransactionsApi();

  const request_body = {
    card_nonce: request_params.nonce,
    amount_money: {
      amount: 100, // $1.00 charge
      currency: 'USD',
    },
    idempotency_key: idempotency_key,
  };

  transactions_api.charge(locationId, request_body).then(
    function(data) {
      const json = JSON.stringify(data);
      res.status(201).json({
        title: 'Payment Successful',
        result: json,
      });
    },
    function(error) {
      res.status(500).json({
        title: 'Payment Failure',
        result: error.response.text,
        error: error,
      });
    },
  );
});

router.use(cardsRouter);

// These two MUST be the last ones
router.use(notFound);
router.use(errorHandler);

module.exports = { router };
