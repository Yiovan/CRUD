const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '..', 'data', 'database.json');

class Topic {
    static async #readData() {
        try {
            const data = await fs.readFile(dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading database:', error);
            return { topics: [] };
        }
    }

    static async #writeData(data) {
        try {
            await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error writing to database:', error);
        }
    }

    static async getAll() {
        const data = await this.#readData();
        // Sort topics by upvotes in descending order
        let topics = data.topics || [];
        topics.sort((a, b) => b.upvotes - a.upvotes);
        
        // Sort links inside each topic by upvotes as well
        topics.forEach(topic => {
            if(topic.links) {
                topic.links.sort((a, b) => b.upvotes - a.upvotes);
            }
        });
        return topics;
    }

    static async getById(id) {
        const data = await this.#readData();
        return data.topics.find(t => t.id === id);
    }

    static async create(title, description) {
        const data = await this.#readData();
        const newTopic = {
            id: uuidv4(),
            title,
            description,
            upvotes: 0,
            links: [],
            createdAt: new Date().toISOString()
        };
        data.topics.push(newTopic);
        await this.#writeData(data);
        return newTopic;
    }

    static async update(id, title, description) {
        const data = await this.#readData();
        const index = data.topics.findIndex(t => t.id === id);
        if (index !== -1) {
            data.topics[index].title = title;
            data.topics[index].description = description;
            await this.#writeData(data);
            return data.topics[index];
        }
        return null;
    }

    static async delete(id) {
        const data = await this.#readData();
        const filtered = data.topics.filter(t => t.id !== id);
        if (filtered.length !== data.topics.length) {
            data.topics = filtered;
            await this.#writeData(data);
            return true;
        }
        return false;
    }

    static async upvote(id) {
        const data = await this.#readData();
        const topic = data.topics.find(t => t.id === id);
        if (topic) {
            topic.upvotes += 1;
            await this.#writeData(data);
            return topic;
        }
        return null;
    }

    // --- Link operations ---
    static async addLink(topicId, url, title) {
        const data = await this.#readData();
        const topic = data.topics.find(t => t.id === topicId);
        if (topic) {
            const newLink = {
                id: uuidv4(),
                title,
                url,
                upvotes: 0,
                createdAt: new Date().toISOString()
            };
            topic.links.push(newLink);
            await this.#writeData(data);
            return newLink;
        }
        return null;
    }

    static async deleteLink(topicId, linkId) {
        const data = await this.#readData();
        const topic = data.topics.find(t => t.id === topicId);
        if (topic) {
            const originalLength = topic.links.length;
            topic.links = topic.links.filter(l => l.id !== linkId);
            if (topic.links.length !== originalLength) {
                await this.#writeData(data);
                return true;
            }
        }
        return false;
    }

    static async upvoteLink(topicId, linkId) {
        const data = await this.#readData();
        const topic = data.topics.find(t => t.id === topicId);
        if (topic) {
            const link = topic.links.find(l => l.id === linkId);
            if (link) {
                link.upvotes += 1;
                await this.#writeData(data);
                return link;
            }
        }
        return null;
    }
}

module.exports = Topic;
