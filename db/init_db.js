const {
  client,
  // declare your model imports here
  // for example, User
  createProduct
} = require('./');
const { createProduct } = require('./models/products');

async function dropTables(){
  try{
    console.log("starting to drop tables...")
    await client.query(`
      DROP TABLE IF EXISTS products;
    `)
  }catch (error) {
    console.error("error dropping tables")
    throw error;
  }
}

async function buildTables() {
  try {
    console.log("Starting to build tables")
    await client.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      description varchar(255) NOT NULL,
      price varchar(255) NOT NULL,
      "imageUrl" varchar(255) DEFAULT "https://i.imgur.com/okZ6VEO.jpeg"
      "inStock" varchar(255) NOT NULL DEFAULT false
      categiry varchar(255) NOT NULL
    );
    `)

    console.log("finished building tables")
  } catch (error) {
    console.error("Error Building tables")
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    await createProduct({
      name: "Regular bucket of water",
      description: "Just a bucket of water",
      price: "$25",
      inStock: true,
      category: "Junk"
    })
    await createProduct({
      name: "Large bucket of water",
      description: "Bigger than your grandad's bucket, it holds more water.",
      price: "$50",
      inStock: true,
      category: "Junk"
    })
    await createProduct({
      name: "Extra-Small bucket of water",
      description: "Honestly, this bucket is pretty cute. Good for squirrels and babies. Holds a little water.",
      price: "$15",
      inStock: null,
      category: "Junk"
    })

  } catch (error) {
    throw error;
  }
}
dropTables()
buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
