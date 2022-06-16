let containerPalavras =
	document.getElementsByClassName('container-palavras')[0];
let containerJogo = document.getElementsByClassName('container-jogo')[0];
let containerOpcoes = document.getElementsByClassName('container-opcoes')[0];
let trackerLetras = document.getElementsByClassName(
	'container-tracker-letras-in'
)[0];
let trackerErros = document.getElementsByClassName(
	'container-tracker-letras-erros'
)[0];
let palavraSecreta = document.getElementsByName('palavra')[0];
let dicaPalavra = document.getElementsByName('dica')[0];
let botaoStart = document.getElementsByClassName('startGame')[0];
let resultado = document.getElementsByClassName('resultado')[0];
let dicaDiv = document.getElementsByClassName('container-dica')[0];

let palavras = [
	{ palavra: 'linguica', dica: 'Carne processada comprimida em tripa.' },
	{ palavra: 'taruira', dica: 'Lagartixa do capixaba.' },
	{ palavra: 'caneta', dica: 'Dizem que é azul.' },
	{ palavra: 'lingueta', dica: 'Objeto, peça, com formato de pequena língua.' },
	{ palavra: 'leite', dica: 'Sai das tetas.' },
	{ palavra: 'catarro', dica: 'Amigo do peito.' },
];

let segredo, palavra, dicaSegredo;

let letrasErradas = [];
let letrasCertas = [];
let tentativas = 6;

let tela = document.getElementById('forca');
let pincel = tela.getContext('2d');

const addWords = () => {
	containerOpcoes.style.display = 'none';
	containerPalavras.style.display = 'block';
};

const addWordsMemo = () => {
	if (!palavraSecreta.value || !dicaPalavra.value) {
		return alert('Verifique os campos!');
	}
	palavras.push({ palavra: palavraSecreta.value, dica: dicaPalavra.value });

	containerPalavras.style.display = 'none';
	botaoStart.disabled = false;

	iniciarJogo();
};

const iniciarJogo = () => {
	let posPalavraSorteada = Math.floor(Math.random() * palavras.length);

	segredo = palavras[posPalavraSorteada].palavra;
	dicaDiv.style.display = 'block';
	dicaDiv.innerHTML = `Dica: ${palavras[posPalavraSorteada].dica}`;

	palavra = segredo.split('');

	containerJogo.style.display = 'flex';
	containerOpcoes.style.display = 'none';
	desenhaBase();
	escrevePalavra(palavra);
};

const reinciar = () => {
	location.reload();
};

const escrevePalavra = (palavra) => {
	for (let i = 0; i < palavra.length; i++) {
		let divWord = document.createElement('div');
		trackerLetras.appendChild(divWord).classList.add('div-secret-word');
	}
};

document.addEventListener('keypress', (e) => {
	let tecla = e.key;
	if (!tecla.match(/\d+/g) && tecla.match(/^[a-zA-Z0-9]+$/g)) {
		if (containerJogo.style.display === 'flex') {
			if (palavra.length && tentativas > 0) {
				let divWrongWord = document.createElement('div');
				for (let i = 0; i < palavra.length; i++) {
					if (tecla === palavra[i]) {
						let divSecretWord =
							document.getElementsByClassName('div-secret-word')[i];
						divSecretWord.innerHTML = palavra[i];

						letrasCertas[i] = palavra[i];
					}
				}

				if (!letrasErradas.includes(tecla) && !letrasCertas.includes(tecla)) {
					letrasErradas.push(tecla);
					divWrongWord.innerHTML = tecla;
					trackerErros
						.appendChild(divWrongWord)
						.classList.add('div-wrong-word');
					tentativas -= 1;

					desenhar(tentativas);

					console.log(`CONTAGEM TENTATIVAS: ${tentativas}`);

					if (tentativas === 0) {
						resultado.innerHTML = `Fim de Jogo! A palavra era <span class='segredo-span'>${segredo}</span>`;
					}
				}

				if (letrasCertas.join() == palavra.join()) {
					tentativas = 0;
					return (resultado.innerHTML = `Você Venceu. Parabéns!`);
				}
			}
		}
	}
});

const desenhaBase = () => {
	//CHAO
	pincel.beginPath();
	pincel.moveTo(250, 200);
	pincel.lineTo(10, 200);
	pincel.stroke();
	pincel.fill();

	//HASTE TOPO
	pincel.beginPath();
	pincel.moveTo(50, 50);
	pincel.lineTo(150, 50);
	pincel.stroke();
	pincel.fill();

	//HASTE ESQUERDA
	pincel.beginPath();
	pincel.moveTo(50, 50);
	pincel.lineTo(50, 200);
	pincel.stroke();
	pincel.fill();

	//CORDA TOPO
	pincel.beginPath();
	pincel.moveTo(150, 50);
	pincel.lineTo(150, 70);
	pincel.stroke();
	pincel.fill();
};

const desenhar = (pos) => {
	console.log(pos);
	if (pos === 5) {
		//CABEÇA
		pincel.fillStyle = 'black';
		pincel.beginPath();
		pincel.arc(150, 85, 15, 0, 2 * 3.14);
		pincel.fill();
	} else if (pos === 4) {
		//CORPO
		pincel.beginPath();
		pincel.moveTo(150, 150);
		pincel.lineTo(150, 100);
		pincel.stroke();
		pincel.fill();
	} else if (pos === 3) {
		//BRACO ESQ
		pincel.beginPath();
		pincel.moveTo(110, 90);
		pincel.lineTo(150, 110);
		pincel.stroke();
		pincel.fill();
	} else if (pos === 2) {
		//BRACO DIR
		pincel.beginPath();
		pincel.moveTo(150, 110);
		pincel.lineTo(190, 90);
		pincel.stroke();
		pincel.fill();
	} else if (pos === 1) {
		//PERNA ESQ
		pincel.beginPath();
		pincel.moveTo(110, 180);
		pincel.lineTo(150, 150);
		pincel.stroke();
		pincel.fill();
	} else if (pos === 0) {
		//PERNA DIR
		pincel.beginPath();
		pincel.moveTo(190, 180);
		pincel.lineTo(150, 150);
		pincel.stroke();
		pincel.fill();
	}
};
