module.exports = (sequelize, Sequelize) => {
  const Talk = sequelize.define("talk", {
    name: {
      type: Sequelize.STRING
    },
    company: {
      type: Sequelize.STRING
    },
    summary: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    link: {
      type: Sequelize.STRING
    },
    capacity: {
      type: Sequelize.INTEGER
    },
  });




  return Talk;
};
