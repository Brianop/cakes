import express from 'express';
import {Cake} from '../models/index.js';

const router = express.Router();

const getCake = async (req, res, next) => {
  let cake;

  try {
    cake = await Cake.findById(req.params.id);

    if (cake === null) {
      return res.status(404).json({message: 'Cake not found'});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }

  res.cake = cake;
  next();
};

router.get('/', async (req, res, next) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/:id', getCake, (req, res, next) => {
  res.json(res.cake);
});

router.post('/', async (req, res, next) => {
  const {name = null, price = null, flavors = null} = req.body;

  const cake = new Cake({
    name,
    price,
    flavors,
  });

  try {
    const newCake = await cake.save();

    res.status(201).json(newCake);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.put('/:id', getCake, async (req, res, next) => {
  const body = req.body;

  res.cake.name = body.name ? body.name : res.cake.name;
  res.cake.price = body.price ? body.price : res.cake.price;
  res.cake.flavors = body.flavors ? body.flavors : res.cake.flavors;

  try {
    const updatedCake = await res.cake.save();

    res.json(updatedCake);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.delete('/:id', getCake, async (req, res, next) => {
  try {
    await res.cake.remove();
    res.json({message: 'Caked removed'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

export default router;
