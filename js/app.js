const container = document.getElementById("devices-container");

function renderDevices() {

    container.innerHTML = "";

    devices.forEach(device => {

        const card = document.createElement("div");

        card.className = "ac-card";

        card.innerHTML = `
            <div class="card-header">
                <h2>${device.nome}</h2>
                <span class="${device.online ? 'online' : 'offline'}">
                    ${device.online ? '● Online' : '● Offline'}
                </span>
            </div>

            <div class="status">
                ${device.ligado ? 'Ligado' : 'Desligado'}
            </div>

            <div class="temp-display">
                ${device.temperatura}°C
            </div>

            <div class="temp-controls">
                <button onclick="diminuirTemp(${device.id})">−</button>
                <button onclick="aumentarTemp(${device.id})">+</button>
            </div>

            <div class="actions">
                <button onclick="ligar(${device.id})">
                    Ligar
                </button>

                <button onclick="desligar(${device.id})">
                    Desligar
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function aumentarTemp(id) {

    const device = devices.find(d => d.id === id);

    if (device.temperatura < 30) {
        device.temperatura++;
    }

    renderDevices();

    alterarTemperatura(id, device.temperatura);
}

function diminuirTemp(id) {

    const device = devices.find(d => d.id === id);

    if (device.temperatura > 16) {
        device.temperatura--;
    }

    renderDevices();

    alterarTemperatura(id, device.temperatura);
}

function ligar(id) {

    const device = devices.find(d => d.id === id);

    device.ligado = true;

    ligarAr(id);

    renderDevices();
}

function desligar(id) {

    const device = devices.find(d => d.id === id);

    device.ligado = false;

    desligarAr(id);

    renderDevices();
}

renderDevices();