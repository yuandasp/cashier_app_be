const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, store_name, phone_number, password } = req.body;

      const getUserQuery = `SELECT * FROM user WHERE email=${db.escape(
        email
      )} OR username=${db.escape(username)}`;
      const isUserExist = await query(getUserQuery);

      if (isUserExist.length > 0 && isUserExist[0].email === email) {
        return res.status(400).send({ message: "Email has been used" });
      } else if (
        isUserExist.length > 0 &&
        isUserExist[0].username === username
      ) {
        return res.status(400).send({ message: "Username has been used" });
      }

      if (password.length < 8) {
        return res
          .status(400)
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
    } catch (error) {
      res.status(error.status || 400).send("error");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const getUserQuery = `SELECT * FROM user WHERE email=${db.escape(email)}`;

      const isUserExist = await query(getUserQuery);
      if (isUserExist.length === 0) {
        return res
          .status(400)
          .send({ message: "Email or password is invalid" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        isUserExist[0].password
      );
      if (!isPasswordValid) {
        return res
          .status(400)
          .send({ message: "Email or password is invalid" });
      }

      const token = jwt.sign(
        { id_user: isUserExist[0].id_user },
        process.env.JWT_KEY,
        {
          expiresIn: "1hr",
        }
      );

      return res.status(200).send({
        message: "Login success",
        token,
        data: {
          id_user: isUserExist[0].id_user,
          store_name: isUserExist[0].store_name,
          username: isUserExist[0].username,
          email: isUserExist[0].email,
          phone_number: isUserExist[0].phone_number,
        },
      });
    } catch (error) {
      res.status(error.status || 400).send("error");
    }
  },
};
