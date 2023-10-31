/* eslint-disable no-unused-vars */
import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import NaoEncontrado from "../Erros/NaoEncontrado.js";

class LivroControler {

  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);

      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);

      } else {
        next(new NaoEncontrado("Id do livro nao localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro (req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message : "criado com sucesso", livro : novoLivro });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro (req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await livro.findByIdAndUpdate(id, req.body);
      
      if (livroResultado !== null) {
        res.status(200).json({ message: "livro atualizado"});

      } else{
        next(new NaoEncontrado("Id do livro nao encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirLivro (req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await livro.findByIdDelete(id);
      
      if(livroResultado !== null) {
        res.status(200).json({ message: "livro exluido com sucesso"});

      } else{
        next(new NaoEncontrado ("Id do livro nao encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorEditora (req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }


}

export default LivroControler;