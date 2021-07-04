const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const pattern = /[a-z]/i;

const input = document.getElementById('input');
const output = document.getElementById('output');

function obfuscate() {
    const threshold = parseInt(document.getElementById('threshold').value);
    const clearStart = input.selectionEnd - threshold;
    const clearEnd = input.selectionEnd + threshold;
    const currentOutput = output.innerText;
    const currentInput = input.value;

    const outputChars = [];

    for (var i in currentInput) {
        if (i > clearStart && i < clearEnd) {
            outputChars.push(currentInput[i]);

        } else if (!pattern.test(currentInput[i])) {
            outputChars.push(currentInput[i]);

        } else if (Math.random() * 100 < 80) {
            const nextChar = pattern.test(currentOutput[i])
                ? currentOutput[i]
                : chars.charAt(Math.floor(Math.random() * chars.length));
            outputChars.push(nextChar);

        } else {
            outputChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));

        }
    }

    output.innerHTML = '';
    output.appendChild(document.createTextNode(outputChars.join('')));

    scrollAll();

    return false;
}

input.addEventListener('onkeydown', e => {
    if (e.keyCode === 17) {
        input.className = 'showing';
        output.className = 'hiding';
    }
});

input.addEventListener('keyup', e => {
    if (e.keyCode === 17) {
        input.className = 'hiding';
        output.className = 'showing';
    }
});

input.addEventListener('click', e => {
    obfuscate();
});

function scrollAll() {
    output.scrollTop = input.scrollTop;
}