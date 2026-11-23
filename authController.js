exports.register = (req,res) => {
    const {name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "Заполните все поля"
        });
    }
    res.status(501).json({
        message: "Логика регистрации"
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: "Введите email и пароль"
        });
    }

    res.status(501).json({
        message: "Логика входа"
    });
};

exports.logout = (req, res) => {
    res.status(501).json({
        message: " Логика выхода"
    });
};
