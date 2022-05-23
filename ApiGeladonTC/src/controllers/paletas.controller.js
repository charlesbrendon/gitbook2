const paletasService = require('../services/paletas.service')

const findAllPaletasController = (req, res) =>{
    const paletas = paletasService.findAllPaletasService();

    if(paletas.length == 0){
        return res.status(404).send({message: "Não existe nenhuma paleta cadastrada" })
    }

    res.status(200).send(paletas)
};

const findByIdPaletaController = (req, res) =>{
    const parametroId = +req.params.id;

    if(!parametroId){
        return res.status(400).send({message: "ID Inválido!"})
    }

    const escolhaPaleta = paletasService.findByIdPaletaService(parametroId);

    if(!escolhaPaleta){
        return res.status(404).send({message: "ID da paleta não encontrada!"})
    }

    res.send(escolhaPaleta);
};

const createPaletaController = (req, res) => {
    const paleta = req.body;

    if(!paleta || !paleta.sabor || !paleta.descricao || !paleta.preco || !paleta.foto){
        return res.status(400).send({message: "Envie todos os campos da paleta!"})
    }
    const newPaleta = paletasService.createPaletaService(paleta);
    res.status(201).send(newPaleta);

}

const updatePaletaController = (req, res) => {
    const idParam = +req.params.id;
    const paletaEdit = req.body;

    if (!idParam) {
        return res.status(404).send({ message: "Paleta não encontrada!" })
      }
    
      if (!paletaEdit || !paletaEdit.sabor || !paletaEdit.descricao || !paletaEdit.foto || !paletaEdit.preco) {
        return res.status(400).send({ message: "Você não preencheu todos os dados para editar a paleta!" });
      }

    const updatedPaleta = paletasService.updatePaletaService(idParam, paletaEdit);
    res.send(updatedPaleta);
}

const deletePaletaController = (req, res) => {
    const idParam = +req.params.id;
    console.log(paleta.id)
    if (!idParam) {
        return res.status(400).send({ message: "ID Inválido!" })
    }

    paletasService.deletePaletaService(idParam);

    res.send({ message: 'Paleta deletada com sucesso!' }); 
}

module.exports = {
    findAllPaletasController,
    findByIdPaletaController,
    createPaletaController,
    updatePaletaController,
    deletePaletaController,
}
