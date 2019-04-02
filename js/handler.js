let access_token = location.href.substring((location.href.indexOf('=') + 1), location.href.indexOf('&ex'));
let user_id = location.href.substring((location.href.indexOf('id=') + 3));
// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.vk.com/method/friends.search?user_id=' +
//     user_id + '&fields=photo_50&count=5&access_token=' + access_token, true);
// xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
// xhr.send();
// xhr.onload = function () {
//     if (xhr.status != 200) {
//         alert('Error! Status: ' + xhr.status);
//     } else {
//         console.log(xhr.responseText);
//     }
// }
let script = document.createElement('SCRIPT');
script.src = 'https://api.vk.com/method/friends.search?user_id=' + user_id + '&fields=photo_50&count=5&access_token=' +
    access_token + '&v=5.92&callback=callbackFunc';
document.getElementsByTagName("head")[0].appendChild(script);
function callbackFunc(result) {
    console.log(result.response);
}