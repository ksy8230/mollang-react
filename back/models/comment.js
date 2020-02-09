module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
    },
        {
            charset : 'utf8mb4', // 한글+이모티콘 가능
            collate: 'utf8mb4_general_ci', // 한글로 저장
        }
    );

    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };

    return Comment;
};