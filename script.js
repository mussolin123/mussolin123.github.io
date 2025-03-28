document.getElementById('revelarExplicacao').addEventListener('click', function() {
    const explicacao = document.getElementById('explicacao');
    explicacao.classList.toggle('visible');
});

let chaveMapeamento = {};

function criptografarSenha() {
    const senhaInput = document.getElementById('senha');
    const resultadoDiv = document.getElementById('resultado');
    const senha = senhaInput.value;

    if (senha === '') {
        alert('Por favor, insira uma senha.');
        return;
    }

    chaveMapeamento = gerarMapeamento();
    const senhaCriptografada = criptografar(senha);

    if (senhaCriptografada) {
        resultadoDiv.innerHTML = `<p>Sua senha criptografada é:</p><p><strong>${senhaCriptografada}</strong></p>`;
        salvarChave(chaveMapeamento);
    }
}

function descriptografarSenha() {
    const senhaCriptografadaInput = document.getElementById('senhaCriptografada');
    const chaveInput = document.getElementById('chaveDescriptografacao');
    const resultadoDiv = document.getElementById('resultadoDescriptografado');
    const senhaCriptografada = senhaCriptografadaInput.value;
    const chaveInserida = chaveInput.value;

    if (senhaCriptografada === '' || chaveInserida === '') {
        alert('Por favor, insira a senha criptografada e a chave.');
        return;
    }

    try {
        const chaveJson = JSON.parse(chaveInserida);
        if (JSON.stringify(chaveJson) !== JSON.stringify(chaveMapeamento)) {
            alert('Chave incorreta! A senha não pode ser descriptografada.');
            return;
        }
    } catch (e) {
        alert('Chave inválida. Certifique-se de que está inserindo o conteúdo correto do arquivo .json.');
        return;
    }

    const senhaDescriptografada = descriptografar(senhaCriptografada);
    if (senhaDescriptografada) {
        resultadoDiv.innerHTML = `<p>Sua senha original é:</p><p><strong>${senhaDescriptografada}</strong></p>`;
    }
}

const caracteresPermitidos = 'abcdefghijklmnopqrstuvwxyz0123456789 ';

function gerarSequenciaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sequencia = '';
    for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * caracteres.length);
        sequencia += caracteres[index];
    }
    return sequencia;
}

function gerarMapeamento() {
    const mapeamento = {};
    for (const char of caracteresPermitidos) {
        mapeamento[char] = gerarSequenciaAleatoria();
    }
    return mapeamento;
}

function criptografar(senha) {
    let senhaCriptografada = '';
    for (const char of senha) {
        if (chaveMapeamento[char]) {
            senhaCriptografada += chaveMapeamento[char];
        } else {
            alert(`Caractere '${char}' não é permitido.`);
            return null;
        }
    }
    return senhaCriptografada;
}

function descriptografar(senhaCriptografada) {
    const tamanhoSequencia = 10;
    let senhaDescriptografada = '';
    for (let i = 0; i < senhaCriptografada.length; i += tamanhoSequencia) {
        const sequencia = senhaCriptografada.slice(i, i + tamanhoSequencia);
        const char = Object.keys(chaveMapeamento).find(key => chaveMapeamento[key] === sequencia);
        if (char) {
            senhaDescriptografada += char;
        } else {
            alert('Sequência inválida encontrada.');
            return null;
        }
    }
    return senhaDescriptografada;
}

function salvarChave(chave) {
    const chaveJSON = JSON.stringify(chave);
    const blob = new Blob([chaveJSON], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chave_map.json';
    link.click();
}

function carregarChave(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            chaveMapeamento = JSON.parse(e.target.result);
            alert('Chave de mapeamento carregada com sucesso!');
        } catch (error) {
            alert('Erro ao carregar a chave.');
        }
    };
    reader.readAsText(event.target.files[0]);
}
