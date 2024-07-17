// ./services/NoteService.js
// const path = require('path');
// console.log('--------------Current directory:', __dirname);
// console.log('--------------Resolved path:', path.join(__dirname, '../models/Note'));
// const NoteModel = require(path.join(__dirname, '../models/Note'));
const NoteModel = require('../models/note.model');

exports.getNotes = async () => {
    try {
        const notes = await NoteModel.find({});
        return notes;
    } catch (error) {
        throw error; // Re-throw error for handling in controller
    }
};

exports.newNote = async (noteData) => {
    console.log('11111')
    console.log(noteData)
    const { content, userid, timestamp } = noteData; // Destructure for clarity
    console.log(content)
    console.log(userid)
    console.log(timestamp)

    try {
        const newNote = new NoteModel({ content, userid, timestamp });
        const savedNote = await newNote.save();
        console.log('222222')
        console.log(savedNote)
        return savedNote;
    } catch (error) {
        throw error; // Re-throw error for handling in controller
    }
};

