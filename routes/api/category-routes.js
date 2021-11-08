const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const readAllCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(readAllCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const readCategoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!readCategoryById) {
      res.status(404).json({ message: 'Category not found with that id!' });
      return;
    }
    res.status(200).json(readCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategoryById = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updatedCategoryById) {
      res.status(404).json({ message: 'Category not found with that id!' });
      return;
    }
    res.status(200).json(updatedCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategoryById = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategoryById) {
      res.status(404).json({ message: 'Category not found with that id!' });
      return;
    }
    res.status(200).json(deleteCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;