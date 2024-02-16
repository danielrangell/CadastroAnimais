const btnListar = document.querySelector("#btnListar");
const lstAnimais = document.querySelector("#lstAnimais");

let listar = async function(){
    let resp = await fetch("http://localhost:3000/animais");
    let animais = await resp.json();
    animais.forEach(anim => {       
        let li = document.createElement("li");
        li.textContent = `${anim.nome} - ${anim.proprietario} - ${anim.dtnascimento}}`;
        lstAnimais.appendChild(li);
    });
};

listar();