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
    atores: [String],
    detalhes: Object
});

const Serie = mongoose.model('series', filmeSchema);

router.get('/series', async (req, res) => {
    try {
        const series = await Serie.find();
        res.json(series);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/series', async (req, res) => {
    const { titulo, genero, ano, nota, disponivel, plataformas, atores, detalhes } = req.body;
    const novaSerie = new Serie({
        titulo,
        genero,
        ano,
        nota,
        disponivel,
        plataformas,
        atores,
        detalhes
    });
    try {
        const serieSalva = await novaSerie.save();
        res.status(201).json(serieSalva);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/series/:id', async (req, res) => {
    try {
        const serieRemovida = await Serie.findByIdAndDelete(req.params.id);
        if (!serieRemovida) {
            return res.status(404).json({ message: 'Série não encontrada' });
        }
        res.json({ message: 'Série removida com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/series/:id', async (req, res) => {
    try {
        const serieAtualizada = await Serie.findByIdAndUpdate
        (req.params.id, req.body, {
            new: true
        });
        if (!serieAtualizada) {
            return res.status(404).json({ message: 'Série não encontrada' });
        
        }
        res.json(serieAtualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;