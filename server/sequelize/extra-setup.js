function applyExtraSetup(sequelize) {
    const { section } = sequelize.models;
    section.hasMany(section, { foreignKey: 'parentId'});
    section.belongsTo(section, { foreignKey: 'parentId'});
}

module.exports = { applyExtraSetup };
