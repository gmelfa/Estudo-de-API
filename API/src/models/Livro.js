import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, "O titulo do livro e obrigatorio"] 
  },
  editora: { type: String },
  preco: { type: Number },
  paginas: { type: Number },
  autor: { type: String, 
    required: [true, "O nome do(a) autor(a) e necessario"]
  }
}, { versionKey: false});

const livros = mongoose.model("livros", livroSchema);

export default livros;