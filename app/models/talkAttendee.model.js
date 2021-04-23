module.exports = (sequelize, Sequelize) => {
  const TalkAttendee = sequelize.define("talkAttendee", {
    talkId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    },
  });





  return TalkAttendee;
};
