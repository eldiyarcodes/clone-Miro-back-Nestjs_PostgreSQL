'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.addColumn('boards', 'lastOpenedAt', {
			type: Sequelize.DATE,
			allowNull: true,
		})
		await queryInterface.addColumn('boards', 'isFavorite', {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		})
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeColumn('boards', 'lastOpenedAt')
		await queryInterface.removeColumn('boards', 'isFavorite')
	},
}
