from flask import Flask, send_from_directory, jsonify, request
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config.from_object('config')
api = Api(app)
db = SQLAlchemy(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return send_from_directory('static', 'index.html')

class Parishioner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    city = db.Column(db.String)
    street = db.Column(db.String)
    streetNumber = db.Column(db.Integer)
    streetNumberSuffix = db.Column(db.String)
    # offerings = db.relationship('offerings', backref='parishioner', lazy='dynamic')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'city':  self.city,
            'street': self.street,
            'streetNumber': self.streetNumber,
            'streetNumberSuffix': self.streetNumberSuffix
        }

class Offering(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Float)
    date = db.Column(db.DateTime)
    # parishioner_id = db.Column(db.Integer, db.ForeignKey('parishioner.id'))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'value': self.value,
            'date': self.date,
            'parishioner': self.parishioner_id
        }

class Parishioners(Resource):
    def get(self):
        return jsonify({'parishioner': [i.serialize for i in Parishioner.query.all()]})
    def post(self):
        data = request.json['parishioner']
        p = Parishioner(data)
        db.session.add(p)
        db.session.commit()
        return 200

api.add_resource(Parishioners, '/parishioners')

if __name__ == "__main__":
    app.run(debug=True)
