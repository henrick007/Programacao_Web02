document.getElementById('pokemon-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            resultDiv.innerHTML = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p><strong>Altura:</strong> ${data.height / 10} m</p>
                <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                <p><strong>Tipo:</strong> ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
});