const Mongoose = require('../../../data/mongoose');
const CardRepository = require('../card.repository');
const Teferi = require('../../../data/__test__/fixtures/mtgJSON/teferi');

describe('Card Repository', () => {
  beforeAll(async () => {
    const mongoUrl = 'mongodb://admin:admin@localhost/admin';
    const connection = await Mongoose.connect(mongoUrl);
    if (!connection) {
      throw new Error('Unable to connect ', mongoUrl);
    }
  });

  it('saves and retrieve given card, from MTGJSON representation to our own representation', async () => {
    await CardRepository.save(Teferi);
    const foundCard = await CardRepository.findByUUID(Teferi.uuid);

    expect(foundCard.uuid).toEqual(Teferi.uuid);
  });
});
