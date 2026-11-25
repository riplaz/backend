const db = require("../config/db");

//Получить профиль id

async function updateName(id, fullName) {
const { rows } = await db.query(
    `UPDATE profiles
        SET full_name = $1
     WHERE id = $2
     RETURNING id, full_name, email, role, created_at`,
    [fullName, id]
);
return rows [0] || null;
}

//иди пользователя

async function getUserPosts(userId, { page = 1, limit = 20 } = {}) {
const offset = (page - 1) * limit;
const { rows } = await db.query(
    `SELECT p.id, p.title, p.content, p.status, p.image_url,
            p.created_at,
            (SELECT count(*) FROM votes v WHERE v.post_id = p.id) AS votes_count,
            (SELECT count(*) FROM comments c WHERE c.post_id = p.id) AS comments_count
     FROM posts p
     WHERE p.user_id = $1
        AND p.status <> 'draft'
     ORDER BY p.created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
);
return rows;
}

async function getUserDrafts(userId, { page = 1, limit = 20 } = {}) {
const offset = (page - 1) * limit;
const { rows } = await db.query(
    `SELECT p.id, p.title, p.content, p.status, p.image_url, p.created_at
     FROM posts p
     WHERE p.user_id = $1
        AND p.status = 'draft'
     ORDER BY p.created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
);
return rows;
}

// Поддержанный идеи

async function getVotedPosts(userId, { page = 1, limit = 20 } = {}) {
const offset = (page - 1) * limit;
const { rows } = await db.query(
    `SELECT p.id, p.title, p.content, p.status, p.image_url,
            p.created_at,
            v.created_at AS voted_at,
            (SELECT count(*) FROM votes vv WHERE vv.post_id = p.id) AS votes_count
     FROM votes v
     JOIN posts p ON p.id = v.post_id
     WHERE v.user_id = $1
        AND p.status = 'approved'
     ORDER BY v.created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
);
return rows;
}

// Экспорт

module.exports = {
    findById,
    updateName,
    getUserPosts,
    getUserDrafts,
    getVotedPosts,
};
