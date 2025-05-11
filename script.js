const SAT_IDS = {
    'NOAA 15': 25338,
    'NOAA 18': 28654,
    'NOAA 19': 33591,
    'Meteor M2-3': 59051,
    'Meteor M2-4': 59052
};

async function getPasses(lat, lon) {
    const results = {};
    
    for (const [name, id] of Object.entries(SAT_IDS)) {
        const response = await fetch(`https://api.n2yo.com/rest/v1/satellite/radiopasses/${id}/${lat}/${lon}/0/2/40/&apiKey=P7BB4Z-3VTXAC-ZKW6RL-5H8Q`);
        const data = await response.json();
        results[name] = data.passes;
    }
    
    displayResults(results);
}

function displayResults(data) {
    const container = document.getElementById('results');
    let html = '<table><tr><th>Satélite</th><th>Próxima Passagem</th><th>Duração</th><th>Elevação Máxima</th></tr>';
    
    for (const [satellite, passes] of Object.entries(data)) {
        if (passes.length > 0) {
            const nextPass = passes[0];
            html += `<tr>
                <td>${satellite}</td>
                <td>${new Date(nextPass.startUTC * 1000).toLocaleString()}</td>
                <td>${nextPass.duration} segundos</td>
                <td>${nextPass.maxEl}°</td>
            </tr>`;
        }
    }
    
    html += '</table>';
    container.innerHTML = html;
}

// Event listeners e geolocalização
document.getElementById('coordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const lat = document.getElementById('latitude').value;
    const lon = document.getElementById('longitude').value;
    getPasses(lat, lon);
});

document.getElementById('getLocation').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        document.getElementById('latitude').value = position.coords.latitude.toFixed(4);
        document.getElementById('longitude').value = position.coords.longitude.toFixed(4);
    });
});
