import {BASEURL} from "./const.js";

function rowProd(pAnimal){
    return `
        <tr>
            <td>${pAnimal.id}</td>
            <td>${pAnimal.nome}</td>
            <td>${pAnimal.proprietario}</td>
            <td>${pAnimal.dtnascimento}</td>
            <td> 
            <button type="button" class="btn btn-primary btn-alterar" data-id=${pAnimal.id} >Alterar</button> 
            <button type="button" class="btn btn-danger btn-excluir" data-id=${pAnimal.id}>Excluir</button>
          </td>
        </tr>
    `;
}

function carregarAnimais(){
    const tabProd = document.querySelector("tbody");
    tabProd.innerHTML = "";
    fetch(`${BASEURL}/animais`)
    .then(result => result.json())
    .then(animais => {
        animais.forEach(prod => {
            tabProd.innerHTML += rowProd(prod);            
        }); 
        associaEventos();
    });
}

carregaProdutos();

function associaEventos(){
    const frmProd = document.querySelector("#frmProd");
    frmProd.onsubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let prod = {};

        formData.forEach((value,key) => prod[key] = value);
       
        if(frmProd.dataset.id)
          prod.id = frmProd.dataset.id;
        
        let dados = JSON.stringify(prod);

        fetch(`${BASEURL}/produtos`,
        {
            headers:{
                "Content-Type": "application/json"
            },
            method:"post",
            body:dados
        })
        .then(request => request.text())
        .then(resp => {
            
            if(resp.toUpperCase() == "OK"){
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

            fetch(`${BASEURL}/produtos/${id}`)
            .then(res => res.json())
            .then(prods => {
                let prod = prods[0];
                let frmProd = document.querySelector("#frmProd");
                frmProd.querySelector("#inpDescricao").value = prod.descricao;
                frmProd.querySelector("#inpValor").value = prod.valor;

                frmProd.dataset.id = prod.id;

                let cadastroProduto = document.querySelector("#frmCadastroProduto");
                $(cadastroProduto).modal("show");
                console.log(cadastroProduto);
            });
            
        }
    });

    let btnsExcluir = document.querySelectorAll(".btn-excluir");
    btnsExcluir.forEach(btn => {
        btn.onclick = (e) => {

            $("#frmExcluirProduto").modal("show");

            let btnExcluirModal = document.querySelector("#btnExcluirModal");
            btnExcluirModal.dataset.id = e.target.dataset.id;

            btnExcluirModal.onclick = (e) => {
                
                let id = e.target.dataset.id;

                fetch(`${BASEURL}/produtos/${id}`,
                { 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "DELETE"             
                })
                .then(request => request.text())                   
                .then(resp => {
                    if(resp.toUpperCase() == "OK"){
                        window.location.reload();
                        $("#frmExcluirProduto").modal("hide");
                        
                    }
                });
            }         
        }
    }); 
}