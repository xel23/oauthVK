let access_token = location.href.substring((location.href.indexOf('=') + 1), location.href.indexOf('&ex'));
let user_id = location.href.substr((location.href.indexOf('user_id=') + 1));
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.vk.com/method/friends.search?user_id=' +
    user_id + '&fields=photo_50&count=5&access_token=' + access_token + '&v=5.92', true);
xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
xhr.send();
xhr.onload = function () {
    if (xhr.status != 200) {
        alert('Error! Status: ' + xhr.status);
    } else {
        console.log(xhr.responseText);
    }
}