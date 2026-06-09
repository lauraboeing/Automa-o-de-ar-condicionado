const container =
    document.getElementById("devices-container");

function renderDevices() {

    container.innerHTML = "";

    devices.forEach(device => {

        const card =
            document.createElement("div");

        card.className = "ac-card";

        card.innerHTML = `

            <div class="card-header">

                <h2>${device.nome}</h2>

                <span class="${
                    device.online
                        ? "online"
                        : "offline"
                }">

                    ${
                        device.online
                            ? "● Online"
                            : "● Offline"
                    }

                </span>

            </div>

            <div class="status">

                ${
                    device.ligado
                        ? "Ligado"
                        : "Desligado"
                }

            </div>

            <div class="temp-display">

                ${device.temperatura}°C

            </div>

            <div class="temp-controls">

                <button onclick="diminuirTemp(${device.id})">
                    −
                </button>

                <button onclick="aumentarTemp(${device.id})">
                    +
                </button>

            </div>

            <div class="actions">

                <button
                    class="btn-on"
                    onclick="ligar(${device.id})">

                    Ligar

                </button>

                <button
                    class="btn-off"
                    onclick="desligar(${device.id})">

                    Desligar

                </button>

            </div>
        `;

        container.appendChild(card);
    });
}

async function ligar(id) {

    await enviarComando("on");

    devices[0].ligado = true;

    renderDevices();
}

async function desligar(id) {

    await enviarComando("off");

    devices[0].ligado = false;

    renderDevices();
}

async function aumentarTemp(id) {

    await enviarComando("tempup");

    devices[0].temperatura++;

    renderDevices();
}

async function diminuirTemp(id) {

    await enviarComando("tempdown");

    devices[0].temperatura--;

    renderDevices();
}

async function atualizarStatus() {

    const status =
        await obterStatus();

    if (!status) {

        devices[0].online = false;

        renderDevices();

        return;
    }

    devices[0].online = true;

    devices[0].temperatura =
        status.temp;

    devices[0].ligado =
        status.power;

    renderDevices();
}

renderDevices();

atualizarStatus();

setInterval(
    atualizarStatus,
    3000
);