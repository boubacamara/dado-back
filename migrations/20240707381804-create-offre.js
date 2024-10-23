'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Offres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      lieu: {
        type: Sequelize.STRING,
        allowNull: false
      },
      typeContrat: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['cdi', 'cdd', 'intérim', 'stage', 'alternance', 'freelance']
      },
      salaire: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      exigences: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      competences: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      educationRequise: {
        type: Sequelize.STRING,
        allowNull: true
      },
      categorieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      recruteurId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      publier: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Offres');
  }
};