module.exports = (sequelize, Sequelize) => {
    return sequelize.define('articles', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        abstract: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        web_url: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        lead_paragraph: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        source: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date(),
            field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date(),
            field: 'updated_at'
        }
    });
};
