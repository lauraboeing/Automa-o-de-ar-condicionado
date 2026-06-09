const ESP32_IP = "192.168.0.100";

const API_URL = `http://${ESP32_IP}`;

async function enviarComando(comando) {

    try {

        const resposta = await fetch(
            `${API_URL}/${comando}`
        );

        return await resposta.text();

    } catch (erro) {

        console.error(
            "Erro na comunicação:",
            erro
        );
    }
}

async function obterStatus() {

    try {

        const resposta = await fetch(
            `${API_URL}/status`
        );

        return await resposta.json();

    } catch (erro) {

        console.error(
            "Erro ao obter status:",
            erro
        );

        return null;
    }
}