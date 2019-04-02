function handler() {
    alert(location.href.indexOf('access_token='));
    if (location.href.indexOf('access_token=') === -1 || location.href.indexOf('id=') === -1) {
        returnToMainPage();
    } else {
        let access_token = location.href.substring((location.href.indexOf('access_token=') + 13),
            location.href.indexOf('&ex'));
        let user_id = location.href.substring((location.href.indexOf('id=') + 3));
        alert(access_token);
        alert(user_id);
        let script = document.createElement('SCRIPT');
        script.src = 'https://api.vk.com/method/friends.search?user_id=' + user_id + '&fields=photo_50&count=5&access_token=' +
            access_token + '&v=5.92&callback=callbackFunc';
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

function callbackFunc(result) {
    if (result.response !== undefined || result.response != null) {
        console.log(result.response);
    } else {
        returnToMainPage();
    }
}

function returnToMainPage() {
    let textErr = document.createElement('div');
    let pTextErr = document.createElement('p');
    pTextErr.innerHTML = 'Что-то пошло не так...';

    let returnLink = document.createElement('a');
    returnLink.href = 'index.html';
    returnLink.innerHTML = 'Вернуться на главную';

    document.body.appendChild(textErr);
    textErr.appendChild(pTextErr);
    textErr.appendChild(returnLink);
}