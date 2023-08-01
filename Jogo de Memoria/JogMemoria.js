const cartas = document.querySelectorAll(".cartas");// Todas as Cartas
let Placar =  document.querySelector(".Placar");
const novoJogo = document.querySelector(".newGame");
let timer = document.querySelector(".timer");
let message = document.querySelector(".message");

let bloqueiarCartas = false;
let cartaViradas = 0;
let numeroDeCombina = 0;
let primeiraCarta, segundaCarta;
var intervalo;
var espera;

// Minhas Funções
function VirarCartas(){
    if(cartaViradas >= 2){
        return;
    }else{
        this.classList.add('rotação');
        cartaViradas++;
    }
    if(cartaViradas === 1){
        primeiraCarta = this;
    }else{
        segundaCarta = this;
        VerificarCorrespondencia();
    }
}
function VerificarCorrespondencia(){
    if(primeiraCarta.dataset.id === segundaCarta.dataset.id){
        DesativarCartas();
        VerificarVictoria();
        cartaViradas = 0;
        return;
    }
    TaparCarta();
}
function VerificarVictoria(){
    numeroDeCombina++;
    if(numeroDeCombina === 4){
        cartas.forEach(carta => {
            carta.removeEventListener('click', VirarCartas);
        });
        Placar.setAttribute("style","display:flex");
        clearInterval(intervalo);
        clearTimeout(espera);
    }
}
function DesativarCartas(){
    primeiraCarta.removeEventListener('click', VirarCartas);
    segundaCarta.removeEventListener('click', VirarCartas);
}
function TaparCarta(){
    setTimeout(() => {
        primeiraCarta.classList.remove('rotação');
        segundaCarta.classList.remove('rotação');
        cartaViradas = 0;
    }, 1500);
}
function BaralharCartas(){
    cartas.forEach(carta => {
        let PosAleatoria = Math.floor(Math.random()* 8);
        carta.style.order = PosAleatoria;
    });
}
/// =========================================
function contagemRegressiva(){
let count = 60;
function Saida(){

    if(count >=0){
        if (count < 20){
            timer.setAttribute("style", "color:red");
            timer.innerHTML =" Tempo: "+count+"s";
        }else{
            timer.innerHTML =" Tempo: "+count+"s";
        }
        count --; 
    } 
}
intervalo = setInterval(Saida, 500);
console.log("fim da contagem");
}
BaralharCartas();
contagemRegressiva();
espera = setTimeout(() =>{
    cartas.forEach(carta => {
        carta.removeEventListener('click', VirarCartas);
        carta.classList.add('rotação');
    });
    message.innerHTML = "Esgotou o Tempo!!";
    Placar.setAttribute("style","display:flex");
},30000)
novoJogo.addEventListener("click", () =>{
    location.reload();
})
// Evento Click de todas as cartas
cartas.forEach(carta => carta.addEventListener("click", VirarCartas));