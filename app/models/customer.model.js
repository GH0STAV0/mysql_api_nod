const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.cnf_names = customer.cnf_names;
  this.used = customer.used;
  //this.active = customer.active;
};

Customer.reset_all_nord = result => {
  sql.query("UPDATE `nord_list2` SET  `used` = 'n'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`reset_all_nord ${res.affectedRows} customers`);
    result(null, res);
  });
};






Customer.get_random = result => {
  sql.query("SELECT * FROM nord_list2 WHERE (`used`='n') ORDER BY RAND() LIMIT 1 ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("get_random: ", res);
    result(null, res);
  });
};

///SELECT COUNT(*) FROM product_details;

Customer.config_left = result => {
  sql.query("SELECT COUNT(*) FROM nord_list2 WHERE (`used`='n') ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("config_left: ", res);
    result(null, res);
  });
};



Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById_nord = (customerId, result) => {
  sql.query(`SELECT * FROM nord_list2 WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};


/////////////////////////////////////////////////////////////////

Customer.updateById2 = (id, customer, result) => {
  sql.query(
    "UPDATE nord_list2 SET used = ? WHERE id = ?",
    ["y", id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated nord_list2: ", { id: id });
      result(null, { id: id });
    }
  );
};











Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET used = ? WHERE id = ?",
    [customer.used, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;
