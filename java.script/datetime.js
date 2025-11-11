function getFormattedDateTime() {
    const now = new Date();

    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
    };

    return now.toLocaleString('en-US', options);
}


function updateFooterDateTime() {
    const dateTimeElem = document.getElementById('dateTime');
    if (dateTimeElem) {
        dateTimeElem.textContent = getFormattedDateTime();
    }
}


function setupShowTimeButton() {
    const btn = document.getElementById('showTimeBtn');
    const display = document.getElementById('showTime');

    if (btn && display) {
        btn.addEventListener('click', () => {
            display.textContent = getFormattedDateTime();
        });
    }
}

setInterval(updateFooterDateTime, 1000);
updateFooterDateTime(); 
setupShowTimeButton();  
