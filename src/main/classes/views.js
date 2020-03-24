const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const VIEWS = {
    'authorize': __dirname + "/../views/pages/authorize.hbs",
    'not_ready': __dirname + "/../views/pages/notReady.hbs",
};
const BASE = __dirname + "/../views/layouts/base.hbs";

class Views {
    constructor() {
        this.compiled = {};
        handlebars.registerPartial('layouts/base', this._compileTemplate(BASE));
    }

    getView(name, data) {
        if (!Object.keys(VIEWS).includes(name))
            throw new Error(`Requested view ${name} does NOT exist.`);

        let template = this._getTemplate(name);
        return template(data);
    }

    _getTemplate(tmplName) {
        if (Object.keys(this.compiled).includes(tmplName))
            return this.compiled[tmplName];

        let _path = VIEWS[tmplName];
        return this.compiled[tmplName] = this._compileTemplate(_path);
    }

    _compileTemplate(_path) {
        let source = fs.readFileSync(path.resolve(_path)).toString();
        return handlebars.compile(source);
    }
}

module.exports = Views;
