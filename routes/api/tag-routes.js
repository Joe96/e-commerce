const router = require('express').Router();
const { Tag, Product} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const readAllTags = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(readAllTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const readTagById = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    res.status(200).json(readTagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateTagById = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updateTagById) {
      res.status(404).json({ message: 'Tag not found with that id!' });
      return;
    }
    res.status(200).json(updateTagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTagById = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTagById) {
      res.status(404).json({ message: 'Tag not found with that id!' });
      return;
    }
    res.status(200).json(deleteTagById);
  } catch (err) {
    res.status(500).json(err);
  }});

module.exports = router;
