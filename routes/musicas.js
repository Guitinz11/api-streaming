const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const musicaSchema = new mongoose.Schema({
    titulo: String,
    artista: String,
    genero: String,
    ano: Number,
    duração: Number,
    disponivel: Boolean,
    detalhes: Object
});

const Musica = mongoose.model('musicas', musicaSchema);

router.get('/musicas', async (req, res) => {
    try {
        const musicas = await Musica.find();
        res.json(musicas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/musicas',async (req, res) => {
    const { titulo, artista, genero, ano, duração, disponivel, detalhes } = req.body;
    const novaMusica = new Musica({
        titulo,
        artista,
        genero,
        ano,
        duração,
        disponivel,
        detalhes
    });
    try {
        const musicaSalva = await novaMusica.save();
        res.status(201).json(musicaSalva);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}); 

router.delete('/musicas/:id', async (req, res) => {
    try {
        const musicaRemovida = await Musica.findByIdAndDelete(req.params.id);
        if (!musicaRemovida) {
            return res.status(404).json({ message: 'Música não encontrada' });
        }
        res.json({ message: 'Música removida com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/musicas/:id', async (req, res) => {
    try {
        const musicaAtualizada = await Musica.findByIdAndUpdate
        (req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!musicaAtualizada) {
            return res.status(404).json({ message: 'Música não encontrada' });
        }
        res.json(musicaAtualizada);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;