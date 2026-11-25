const store = require("../data/store");
const crypto = require("crypto");

//получение всех идей
function getIdeas(filters = {}) {

    let ideas = [...store.ideas];

    if (filters.search) {
        const search = filters.search.toLowerCase();

        ideas = ideas.filter(idea =>
            idea.title.toLowerCase().includes(search) ||
            idea.description.toLowerCase().includes(search)
        );
    }

    if (filters.category) {
        ideas = ideas.filter(
            idea => idea.category === filters.category
        );
    }

    if (filters.status) {
        ideas = ideas.filter(
            idea => idea.status === filters.status
        );
    }
я
    return ideas;
}

//получение одной идеи
function getIdeaById(id) {

    const idea = store.ideas.find(
        idea => idea.id === id
    );

    if (!idea) {
        throw Object.assign(
            new Error("Идея не найдена"),
            { status: 404 }
        );
    }
    return idea;

}

//создание новой идеи
function updateIdea(id, userId, data) {
    const idea = {
        id: store.ideas.length + 1,
        title: data.title,
        description: data.description,
        status: "pending",
        authorId: userId,
        votesCount: 0,
        createdAt: new Date()
    };

    store.ideas.push(ideas);

    return ideas;
}


//Редактирование идеи
function updateIdea(id, userId, data) {
    const idea = getIdeaById(id);

    if(String(idea.authorId) !== String(userId)) {
        throw Object.assign(
            new Error("Нет доступа к редактированию"),
            {status: 403}
        );
    }

    if (data.title !== undefined) {
        idea.title = data.title;
    }

    if (data.description !== undefined){
        idea.description = data.description;
    }

    return idea;
}


//удаление идеи
function deleteIdea(id, userId) {
    const idea = getIdeaById(id);

    if (String(idea.authorId) !== String(userId)){
        throw Object.assign(
            new Error("Нет доступа к удалению"),
            {status: 403}
        );
    }

    store.ideas = store.ideas.filter(
        item => String(item.id) !== String(id)
    );

    store.votes = store.votes.filter(
        vote => String(vote.ideaId) !== String(id)
    );

    store.comments = store.comments.filter(
        comment => String(comment.ideaId) !== String(id)
    );

    return true;
}

//голосоыание за идею
function voteIdea(ideaId) {
    const idea = getIdeaById(ideaId);

    const existingVote = store.votes.find(
        vote =>
            String(vote.ideaId) === String(ideaId) &&
            String(vote.userId) === String(userId)
    );
    if (existingVote) {
        throw Object.assign(
            new Error("Вы уже голосовали за эту идею"),
            { status: 400 }
        );
    }

    store.votes.push({
        ideaId,
        userId
    });

    idea.votesCount++;

    return idea;
}


// Отмена голоса
function removeVote(ideaId, userId) {
    const index = store.votes.findIndex(
        vote =>
            String(vote.ideaId) === String(ideaId) &&
            String(vote.userId) === String(userId)
    );

    if (index === -1) {
        throw Object.assign(
            new Error("Голос не найден"),
            { status: 404 }
        );
    }

    store.votes.splice(index, 1);

    const idea = getIdeaById(ideaId);

    idea.votesCount--;

    return idea;
}


// Получение комментариев
function getComments(ideaId) {
    getIdeaById(ideaId);

    return store.comments.filter(
        comment => String(comment.ideaId) === String(ideaId)
    );
}


// Добавление комментария
function addComment(ideaId, userId, text) {
    getIdeaById(ideaId);

    const comment = {
        id: store.comments.length + 1,
        ideaId,
        userId,
        text,
        createdAt: new Date()
    };

    store.comments.push(comment);

    return comment;
}


// Экспорт функций
module.exports = {
    getIdeas,
    getIdeaById,
    createIdea,
    updateIdea,
    deleteIdea,
    voteIdea,
    removeVote,
    getComments,
    addComment
};
