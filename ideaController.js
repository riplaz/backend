exports.getIdeas = (req, res) => {
    res.status(501).json({
        message: "Получение идей"
    });
};

exports.getIdeaById = (req, res) => {
    const { id } = req.params;

    res.status(501).json({
        message: "Получение идеи",
        id
    });
};

exports.createIdea = (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Заполните название и описание"
        });
    }

    res.status(501).json({
        message: " Создание идеи"
    });
};

exports.updateIdea = (req, res) => {
    const { id } = req.params;

    res.status(501).json({
        message: "Изменение идеи",
        id
    });
};

//Удаление идеи
//Голосование
//Отмена голоса
//Получение комментариев
//Ввод комментария
//Добавление комментария
