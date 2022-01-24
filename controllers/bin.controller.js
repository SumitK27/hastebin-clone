const Document = require("../models/Document");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/hastebin", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

class Bins {
    getHome(req, res) {
        const code = `Welcome to WasteBin!
Use the commands in the top right corner
to create a new file to share with others.`;

        res.render("code-display", { code, language: "plaintext" });
    }

    createNew(req, res) {
        res.render("new");
    }

    async saveBin(req, res) {
        const value = req.body.value;
        try {
            const document = await Document.create({ value });
            res.redirect(`/${document.id}`);
        } catch (e) {
            res.render("new", { value });
        }
    }

    async duplicateBin(req, res) {
        const id = req.params.id;
        try {
            const document = await Document.findById(id);
            res.render("new", { value: document.value });
        } catch (e) {
            res.redirect(`/${id}`);
        }
    }

    async getBin(req, res) {
        const id = req.params.id;
        try {
            const document = await Document.findById(id);

            res.render("code-display", {
                code: document.value,
                id,
                share: `${req.protocol}://${req.hostname}${req.url}`,
            });
        } catch (e) {
            res.redirect("/");
        }
    }
}

module.exports = Bins;
