"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            poolSize: 50,
            autoIndex: false
        },
        url: 'mongodb+srv://idevAdmin:idevAdmin@idev.i7okt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    },
    server: {
        host: 'localhost',
        port: 2020
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map