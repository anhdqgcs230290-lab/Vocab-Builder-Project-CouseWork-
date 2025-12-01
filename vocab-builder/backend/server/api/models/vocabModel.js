const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VocabSchema = new Schema(
    {
        english: {
            type: String,
            required: 'English word cannot be blank'
        },
        german: {
            type: String,
            required: 'German word cannot be blank'
        },
        vietnamese: {
            type: String,
            required: 'Vietnamese word cannot be blank'
        },
        partOfSpeech: {
            type: String,
            enum: ['noun', 'verb', 'adjective', 'adverb'],
            default: 'noun',
            required: 'Part of speech cannot be blank'
        }
    },
    { collection: 'vocab' }
);

module.exports = mongoose.model('Vocab', VocabSchema);
