module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // 테이블명은 users
        nickname: {
            type: DataTypes.STRING(20), 
            allowNull: false, // 필수
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true, // 고유한 값
        },
        password: {
            type: DataTypes.STRING(100), 
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글이 저장
    });

    User.associate = (db) => {
        db.User.hasMany(db.Post, { as : 'Posts' });
        db.User.hasMany(db.Comment);
    };

    return User;
};