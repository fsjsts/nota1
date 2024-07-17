const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller')

router.get('/', (req, res) => { res.json({ name: 'my start', website: 'https://tuture.co' }); });
router.post('/new', (req, res) => { res.status(201).json({ msg: 'new, start' }); });

router.get('/notes', noteController.getNotes);
router.post('/notes', noteController.newNote);

module.exports = router;

// router.get('/notes/:id', (request, response, next) => {
//     Note.findById(request.params.id)
//         .then(note => {
//             if (note) {
//                 response.json(note)
//             } else {
//                 response.status(404).end()
//             }
//         })
//         .catch(error => next(error))
// })

// router.delete('/notes/:id', (request, response, next) => {
//     Note.findByIdAndDelete(request.params.id)
//         .then(result => {            response.status(204).end()        })
//         .catch(error => next(error))
// })

// router.put('/notes/:id', (request, response, next) => {
//     const body = request.body

//     const note = {
//         content: body.content,
//         important: body.important,
//     }

//     Note.findByIdAndUpdate(request.params.id, note, { new: true })
//         .then(updatedNote => {
//             response.json(updatedNote)
//         })
//         .catch(error => next(error))
// })

