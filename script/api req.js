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

function shortenUrl() {
    const longUrl = $('#longUrl').val();

    const linkRequest = {
        destination: longUrl,
        domain: { fullName: "rebrand.ly" }
    };

    const requestHeaders = {
        "Content-Type": "application/json",
        "apikey": "8798ccbdb5404b07af6b6526152e3b47"
    };

    $.ajax({
        url: "https://api.rebrandly.com/v1/links",
        type: "post",
        data: JSON.stringify(linkRequest),
        headers: requestHeaders,
        dataType: "json",
        success: (link) => {
            $('#shortLink').text(link.shortUrl);
            $('#shortLinkContainer').css('display', 'block');
        },
        error: (error) => {
            console.error('Failed to shorten the URL:', error);
        }
    });
}

function copyToClipboard() {
    const shortLink = $('#shortLink');
    const textarea = $('<textarea>');
    textarea.val(shortLink.text());
    $('body').append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    alert('Shortened URL copied to clipboard!');
}

// const apiUrl = 'https://api.tinyurl.com/dev/api-create.php?url=' + encodeURIComponent(longUrl.value);
// const requestData = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//         url: longUrl.value,
//     }),
// };

// async function shortenUrl() {
//     try {
//         const response = await fetch(apiUrl);
    
//         if (response.ok) {
//             const shortUrl = await response.text();
//             shortLink.innerHTML = shortUrl;
//             shortLinkContainer.style.display = 'flex';
//         } else {
//             console.error('Failed to shorten the URL.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// shortenUrl();


// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     // URL to call the TinyURL API for shortening
//     const url = 'https://api.tinyurl.com/dev/api-create.php?url=';

//     // Create the full URL for the API call
//     const fullApiUrl = url + encodeURIComponent(longUrl.value);

//     try {
//         // Call API for url shortening
//         const response = await fetch(fullApiUrl);

//         if (response.ok) {
//             const shortUrl = await response.text();
//             shortLink.innerHTML = shortUrl;
//             shortLinkContainer.style.display = 'flex';
//         } else {
//             console.error('Failed to shorten the URL.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
//     form.reset();
// });


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
