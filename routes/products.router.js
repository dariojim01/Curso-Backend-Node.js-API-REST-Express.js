
const express = require('express');
const ProductsService = require('../services/products.service');
//const { faker }  = require('@faker-js/faker');
const validatorHandler = require('./../middlewares/validator.handler');

const {createProductSchema, updateProductSchema, getProductsSchema} = require('./../schemas/product.schema');

const service = new ProductsService();

const router = express.Router();

router.get('/', async (req, res)=>{
  const products = await service.find();
  res.json(products);
})

router.get('/filter', (req, res)=>{
  res.send('Yo soy un filtro');
})

router.get('/:id',
  validatorHandler(getProductsSchema,'params'),
  async (req, res, next)=>{
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res)=>{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
})

router.patch('/:id',
  validatorHandler(getProductsSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next)=>{
  try{
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json(product);
  }catch(error){
    next(error);
  }

})

router.delete('/:id',async (req, res)=>{
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
})

module.exports = router;
