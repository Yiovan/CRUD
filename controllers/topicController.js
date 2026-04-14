const Topic = require('../models/Topic');

const getTopics = async (req, res) => {
    try {
        const topics = await Topic.getAll();
        res.render('index', { topics });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar los temas de aprendizaje.");
    }
};

const getTopic = async (req, res) => {
    try {
        const topic = await Topic.getById(req.params.id);
        if (!topic) return res.status(404).send('Tema no encontrado');
        res.render('topic_detail', { topic });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el tema.");
    }
};

const newTopicForm = (req, res) => {
    res.render('new_topic');
};

const createTopic = async (req, res) => {
    try {
        const { title, description } = req.body;
        await Topic.create(title, description);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear el tema.");
    }
};

const editTopicForm = async (req, res) => {
    try {
        const topic = await Topic.getById(req.params.id);
        if (!topic) return res.status(404).send('Tema no encontrado');
        res.render('edit_topic', { topic });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el formulario.");
    }
};

const updateTopic = async (req, res) => {
    try {
        const { title, description } = req.body;
        await Topic.update(req.params.id, title, description);
        res.redirect(`/topic/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el tema.");
    }
};

const deleteTopic = async (req, res) => {
    try {
        await Topic.delete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar el tema.");
    }
};

module.exports = {
    getTopics,
    getTopic,
    newTopicForm,
    createTopic,
    editTopicForm,
    updateTopic,
    deleteTopic
};
