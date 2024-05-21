from flask import Flask, request
from flask_cors import CORS
from flask import jsonify
app = Flask(__name__)
CORS(app)


@app.route('/search_result')
def search_result():
    key = request.args.get('key')
    return jsonify({"result": 'test+test+test+test+test+test+test+test'})


if __name__ == '__main__':
    app.run()
