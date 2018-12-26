const mongoose = require('mongoose');
const { parserOptions } = require('../');
const Schema = mongoose.Schema;

const colors = [
  {
    type: String,
    enum: ['W', 'R', 'U', 'B', 'G'],
  },
];

const foreignDataSchema = new Schema({
  flavorText: String,
  language: String,
  multiverseId: Number,
  name: String,
  text: String,
  type: String,
},);

// https://mtgjson.com/docs.html
const schema = new Schema({
  convertedManaCost: Number,
  manaCost: String,
  faceConvertedManaCost: Number,
  name: String,
  names: [String],
  text: String,
  originalText: String,
  flavorText: String,
  printings: [String],
  scryfallId: String,
  tcgplayerProductId: String,
  supertypes: [String],
  type: String,
  originalType: String,
  types: [String],
  uuid: String,
  artist: String,
  duelDeck: String,
  hasFoil: Boolean,
  hasNonFoil: Boolean,
  isAlternative: Boolean,
  isFoilOnly: Boolean,
  isOnlineOnly: Boolean,
  isOversized: Boolean,
  isReserved: Boolean,
  isTimeshifted: Boolean,
  loyalty: String,
  multiverseId: Number,
  number: Number,
  power: String,
  starter: Boolean,
  toughness: String,
  variations: [String],
  watermark: String,
  colors,
  colorIdentity: colors,
  rulings: [
    {
      date: Date,
      text: String,
    },
  ],
  borderColor: [
    {
      type: String,
      enum: ['black', 'borderless', 'gold', 'silver', 'white'],
    },
  ],
  rarity: [
    {
      type: String,
      enum: ['basic', 'common', 'uncommon', 'rare', 'mythic'],
    },
  ],
  side: [
    {
      type: String,
      enum: ['a', 'b', 'c'],
    },
  ],
  foreignData: [foreignDataSchema],
  layout: [
    {
      type: String,
      enum: [
        'normal',
        'split',
        'flip',
        'transform',
        'meld',
        'leveler',
        'saga',
        'planar',
        'scheme',
        'vanguard',
        'token',
        'double_faced_token',
        'emblem',
        'augment',
        'host',
      ],
    },
  ],
  legalities: [
    {
      // Possible values format
      // '1v1', 'brawl', 'commander', 'duel', 'frontier', 'future', 'legacy', 'modern', 'pauper', 'penny', 'standard', 'vintage'
      type: Map,
      of: ['Legal', 'Restricted', 'Banned', 'Future'],
    },
  ],
});

schema.set('toJSON', parserOptions);
schema.set('toObject', parserOptions);

const collectionName = 'Card';

module.exports = {
  CardModel: mongoose.model(collectionName, schema),
};