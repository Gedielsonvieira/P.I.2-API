const con = require('../conexBD/config')

exports.buscarPorUsername = (username, callback) => {
    const sql = "SELECT * FROM cliente where username=?";
    con.query(sql, [username], (err, rows) => {
        if(err){            
            const error = {
                status: 500,
                msg: err
            }
            callback(error,null);
        }
        else {
            if(rows && rows.length > 0){
                callback(null,rows[0]);
            }
            else{ 
                const error = {
                    status: 404,
                    msg: "usuario nao encontrado"
                }
                callback(error,null);
            }
        }
    })

}