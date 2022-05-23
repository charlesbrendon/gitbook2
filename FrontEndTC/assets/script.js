const baseUrl = "http://localhost:3000/paletas";

async function findAllPaletas() {
  const response = await fetch(`${baseUrl}/todas-paletas`);

  const paletas = await response.json();

  paletas.forEach(function (paleta) {
    document.querySelector("#paletaList").insertAdjacentHTML(
      "beforeend",
      `
      <div class="PaletaListaItem" id="PaletaListaItem_${paleta.id}">
         <div>
              <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
              <div class="PaletaListaItem__preco">R$ ${paleta.preco}</div>
              <div class="PaletaListaItem__descricao">${paleta.descricao}</div>

              <div class="PaletaListaItem__acoes Acoes">
                <button class="Acoes__Editar btn" onclick="abrirModal(${paleta.id})">Editar</button>
                <button class="Acoes__Apagar btn" onclick="abrirModalDelete(${paleta.id})">Apagar</button>
              </div>

        </div>

            <img class="PaletaListaItem__foto" src="${paleta.foto}" alt="Paleta de ${paleta.sabor}" />
              
      </div>
      `
    );
  });
}

async function findByIdPaletas() {
  const id = document.querySelector("#idPaleta").value;

  const response = await fetch(`${baseUrl}/paleta/${id}`);
  const paleta = await response.json();

  const paletaEscolhidaDiv = document.querySelector("#paletaEscolhida");

  paletaEscolhidaDiv.innerHTML = `
  <div class="PaletaListaItem" id="PaletaListaItem_${paleta.id}">
     <div>
          <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
          <div class="PaletaListaItem__preco">R$${paleta.preco}</div>
          <div class="PaletaListaItem__descricao">${paleta.descricao}</div>

          <div class="PaletaListaItem__acoes Acoes">
            <button class="Acoes__Editar btn" onclick="abrirModal(${paleta.id})">Editar</button>
            <button class="Acoes__Apagar btn" onclick="abrirModalDelete(${paleta.id})">Apagar</button>
          </div>

    </div>

        <img class="PaletaListaItem__foto" src="${paleta.foto}" alt="Paleta de ${paleta.sabor}" />
          
  </div>
  `;
}

findAllPaletas(); 

async function abrirModal(id = null) {
  if (id != null) {
    document.querySelector("#title-header-modal").innerText =
      "Atualizar Cadastro da Paleta";
    document.querySelector("#button-form-modal").innerText = "Atualizar";

    const response = await fetch(`${baseUrl}/paleta/${id}`);
    const paleta = await response.json();

    document.querySelector("#id").value = paleta.id;
    document.querySelector("#sabor").value = paleta.sabor;
    document.querySelector("#preco").value = paleta.preco;
    document.querySelector("#descricao").value = paleta.descricao;
    document.querySelector("#foto").value = paleta.foto;
  } else {
    document.querySelector("#title-header-modal").innerText =
      "Cadastrar uma Paleta";
    document.querySelector("#button-form-modal").innerText = "Cadastrar";
  }

  document.querySelector("#overlay").style.display = "flex";
}

function fecharModal() {
  document.querySelector(".modal-overlay").style.display = "none";

  document.querySelector("#sabor").value = "";
  document.querySelector("#preco").value = 
  document.querySelector("#descricao").value = "";
  document.querySelector("#foto").value = "";
}

async function createPaleta() {
  const id = document.querySelector("#id").value;
  const sabor = document.querySelector("#sabor").value;
  const preco = document.querySelector("#preco").value;
  const descricao = document.querySelector("#descricao").value;
  const foto = document.querySelector("#foto").value;

  const paleta = {
    id,
    sabor,
    preco,
    descricao,
    foto,
  };

  const modoEdicaoAtivado = id > 0;

  const endpoint = baseUrl + (modoEdicaoAtivado ? `/update/${id}` : `/create`);

  const response = await fetch(endpoint, {
    method: modoEdicaoAtivado ? "put" : "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const novapaleta = await response.json();

  const html = `
  <div class="PaletaListaItem" id="PaletaListaItem_${paleta.id}">
     <div>
          <div class="PaletaListaItem__sabor">${novapaleta.sabor}</div>
          <div class="PaletaListaItem__preco">R$${novapaleta.preco}</div>
          <div class="PaletaListaItem__descricao">${novapaleta.descricao}</div>

          <div class="PaletaListaItem__acoes Acoes">
            <button class="Acoes__Editar btn" onclick="abrirModal(${novapaleta.id})">Editar</button>
            <button class="Acoes__Apagar btn" onclick="abrirModalDelete(${novapaleta.id})">Apagar</button>
          </div>

    </div>

        <img class="PaletaListaItem__foto" src="${novapaleta.foto}" alt="Paleta de ${novapaleta.sabor}" />
          
  </div>
  `;
  if (modoEdicaoAtivado) {
    document.querySelector(`#PaletaListaItem_${id}`).outerHTML = html;
  } else {
    document.querySelector("#paletaList").insertAdjacentHTML("beforeend", html);
  }

  document.getElementById("paletaList").innerHTML = "";

  fecharModal();  
}

function abrirModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";
  const btnSim = document.querySelector(".btn_delete_yes");

  btnSim.addEventListener("click", function () {
    deletePaleta(id);
  });
}

function fecharModalDelete() {
  document.querySelector("#overlay-delete").style.display = "none";
}

async function deletePaleta(id) {
  const response = await fetch(`${baseUrl}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",    
  });

  const result = await response.json();
  alert(result.message);

  document.getElementById("paletaList").innerHTML = "";

  fecharModalDelete();
  findAllPaletas();
}
