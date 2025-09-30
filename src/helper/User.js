import * as Realm from "realm-web";

const userInfo = {}

const APP_ID = 'application-0-akmie';
const app = new Realm.App({ id: APP_ID, baseUrl: 'https://realm.mongodb.com' });

async function getValidAccessToken() {
    if (!app.currentUser) {
        console.log("User logged in")
        // await app.logIn(Realm.Credentials.emailPassword(userInfo.userid,userInfo.userpass));
    } else {
        await app.currentUser.refreshAccessToken();
    }
    return app.currentUser.accessToken;
}

function setUser(userid, userpass, rem) {
    if (userid == undefined || userpass == undefined) { return }
    if (rem == true) {
        localStorage.setItem("userid", userid);
        localStorage.setItem("userpass", userpass);
    }
    userInfo.userid = userid;
    userInfo.userpass = userpass;
}

function getUser() {
    if (userInfo.userid == undefined || userInfo.userpass == undefined) {
        if (localStorage.getItem("userid") != undefined) {
            userInfo.userid = localStorage.getItem("userid");
            userInfo.userpass = localStorage.getItem("userpass");
        }
    }
    return userInfo.userid;
}

async function login(userid, userpass, rem) {
    try {
        const user = await app.logIn(Realm.Credentials.emailPassword(userid, userpass));
        console.log(user)
        setUser(userid, userpass, rem)
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

function isLoggedIn() {
    if (userInfo.userid == undefined) {
        if (localStorage.getItem("userid") != undefined) {
            userInfo.userid = localStorage.getItem("userid");
            userInfo.userpass = localStorage.getItem("userpass");
        }
    }
    if (userInfo.userid != undefined && userInfo.userpass != undefined) {
        return true;
    }
    return false;
}

function logout() {
    userInfo.userid = undefined;
    userInfo.userpass = undefined;
    localStorage.removeItem("userid");
    localStorage.removeItem("userpass");
    window.location.href = "/"
}

const userQuery = { setUser, getUser, isLoggedIn, logout, login, getValidAccessToken, app }

export default userQuery
