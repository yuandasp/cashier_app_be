const { db, query } = require("../database");

module.exports = {
  fetchAllProduct: async (req, res) => {
    try {
      const idUser = parseInt(req.user.id_user);
      const category = req.query.category;
      const sort = req.query.sort;
      const key = req.query.key;

      console.log("req.query", req.query);

      // if(search) {
      //   `SELECT * FROM product WHERE id_user=${db.escape(idUser)} AND name=%{}%`
      // }

      let queries = `SELECT * FROM product WHERE id_user=${idUser}`;

      if (category) {
        queries = queries + ` AND id_category=${category}`;
      }

      if (sort) {
        queries = await query(queries + ` ORDER BY ${key} ${sort}`);
        return res.status(200).send(queries);
      }

      console.log(queries);

      // if (category) {
      //   const filterCategory = await query(queries);
      //   return res.status(200).send(filterCategory);
      // }

      const products = await query(queries);
      return res.status(200).send(products);
    } catch (error) {
      res.status(error.status || 400).send("error");
    }
  },
  fetchAllCategory: async (req, res) => {
    try {
      const idUser = parseInt(req.user.id_user);
      const categories = await query(
        `SELECT * FROM category WHERE id_user=${db.escape(idUser)}`
      );
      return res.status(200).send(categories);
    } catch (error) {
      res.status(error.status || 400).send("error");
    }
  },
};
