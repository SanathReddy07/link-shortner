document.getElementById('url-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const longUrl = document.getElementById('long-url').value;
    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longUrl })
    });

    const data = await response.json();
    document.getElementById('result').innerHTML = `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
});
