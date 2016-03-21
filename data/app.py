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
  offerings = db.relationship('Offering', backref='parishioner', lazy='dynamic')

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

  def __init__(self, data):
        self.name = data['name']
        self.city = data['city']
        self.street = data['street']
        self.streetNumber = data['streetNumber']

class Offering(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  value = db.Column(db.Float)
  date = db.Column(db.DateTime)
  parishioner_id = db.Column(db.Integer, db.ForeignKey('parishioner.id'))

  @property
  def serialize(self):
        return {
            'id': self.id,
            'value': self.value,
            'date': self.date,
            'parishioner': self.parishioner_id
        }

  def __init__(self, data):
        self.value = data['value']
        self.date = datetime.strptime(data['date'],'%Y-%m-%d %H:%M')
        self.parishioner_id = data['parishioner']

# API
class Parishioners(Resource):
  def get(self):
        return jsonify({'parishioner': [i.serialize for i in Parishioner.query.all()]})
  def post(self):
        data = request.json['parishioner']
        i = Parishioner(data)
        db.session.add(i)
        db.session.commit()
        return 200

class ParishionersWithId(Resource):
  def get(self, parishioner_id):
      return jsonify({'parishioner': Parishioner.query.get(parishioner_id).serialize})

class Offerings(Resource):
  def get(self):
      return jsonify({'offering': [i.serialize for i in Offering.query.all()]})
  def post(self):
      data = request.json['offering']
      i = Offering(data)
      db.session.add(i)
      db.session.commit()
      return 200

class OfferingsWithId(Resource):
  def get(self, offering_id):
      return jsonify({'offering': Offering.query.get(offering_id).serialize})

api.add_resource(Parishioners, '/parishioners')
api.add_resource(ParishionersWithId, '/parishioners/<int:parishioner_id>')
api.add_resource(Offerings, '/offerings')
api.add_resource(OfferingsWithId, '/offerings/<int:offering_id>')

if __name__ == "__main__":
  app.run(debug=True)
