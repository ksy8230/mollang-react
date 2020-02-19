module.exports = (sequelize, DataTypes) => {
    const Calendar = sequelize.define('Calendar', {
        title : {
            type: DataTypes.STRING(100),
            allowNull : false,
        },
        category : {
            type: DataTypes.STRING(100),
            allowNull : false,
        },
        start : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : sequelize.literal('now()'), // 스케쥴이 생성된 날을 기준으로 생성
        },
        end : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : sequelize.literal('now()'),
        },
    },
        {
            charset : 'utf8mb4', // 한글+이모티콘 가능
            collate: 'utf8mb4_general_ci', // 한글로 저장
            timestamps : false, // 생성날짜 디비에서 받지 않겠다
            underscored : true, // 캐멀케이스가 아닌 스네이크케이스를 많이 쓴다(_)
        }
    );
    return Calendar;
};