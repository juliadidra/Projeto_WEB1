var servicos_selecionados = [];
var botoes_remove_servico;


var services = [
    {
        nome_servico: "Coloração",
        imagem: "./assets/coloracao.jpg",
        preco: 80.00,
    },
    {
        nome_servico: "Corte",
        imagem: "./assets/corte.jpg",
        preco: 45.00,
    },
    {
        nome_servico: "Maquiagem",
        imagem: "./assets/maquiagem.jpeg",
        preco: 120.00,
    },
    {
        nome_servico: "Botox",
        imagem: "./assets/botox.jpg",
        preco: 90.00,
    },
    {
        nome_servico: "Escova",
        imagem: "./assets/escova.jpg",
        preco: 50.00,
    },
    {
        nome_servico: "Hidratação",
        imagem: "./assets/hidratacao.jpg",
        preco: 40.00,
    },
]

const botao_carrinho = document.getElementsByClassName("button-carrinho")[0]
const div_modal = document.querySelector('.modal')
const modal_nome_servico = document.getElementById('modal-nome-servico')
const modal_preco = document.getElementById('modal-preco')
const modal_img = document.getElementById('modal-img')
const lista_servicos = document.getElementsByClassName("lista-serviços")[0]
const botao_compra = document.getElementById("botao-popup")

const modal_input_date = document.getElementById("input-data")
const modal_input_time = document.getElementById("input-horario")

const body = document.getElementsByTagName("body")[0];

const modal_cart = document.getElementsByClassName("modal-cart")[0];
const lista_cart = document.getElementsByClassName("lista-cart")[0];
const text_preco_cart = document.getElementById("soma-precos");
const botao_finalizar_compra = document.getElementById("botao-cart-comprar");

const botao_fechar = document.querySelectorAll(".close-button");
const botao_cadastro = document.getElementsByClassName("botao-cadastro")[0];
const modal_cadastro = document.getElementsByClassName("modal-cadastro")[0];
const cancelar_cadastro = document.getElementsByClassName("cancelar-cadastro")[0];
const botao_cadastrar_servico = document.getElementById("botao-cadastrar-servico");
const input_nome = document.getElementById("input-nome");
const input_preco = document.getElementById("input-preco");
const input_link_img = document.getElementById("input-link-img");

botao_cadastro.addEventListener('click', () => {
    modal_cadastro.classList.toggle("active");
});

cancelar_cadastro.addEventListener('click', () => {
    modal_cadastro.classList.remove("active");
})

botao_cadastrar_servico.addEventListener('click', (e) =>{
    if(input_nome.value === "" || input_preco.value === NaN || input_link_img.value === ""){
        window.alert('insira os dados corretamente!')

    } 
    
    else{
        var obj = {'nome_servico': input_nome.value, 'preco': parseFloat(input_preco.value), 'imagem': input_link_img.value};
        services.push(obj);

        showServices();
        
    }
    

})


botao_carrinho.addEventListener("click", () => {
    modal_cart.classList.toggle("active");

    showCartList();
})

botao_fechar.forEach(button => {
    button.addEventListener("click", () => {
        div_modal.classList.remove("active");
        modal_cart.classList.remove("active");
    })
});



function showServices() {
    lista_servicos.innerHTML = null;

    services.forEach(s => {
        lista_servicos.innerHTML += `<li class="serviços">
        <div class="div-servico">
            <img class="img-servico" src=${s.imagem} alt=${s.nome_servico}>
            <p class="text-servico" >${s.nome_servico}</p>
            <p class="text-valor"> R$ ${s.preco.toFixed(2)}</p>
            <a class="id-botao-agendar botao" >
                <p class="text-botao-servico">Agendar</p><i class="fa-solid fa-plus"></i>
            </a>
        </div>
    </li>`
    });

    const botao_agendar = document.querySelectorAll(".botao")

    botao_agendar.forEach((b, i) => {
        b.addEventListener('click', e => {
            e.preventDefault();
            modal_img.src = services[i].imagem;
            modal_nome_servico.innerText = services[i].nome_servico;
            modal_preco.innerText = "R$ " + services[i].preco.toFixed(2);
            div_modal.classList.toggle("active");
        })
    });
    
}

showServices();



const botao_agendar_popup = document.getElementById("botao-popup");

botao_agendar_popup.addEventListener("click", () => {

    const date = modal_input_date.value;
    const time = modal_input_time.value;

    if(modal_input_date.value == "" || modal_input_time.value == ""){
        window.alert('insira os dados!')
    }
    else{
        
        div_modal.classList.remove("active")
        let servico = services.find(s => s.nome_servico === modal_nome_servico.innerText);
        modal_cart.classList.toggle("active")

        servico.date = date;
        servico.time = time;
        
        servicos_selecionados.push(servico);

        
    }
    
    showCartList();
    
});

function showCartList() {
    lista_cart.innerHTML = null;

    if(servicos_selecionados.length === 0) {
        lista_cart.innerHTML = "<li class='item-cart'>Seu Carrinho está vazio!</li>";    
        text_preco_cart.innerText = "Total: R$ 0";

        botao_finalizar_compra.disabled = true
    }
    else {
        botao_finalizar_compra.disabled = false
        var soma_valor_servico = 0;
        servicos_selecionados.forEach(s => {
            let date = new Date(s.date);

            //estava retornando 1 dia a menos!
            date.setDate(date.getDate() + 1);
            let dateString = date.toLocaleDateString();

            soma_valor_servico += s.preco;

            lista_cart.innerHTML += `<li class="item-cart">
                <div>
                    <p class="text-cart"> ${s.nome_servico}</p>
                    <p class="date-cart"> ${dateString}</p>
                    <p class="time-cart"> ${s.time}</p>
                    <p class="text-preco-cart">R$ ${s.preco.toFixed(2)}</p>
                </div>
                <button name="${s.nome_servico}" class="remove-servico-cart"><i class="fa-regular fa-trash-can"></i></button> 
            </li>`

            text_preco_cart.innerText = "Total: R$ " + soma_valor_servico.toFixed(2);
        })
    }

    botoes_remove_servico = document.querySelectorAll(".remove-servico-cart");

    botoes_remove_servico.forEach(b => {
        b.addEventListener("click", e => {
            if(window.confirm(`Tem certeza que quer excluir o serviço ${e.target.name}`)) {
                let index = servicos_selecionados.findIndex(s => {
                    s.nome_servico === e.target.name;
                });
                servicos_selecionados.splice(index, 1);
                showCartList()
            }
        })
    });


}

botao_finalizar_compra.addEventListener('click', () => {
    servicos_selecionados = [];
    showCartList();

    window.alert("Compra finalizada com sucesso!")
})
