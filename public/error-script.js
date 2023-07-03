const displayError = () => {
    fetch('/all').then((res) => res.json())
        .then(data => {
            const errorDiv = document.getElementById('err');
            errorDiv.innerHTML += ` ${data.statusCode}.`;
            const messageDiv = document.createElement("div");
            messageDiv.textContent = data.message;
            errorDiv.append(messageDiv);
        });
}

displayError();