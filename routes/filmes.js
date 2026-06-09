const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const filmeSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    ano: Number,
    nota: Number,
    disponivel: Boolean,
    plataformas: [String],
    diretor: String,
    detalhes: Object
});

const Filme = mongoose.model('filmes', filmeSchema);
router.get('/filmes', async (req, res) => {
    try {
        const filmes = await Filme.find();
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/filmes', async (req, res) => {
    const { titulo, genero, ano, nota, disponivel, plataformas, diretor, detalhes } = req.body;
    const novoFilme = new Filme({
        titulo,
        genero,
        ano,
        nota,
        disponivel,
        plataformas,
        diretor,
        detalhes
    });
    try {
        const filmeSalvo = await novoFilme.save();
        res.status(201).json(filmeSalvo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/filmes/:id', async (req, res) => {
    try {
        const filmeRemovido = await Filme.findByIdAndDelete(req.params.id);
        if (!filmeRemovido) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }
        res.json({ message: 'Filme removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/filmes/:id', async (req, res) => {
    try {
        const filmeAtualizado = await Filme.findByIdAndUpdate
        (req.params.id, req.body, { new: true });
        if (!filmeAtualizado) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }
        res.json(filmeAtualizado);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;