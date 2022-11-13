module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  
  //////////////////////////////  GOOGLE  //////////////////////////////////////////

  app.get("/google_account/active", customers.get_active_google);

  //////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////
  // GET RANDOM CONFIG
  app.get("/van/ran", customers.get_random_van);
  // SELECT COUNT(*) FROM product_details;

  //COUNT LEFT CONFIG
  app.get("/van/count", customers.config_left_van);

  // Retrieve a single Customer with customerId
  //app.get("/nor/:customerId2", customers.findOne_nord);

  //COUNT LEFT CONFIG
  //app.put("/nor/update/:customerId", customers.update_nord);

  //Reset all Config set used=y
  //app.put("/nor/reset_all", customers.reset_all_nord);
  /////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////////////////////
  // GET RANDOM CONFIG
  app.get("/nor/ran", customers.get_random);
  // SELECT COUNT(*) FROM product_details;

  //COUNT LEFT CONFIG
  app.get("/nor/count", customers.config_left);

  // Retrieve a single Customer with customerId
  app.get("/nor/:customerId2", customers.findOne_nord);

  //COUNT LEFT CONFIG
  app.put("/nor/update/:customerId", customers.update_nord);

  //Reset all Config set used=y
  app.put("/nor/reset_all", customers.reset_all_nord);
  /////////////////////////////////////////////////////////////////////////////////



  /////////////////////////////////////////////////////////////////////////////////

  // Create a new Customer
  app.post("/customers", customers.create);

  // Retrieve all Customers
  app.get("/customers", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);


  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/customers/:customerId", customers.delete);

  // Create a new Customer
  app.delete("/customers", customers.deleteAll);
};
