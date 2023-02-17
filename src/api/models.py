from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(60), nullable=False)
    apellido = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    usuario = db.Column(db.String(60), unique=True, nullable=False)
    contrasena = db.Column(db.String(60), unique=False, nullable=False)
    favoritos = db.relationship('Favorito', backref=db.backref("usuario"))

    def __repr__(self):
        return f'<Usuario ID: {self.id} - {self.usuario}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "usuario": self.usuario,
            "favoritos": [f.ruta_id for f in self.favoritos]
            # do not serialize the password, its a security breach
        }

class Ruta(db.Model):
    __tablename__ = 'ruta'
    id = db.Column(db.Integer, primary_key=True)
    punto_partida = db.Column(db.String(120), nullable=False)
    punto_llegada = db.Column(db.String(120))
    valoracion_usuario = db.Column(db.Integer)
    categoria = db.Column(db.String(60))
    temporalidad = db.Column(db.String(60))
    creador = db.Column(db.String(60), db.ForeignKey('usuario.usuario'), nullable=True)
    favoritos = db.relationship('Favorito', backref=db.backref("ruta"))

    def __repr__(self):
        return f'<Ruta ID: {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "punto_partida": self.punto_partida,
            "punto_llegada": self.punto_llegada,
            "valoracion_usuario": self.valoracion_usuario,
            "categoria": self.categoria,
            "temporalidad": self.temporalidad
        }

class Favorito(db.Model):
    __tablename__ = 'favorito'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    ruta_id = db.Column(db.Integer, db.ForeignKey('ruta.id'), nullable=False)

    def __repr__(self):
        return f'<Favorito ID: {self.id}, Usuario {self.usuario_id} - Ruta {self.ruta_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "ruta_id": self.ruta_id,
        }