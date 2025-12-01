const vocabController = require('../controllers/vocabController');

module.exports = (app) => {
    app
        .route('/api/vocab')
        .get(vocabController.list_All_words)
        .post(vocabController.create_a_word);

    app
        .route('/api/vocab/:vocabId')
        .get(vocabController.read_a_word)
        .put(vocabController.update_a_word)
        .delete(vocabController.delete_a_word);
};