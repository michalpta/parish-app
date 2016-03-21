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
  name = db.Column(db.String, nullable=False)
  city = db.Column(db.String)
  street = db.Column(db.String)
  streetNumber = db.Column(db.Integer)
  streetNumberSuffix = db.Column(db.String)
  offerings = db.relationship('Offering', backref='parishioner', lazy='dynamic', cascade="all, delete-orphan")

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
  value = db.Column(db.Float, nullable=False)
  date = db.Column(db.DateTime, nullable=False)
  parishioner_id = db.Column(db.Integer, db.ForeignKey('parishioner.id'), nullable=False)

  @property
  def serialize(self):
        return {
            'id': self.id,
            'value': self.value,
            'date': datetime.strftime(self.date,'%Y-%m-%d %H:%M'),
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
      return jsonify({'parishioner': i.serialize})

class ParishionersWithId(Resource):
  def get(self, parishioner_id):
      return jsonify({'parishioner': Parishioner.query.get(parishioner_id).serialize})
  def delete(self, parishioner_id):
      parishioner = Parishioner.query.get(parishioner_id)
      db.session.delete(parishioner)
      db.session.commit()
      return
  def put(self, parishioner_id):
      data = request.json['parishioner']
      parishioner = Parishioner.query.get(parishioner_id)
      parishioner.name = data['name']
      db.session.commit()
      return jsonify({'parishioner': parishioner.serialize})

class Offerings(Resource):
  def get(self):
      return jsonify({'offering': [i.serialize for i in Offering.query.all()]})
  def post(self):
      data = request.json['offering']
      i = Offering(data)
      db.session.add(i)
      db.session.commit()
      return jsonify({'offering': i.serialize})

class OfferingsWithId(Resource):
  def get(self, offering_id):
      return jsonify({'offering': Offering.query.get(offering_id).serialize})
  def delete(self, offering_id):
      offering = Offering.query.get(offering_id)
      db.session.delete(offering)
      db.session.commit()
      return
  def put(self, offering_id):
      data = request.json['offering']
      offering = Offering.query.get(offering_id)
      offering.value = data['value']
      offering.date = datetime.strptime(data['date'],'%Y-%m-%d %H:%M')
      offering.parishioner_id = data['parishioner']
      db.session.commit()
      return jsonify({'offering': offering.serialize})

api.add_resource(Parishioners, '/parishioners')
api.add_resource(ParishionersWithId, '/parishioners/<int:parishioner_id>')
api.add_resource(Offerings, '/offerings')
api.add_resource(OfferingsWithId, '/offerings/<int:offering_id>')

if __name__ == "__main__":
  app.run(debug=True)
