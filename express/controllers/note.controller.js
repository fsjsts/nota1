// ./controllers/userController.js
const noteService = require('../services/note.services');

exports.getNotes = async (req, res) => {
  try {
    const getNotes = await noteService.getNotes(req.body);
    return res.status(200).json(getNotes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.newNote = async (req, res) => {
  try {
    const newNote = await noteService.newNote(req.body);
    return res.status(201).json(newNote);
    // return res.status(201).json({ msg: 'new, start1' }); 

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};