const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

// List all vocabulary words
exports.list_All_words = async (req, res) => {
    try {
        const vocab = await Vocab.find({});
        res.json(vocab);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Create a new vocabulary word
exports.create_a_word = async (req, res) => {
    try {
        const newWord = new Vocab(req.body);
        const vocab = await newWord.save();
        res.json(vocab);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Read a specific vocabulary word by ID
exports.read_a_word = async (req, res) => {
    try {
        const vocab = await Vocab.findById(req.params.vocabId);
        if (!vocab) {
            return res.status(404).send({ message: 'Word not found' });
        }
        res.json(vocab);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update a specific vocabulary word by ID
exports.update_a_word = async (req, res) => {
    try {
        const vocab = await Vocab.findOneAndUpdate(
            { _id: req.params.vocabId },
            req.body,
            { new: true }
        );
        if (!vocab) {
            return res.status(404).send({ message: 'Word not found' });
        }
        res.json(vocab);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Delete a specific vocabulary word by ID
exports.delete_a_word = async (req, res) => {
    try {
        const result = await Vocab.deleteOne({ _id: req.params.vocabId });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Word not found' });
        }
        res.json({ message: 'Word successfully deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
};