// Проверяем пришел ли пользователь после авторизации
if (location.href.indexOf('access_token=') === -1 || location.href.indexOf('user_id=') === -1) {
    checkCookie();
} else {
    handler();
}

// Проверяем куки пользователя, если куки содержат интересущие нас данные, то показываем контент
function checkCookie() {
    if (document.cookie.indexOf('access_token=') === -1 || document.cookie.indexOf('user_id=') === -1) {
        auth();
    } else {
        let cookie = document.cookie.split('; ');
        let access_token;
        let user_id;
        for (var i = 0; i < cookie.length; i++) {
            if (cookie[i].indexOf('access_token=') !== -1) {
                access_token = cookie[i].substring(cookie[i].indexOf('access_token=') + 13);
            }
            if (cookie[i].indexOf('user_id=') !== -1) {
                user_id = cookie[i].substring(cookie[i].indexOf('user_id=') + 8);
            }
        }
        showContent(access_token, user_id);
    }
}

// Авторизация
function auth() {
    let ID = '6923525';
    let SECRET = 'SXSenudXDNJgyeGqQsTv';
    let redirectURI = 'https://xel23.github.io/oauthVK/';

    let div = document.createElement('div');
    div.className = 'btn';
    let a = document.createElement('a');
    a.href = 'https://oauth.vk.com/authorize?client_id=' + ID + '&display=page&redirect_uri=' + redirectURI +
        '&scope=friends&response_type=token&v=5.92';
    let btn = document.createElement('button');
    btn.type = 'submit';
    btn.innerHTML = 'Войти через VK';

    document.body.appendChild(div);
    div.appendChild(a);
    a.appendChild(btn);
}

// Обработка запроса после авторизации
function handler() {
    if (location.href.indexOf('access_token=') === -1 || location.href.indexOf('user_id=') === -1) {
        returnToMainPage();
    } else {
        let access_token = location.href.substring((location.href.indexOf('access_token=') + 13),
            location.href.indexOf('&ex'));
        let user_id = location.href.substring((location.href.indexOf('id=') + 3));
        document.cookie = 'access_token=' + access_token;
        document.cookie = 'user_id=' + user_id;
        showContent(access_token, user_id);
    }
}

// Колбэк для отображения данных о пользователе
function showUserInfo(result) {
    if (result.response !== undefined || result.response != null) {
        // console.log(result.response[0]['first_name']);
        let userInfo = result.response;
        let p = document.createElement('p');
        p.className = 'userInfo';
        p.innerHTML = 'Здравствуй, ' + userInfo[0]['first_name'] + ' ' + userInfo[0]['last_name'] + '!';
        document.getElementsByClassName('blockUser')[0].appendChild(p);
    } else {
        returnToMainPage();
    }
}

// Колбэк для отображения данных о друзьях
function callbackFunc(result) {
    if (result.response !== undefined || result.response != null) {
        // console.log(result.response['count']);
        let arrayOfFriends = result.response;
        let countOfFriends = arrayOfFriends['count'];
        if (countOfFriends == 0) {
            let textNoFriends = document.createElement('p');
            textNoFriends.innerHTML = 'Похоже, у Вас нет друзей :(';
            document.getElementsByClassName('blockFriends')[0].appendChild(textNoFriends);
        } else {
            let article = document.createElement('p');
            article.className = 'article';
            article.innerHTML = 'Это твои друзья:';
            document.body.appendChild(article);
            let list = document.createElement('ol');
            list.className = 'bullet';
            document.body.appendChild(list);
            for (var i = 0; i < countOfFriends && i < 5; i++) {
                let friend = document.createElement('li');
                list.appendChild(friend);
                let photo = arrayOfFriends['items'][i]['photo_50'];

                let name = arrayOfFriends['items'][i]['first_name'] + ' ' + arrayOfFriends['items'][i]['last_name'];
                let pName = document.createElement('p');
                pName.innerHTML = name;
                let img = document.createElement('img');
                img.src = photo;

                list.appendChild(friend);
                friend.appendChild(img);
                friend.appendChild(pName);
            }
        }
    } else {
        returnToMainPage();
    }
}

// Если что-то пошло не так, чистим, утсановленные нами, куки, выводим сообщение
// об ошибке и предлагаем вернуться на главную
function returnToMainPage() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT";

    let textErr = document.createElement('div');
    let pTextErr = document.createElement('p');
    pTextErr.innerHTML = 'Что-то пошло не так...';

    let returnLink = document.createElement('a');
    returnLink.href = 'index.html';
    returnLink.innerHTML = 'Вернуться на главную';

    document.body.appendChild(textErr);
    textErr.appendChild(pTextErr);
    textErr.appendChild(returnLink);
    throw 'Error';
}

// Рисуем контент страницы
function showContent(access_token, user_id) {
    let blockUser = document.createElement('div');
    blockUser.className = 'blockUser';
    let blockFriends = document.createElement('div');
    blockFriends.className = 'blockFriends';
    document.body.appendChild(blockUser);
    document.body.appendChild(blockFriends);
    let scriptMe = document.createElement('SCRIPT');
    scriptMe.src = 'https://api.vk.com/method/users.get?user_id=' + user_id +
        '&access_token=' + access_token + '&v=5.92&callback=showUserInfo';
    document.getElementsByTagName("head")[0].appendChild(scriptMe);

    let scriptFriends = document.createElement('SCRIPT');
    scriptFriends.src = 'https://api.vk.com/method/friends.search?user_id=' + user_id +
        '&fields=photo_50&count=5&access_token=' + access_token + '&v=5.92&callback=callbackFunc';
    document.getElementsByTagName("head")[0].appendChild(scriptFriends);
}