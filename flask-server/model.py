from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass
import datetime
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()


@dataclass
class User(db.Model, SerializerMixin):
    id: int
    name: str
    email: str
    kids: int
    date: datetime.datetime

    id = db.Column(db.Integer, unique=True,  primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    kids = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return '<User %r>' % self.username
