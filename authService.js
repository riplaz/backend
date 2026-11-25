const store = require("../data/store");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//регистрация пользователя
async function register(name, email, password) {

    const existingUser = store.users.find(
        user => user.email === email.toLowerCase()
    );

    if (existingUser) {
        throw Object.assign(
            new Error("Пользователь уже существует"),
            { status: 409 }
        );
    }

    if (password.length < 8) {
        throw Object.assign(
            new Error("Пароль должен содержать минимум 8 символов"),
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: crypto.randomUUID(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword
    };

    store.users.push(user);

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
}

//вход пользователя
async function login(email, password) {

    const user = store.users.find(
        user => user.email === email.toLowerCase()
    );

    if (!user) {
        throw Object.assign(
            new Error("Неверный email или пароль"),
            { status: 401 }
        );
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw Object.assign(
            new Error("Неверный email или пароль"),
            { status: 401 }
        );
    }

    const token = crypto.randomUUID();

    store.sessions.push({
        token,
        userId: user.id
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}

//выход пользователя
function logout(token) {

    const sessionIndex = store.sessions.findIndex(
        session => session.token === token
    );

    if (sessionIndex === -1) {
        throw Object.assign(
            new Error("Сессия не найдена"),
            { status: 401 }
        );
    }

    store.sessions.splice(sessionIndex, 1);

    return {
        message: "Выход выполнен успешно"
    };
}

module.exports = {
    register,
    login,
    logout
};
