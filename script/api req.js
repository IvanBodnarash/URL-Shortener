const form = document.querySelector('form');

const submitBtn = document.querySelector('#btn-animation');

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

  const longUrl = form.elements['longUrl'].value;
  const accessToken = 'b6b4a1ffdd9edcff34779189877141f5cdd6e9ca';

  try {
    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        long_url: longUrl,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      shortLink.innerHTML = data.id;
      shortLinkContainer.style.display = 'flex';
      console.log(`Long URL: ${longUrl}`);
      console.log(`Short URL: ${data.id}`);
    } else {
      console.error('Failed to shorten the URL.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
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
