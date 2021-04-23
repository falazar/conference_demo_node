module.exports = {
  HOST: "mysql.falazar.com",
  USER: "jobseeker23",
  PASSWORD: "Jobber23",
  DB: "test23",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
