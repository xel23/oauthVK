function auth() {
    let ID = '6923525';
    let SECRET = 'SXSenudXDNJgyeGqQsTv';
    let redirectURI = 'http://www.besplatnie-filmi-onlain.ru/11/site/handler.html';

    let link = document.createElement('a');
    link.href = 'https://oauth.vk.com/authorize?client_id=' + ID + '&display=page&redirect_uri=' + redirectURI +
        '&scope=friends&response_type=token&v=5.92';
    document.body.appendChild(link);
    link.click();

    // let link = document.createElement('a');
    // link.href = URL;
    // document.body.appendChild(link);
    // link.click();
}