const fs = require('fs').promises;
const fallbackConfig = [{
    "name": "local",
    "port": "6379",
    "host": "localhost"
}]

class Configuration {

    constructor(path) {
        this.path = path;
    }

    async load() {
        return fs.readFile(this.path).then(file => {
            this.config = JSON.parse(file);
        }).catch(async err => {
            console.error(err);
            console.warn('Using fallback config');
            this.config = fallbackConfig.slice();
        });
    }

    get servers(){
        return this.config.slice();
    }

    get loaded(){
        return !!this.config;
    }
    
}

module.exports = Configuration;