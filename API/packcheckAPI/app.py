from flask import Flask, request
from flask_cors import CORS
from flask import jsonify
from flask_mysqldb import MySQL
app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = "rahulkandwal19.mysql.pythonanywhere-services.com"
app.config['MYSQL_USER'] = "rahulkandwal19"
app.config['MYSQL_PASSWORD'] = "graphic123"
app.config['MYSQL_DB'] = "packcheck_data"
mydb = MySQL(app)

def searchproduct(productname):
    mycursor = mydb.connection.cursor()
    mycursor.execute("SELECT product_name FROM product_info where UPPER(product_name) LIKE UPPER('%"+productname+"%)'")
    itemresult=mycursor.fetchall()
    itemlist = []
    for i in itemresult:
        itemlist.append(itemresult[0])
        itemlist.append("+")
    return str(itemlist)

def chemicalfound(productname):
    mycursor = mydb.connection.cursor()
    mycursor.execute("SELECT chemicals FROM product_info where product_name ="+"UPPER("+productname+")")
    itemresult=mycursor.fetchall()
    itemlist= itemresult.split("+")
    return str(itemlist)

@app.route('/search_result')
def search_result():
    key = request.args.get('key')
    result = searchproduct(key)
    return jsonify({"result": result})

@app.route('/chemical_found')
def chemical_found():
    key = request.args.get('key')
    result = chemicalfound(key)
    return jsonify({"result": result})
if __name__ == '__main__':
    app.run()
