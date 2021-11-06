const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  try {
    const getAllcategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(getAllcategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryId) {
      res.status(404).json({ message: 'Category not found with that id!' });
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const addedCategory = await Category.create(req.body);
    res.status(200).json(addedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!categoryUpdate) {
      res.status(404).json({ message: 'Category not found with that id!' });
      return;
    }
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deletedCategoryId = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategoryId) {
      res.status(404).json({ message: 'Category not found with that id!' });
      return;
    }
    res.status(200).json(deletedCategoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;