const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; // 시퀄라이즈에 대한 설정 파일
const sequelize = new Sequelize(config.database, config.username, config.password, config); // 해당 시퀄라이즈 생성

const db = {};

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Tag = require('./tag')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize; // 시퀄라이즈 패키지 db에 넣기
db.sequelize = sequelize; // 위에 만든 시퀄라이즈 인스턴스 db에 넣기

module.exports = db;