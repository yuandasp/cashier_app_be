const { db, query } = require("../database");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { username, email, store_name, phone_number, password } = req.body;

    const getUserQuery = `SELECT * FROM user WHERE email=${db.escape(
      email
    )} OR username=${db.escape(username)}`;
    const isUserExist = await query(getUserQuery);

    if (isUserExist.length > 0 && isUserExist[0].email === email) {
      return res.status(200).send({ message: "Email has been used" });
    } else if (isUserExist.length > 0 && isUserExist[0].username === username) {
      return res.status(200).send({ message: "Username has been used" });
    }

    if (password.length < 8) {
      return res
        .status(200)
        .send({ message: "Password too short, minimal 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const addUserQuery = `INSERT INTO user VALUES (null, ${db.escape(
      store_name
    )}, ${db.escape(username)}, ${db.escape(email)}, ${db.escape(
      phone_number
    )}, ${db.escape(hashPassword)})`;

    const user = await query(addUserQuery);

    res
      .status(201)
      .send({ message: "Success register! Please verify your email" });
  },
};
