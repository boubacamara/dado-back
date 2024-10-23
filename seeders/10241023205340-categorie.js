'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Roles', [
      {
        intitule: 'Développement web',
        createdAt: '2024-03-23 00:23',
        updatedAt: '2024-03-23 00:23'
      },
      {
        intitule: 'Commerce',
        createdAt: '2024-03-23 00:23',
        updatedAt: '2024-03-23 00:23'
      },
      {
        intitule: 'Cyber sécurité',
        createdAt: '2024-03-23 00:23',
        updatedAt: '2024-03-23 00:23'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
