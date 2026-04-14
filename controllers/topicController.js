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

module.exports = {
    getTopics
};
