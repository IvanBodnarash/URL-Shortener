const form = document.querySelector('form');
const longUrl = document.querySelector('#longUrl');

const shortLink = document.querySelector('#shortLink');
const shortLinkContainer = document.querySelector('#shortLinkContainer');
const copyIco = document.querySelector('#copyIco');
const tooltip = document.querySelector('#myTooltip');


// REFRESHING OF SHORT LINK CONTAINER

window.addEventListener('load', () => {
    shortLinkContainer.style.display = 'none';
})


// FORM REQUEST AND RESPONSE

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // URL to call the TinyURL API for shortening
    const url = `https://api.tinyurl.com/dev/api-create.php?url=${longUrl.value}`;
    const response = await fetch(url);
    const data = await response.json();
    const shortUrl = data.result.short_link;
    shortLink.innerHTML = shortUrl;
    shortLinkContainer.style.display = 'flex';
    form.reset();
});


// TOOLTIP

copyIco.addEventListener('click', (event) => {
    event.preventDefault();

    const textToCopy = shortLink.innerHTML;
    navigator.clipboard.writeText(textToCopy);

    tooltip.style.display = 'block';

    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 2000);
});
