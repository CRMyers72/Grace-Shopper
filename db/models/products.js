const client = require('../client');


async function createProduct({
    name,
    description,
    price,
    inStock,
    category
}){

    try{
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, price, "imageURL", "inStock", category)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, description, price, imageURL, inStock, category]);

        return product
    } catch (error) {
        throw error
    }
}

async function getAllProducts(){
    try{
        const { rows } = await client.query(`
            SELECT id, name, description, price, "imageURL", "inStock", category
            FROM products; 
        `)

        return rows;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts,
    createProduct
}