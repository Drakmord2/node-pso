
const configs = {
    secretKey: '12345-43215-51423-12345-09683',
    facebook: {
        clientId: '1791418684485242',
        clientSecret: '15db946b27b9439cb4338eb19d5a31e1'
    },
    mongoUrl: 'mongodb://mongo:27017/conFusion',
    mongoOpts: {},
    sessionOpts: {
        name: 'session-id',
        secret: this.secretKey,
        saveUninitialized: false,
        resave: false
    },
    authOpts: {
        passthrough: [ '/', '/users/login', '/users/signup' ]
    }
};

module.exports = configs;
