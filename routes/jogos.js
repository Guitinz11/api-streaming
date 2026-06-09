const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jogoSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    ano: Number,
    nota: Number,
    disponivel: Boolean,
    plataformas: [String],
    desenvolvedora: String,
    detalhes: Object
});

const Jogo = mongoose.model('jogos', jogoSchema);

router.get('/jogos', async (req, res) => {
    try {
        const jogos = await Jogo.find();
        res.json(jogos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/jogos', async (req, res) => {
    const { titulo, genero, ano, nota, disponivel, plataformas, desenvolvedora, detalhes } = req.body;
    const novoJogo = new Jogo({
        titulo,
        genero,
        ano,
        nota,
        disponivel,
        plataformas,
        desenvolvedora,
        detalhes
    });
    try {
        const jogoSalvo = await novoJogo.save();
        res.status(201).json(jogoSalvo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/jogos/:id', async (req, res) => {
    try {
        const jogoRemovido = await Jogo.findByIdAndDelete(req.params.id);
        if (!jogoRemovido) {
            return res.status(404).json({ message: 'Jogo não encontrado' });
        }   
        res.json({ message: 'Jogo removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/jogos/:id', async (req, res) => {
    try {
        const jogoAtualizado = await Jogo.findByIdAndUpdate(req.params.id, req.body
        , { new: true });
        if (!jogoAtualizado) {
            return res.status(404).json({ message: 'Jogo não encontrado' });
        }
        res.json(jogoAtualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
});


module.exports = router;