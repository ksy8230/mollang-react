module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Category.associate = (db) => {
        db.Category.belongsToMany(db.Post, { through: 'PostCategory' });
    };
    return Category;
};