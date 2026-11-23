exports.getProfile = (req, res) => {
    res.status(501).json({
        message: "Получение профиля"
    });
};

exports.updateProfile = (req, res) => {
    const { name } = req.body;

    if(typeof name !=="string" || !name.trim()) {
        return res.status(400).json({
            message: "Введите корректное имя"
        });
    }
    res.status(501).json({
        message: "Обновление профиля"
    });
};

exports.getMyIdeas = (req, res) => {
    res.status(501).json({
        message: "Получение моих идей"
    });
};

exports.getSupportedIdeas = (req, res) => {
    res.status(501).json({
        message: "Получение поддержанных идей"
    });
};

exports.getDrafts = (req, res) => {
    res.status(501).json({
        message: "Получение черновиков"
    });
};
