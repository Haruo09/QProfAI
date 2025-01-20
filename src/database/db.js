const mysql = require('serverless-mysql')({
    config: {
        host     : "localhost",
        database : "bancodequestoes",
        user     : "root",
        password : ""
    },
    library: require('mysql2')
});

export default mysql;
