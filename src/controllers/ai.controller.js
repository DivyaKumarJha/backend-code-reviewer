const aiService = require('../services/ai.service');

async function getReview(req, res) {
    const { code, language } = req.body;
    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }
    if (!language) {
        return res.status(400).json({ error: 'Language is required' });
    }

    try {
        let response = await aiService.generateContent(code, language);

        // Fix newlines
        response = response.replace(/\\n/g, '\n');

        // Optional: Patch code blocks (if your LLM misses triple backticks)
        response = response.replace(new RegExp(`(^|\\n)(${language})`, 'g'), `$1\`\`\`${language}`);

        // Close any open code blocks
        const codeBlockCount = (response.match(new RegExp(`\`\`\`${language}`, 'g')) || []).length;
        if (codeBlockCount % 2 !== 0) {
            response += '\n```'; // close unclosed block
        }

        res.send({ response });
    } catch (err) {
        res.status(500).json({ error: 'Error generating content', details: err.message });
    }
}

module.exports = {
     getReview,
};