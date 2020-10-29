from flask.json import JSONEncoder
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from model import db, User
import dateutil.parser

import json

import os
template_dir = os.path.abspath('.')
app = Flask(__name__, template_folder=template_dir)
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite"


with app.app_context():
    db.init_app(app)
    db.app = app
    db.create_all()


@ app.route("/")
def my_index():

    return render_template("index.html", csrf="csrf_token")


@ app.route('/api/users', methods=['POST'])
def handle_submit():
    if request.method == "POST":
        form = request.get_json()
        name = form['name']
        email = form['email']
        kids = form['kids']
        date = dateutil.parser.isoparse(form['date'])

        user = User(name=name, email=email, kids=kids, date=date)
        db.session.add(user)
        db.session.commit()

    return jsonify(User.query.all())


@ app.route('/api/users', methods=['GET'])
def handle_get():
    return jsonify(User.query.all())


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=8080)
