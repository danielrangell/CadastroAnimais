import { BASEURL } from "./const.js";


function rowAnim(pAnimal) {
    return `
        <tr>
            <td>${pAnimal.id}</td>
            <td>${pAnimal.nome}</td>
            <td>${pAnimal.proprietario}</td>
            <td>${new Date(pAnimal.dtnascimento).toLocaleDateString('pt-BR')}</td>
            <td> 
            <button type="button" class="btn-alterar" data-id=${pAnimal.id}>Alterar</button>
            <button type="button" class="btn-excluir" data-id=${pAnimal.id} id="btnExcluir">Excluir</button>
          </td>
        </tr>
    `;
}

function carregarAnimais() {
    const tabAnim = document.querySelector("tbody");
    tabAnim.innerHTML = "";
    fetch(`${BASEURL}/animais`)
        .then(result => result.json())
        .then(animais => {
            animais.forEach(anim => {
                tabAnim.innerHTML += rowAnim(anim);
            });
            associaEventos();
        });
}

carregarAnimais();

function associaEventos() {
    const frmAnim = document.querySelector("#frmAnim");
    frmAnim.onsubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let anim = {};

        formData.forEach((value, key) => anim[key] = value);

        if (frmAnim.dataset.id)
            anim.id = frmAnim.dataset.id;

        let dados = JSON.stringify(anim);

        fetch(`${BASEURL}/animais`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "post",
                body: dados
            })
            .then(request => request.text())
            .then(resp => {

                if (resp.toUpperCase() == "OK") {
                    window.location.reload();
                    carregarAnimais();
                    console.log(resp);
                } else {
                    alert("Erro ao enviar formulario " + resp);
                }
            })
    }

    let btnsAlterar = document.querySelectorAll(".btn-alterar");
    btnsAlterar.forEach(btn => {
        btn.onclick = (e) => {

            let id = e.target.dataset.id;

            fetch(`${BASEURL}/animais/${id}`)
                .then(res => res.json())
                .then(anims => {
                    let anim = anims[0];
                    let frmAnim = document.querySelector("#frmAnim");
                    frmAnim.querySelector("#inpNome").value = anim.nome;
                    frmAnim.querySelector("#inpDataNascimento").value = anim.dtnascimento;
                    frmAnim.querySelector("#inpProprietario").value = anim.proprietario;

                    frmAnim.dataset.id = anim.id;
                    let cadastroAnimal = document.querySelector("#frmCadastroAnimal");
                    $(cadastroAnimal).modal("show");

                    console.log(cadastroAnimal);


                });

        }
    });
    let btnsExcluir = document.querySelectorAll(".btn-excluir");
    btnsExcluir.forEach(btn => {
        btn.onclick = (e) => {
            let btnExcluir = document.querySelector("#btnExcluir");
            btnExcluir.dataset.id = e.target.dataset.id;

            btnExcluir.onclick = (e) => {

                let id = e.target.dataset.id;

                fetch(`${BASEURL}/animais/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        method: "DELETE"
                    })
                    .then(request => request.text())
                    .then(resp => {
                        if (resp.toUpperCase() == "OK") {
                            window.location.reload();

                        }
                    });
            }
        }
    });


}