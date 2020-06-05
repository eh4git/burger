var connection = require("../config/connection.js");

//create array from ? marks
function printQuestionMarks(num) {
    var arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?")
    }
    return arr.toString();
}

//Genertes array of "Key=value"
function createObjColVal(createObjColVal) {
    var arr = [];
    for (var key in createObjColVal) {
        var value= createObjColVal[key];
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
          }
        arr.push(key + "="+ value)
    }
    return arr.toString();
}

var orm = {
    
    all: function (tableInput,cb) {
        // console.log("selectAll tableInput: " +tableInput)
        var queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, function(err,result) {
            if(err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function(table, cols, vals, cb) {
        var queryString = `INSERT INTO ${table} (${cols}) VALUES (${printQuestionMarks(vals.length)})`;
        connection.query(queryString, vals, function(err,result) {
            if(err) {
                throw err;
            }
            cb(result);
        });
    },
    update: function(table, objColVals, condition, cb) {
        var queryString = `UPDATE ${table} SET ${createObjColVal(objColVals)} WHERE ${condition}`;
        connection.query(queryString, function(err,result) {
            if(err) {
                throw err;
            }
            cb(result);
        });
    },
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
}


module.exports = orm;