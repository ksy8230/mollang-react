module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title : {
            type: DataTypes.STRING(100),
            allowNull : false,
        },
        category : {
            type: DataTypes.STRING(100),
            allowNull : true,
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        tag : {
            type: DataTypes.STRING(100),
            allowNull : true,
        },
        created_at : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : sequelize.literal('now()'), // 포스트가 생성된 날을 기준으로 생성
        },
    },
        {
            charset : 'utf8mb4', // 한글+이모티콘 가능
            collate: 'utf8mb4_general_ci', // 한글로 저장
            timestamps : false, // 생성날짜 디비에서 받지 않겠다
            underscored : false, // 캐멀케이스가 아닌 스네이크케이스를 많이 쓴다(_)
        }
    );

    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Tag, { through: 'PostTag' });
        db.Post.belongsTo(db.Category, { through: 'PostCategory' });
    };

    return Post;
};