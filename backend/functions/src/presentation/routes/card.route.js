const CardService = require('../../domain/services/card.service');
const { Router } = require('express');
const cardsRouter = Router();

cardsRouter.post('/cards/:multiverseId', async (req, res) => {
  const { multiverseId } = req.params;

  if (!req.body.multiverseId) {
    req.body.multiverseId = multiverseId;
  }

  try {
    const card = await CardService.save(req.body);
    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, message: "I'm too lazy to properly handle" + ' error' });
  }
});

cardsRouter.get('/cards', async (req, res) => {
  try {
    const cards = await CardService.findAll();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, message: "I'm too lazy to properly handle" + ' error' });
  }
});

module.exports = { cardsRouter };
