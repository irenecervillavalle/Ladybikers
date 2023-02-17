"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import db, Usuario, Ruta, Favorito
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def create_user():
    try:
        user_data = request.get_json()
        nombre = user_data['nombre']
        apellido = user_data['apellido']
        email = user_data['email']
        usuario = user_data['usuario']
        contrasena = user_data['contrasena']
        is_active = user_data['is_active']
        nuevo_usuario = Usuario(
            nombre = nombre,
            apellido = apellido,
            email = email,
            usuario = usuario,
            contrasena = contrasena,
            is_active = is_active
        )
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({"mensaje": "nuevo usuario creado con exito", "datos_usuario": nuevo_usuario.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/login', methods=['POST'])
def login():
    try:
        usuario = request.json.get('usuario', None)
        contrasena = request.json.get('contrasena', None)
        usuario_db = Usuario.query.filter_by(usuario=usuario).first()
        if not usuario_db:
            return jsonify({"error": "usuario no encontrado"}), 404
        if usuario_db.contrasena != contrasena:
            return jsonify({"error": "contraseña incorrecta"}), 400
        access_token = create_access_token(identity=usuario)
        return jsonify({"mensaje": "login exitoso", "access_token": access_token}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/usuario', methods=['GET'])
@jwt_required() 
# ruta protegida, hay que mandar el token en un Authorization header
def usuario_actual():
    try:
        usuario_actual = get_jwt_identity()
        usuario_db = Usuario.query.filter_by(usuario=usuario_actual).first()
        return jsonify({"datos usuario": usuario_db.serialize()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/usuario/editar', methods=['PUT'])
@jwt_required()
def editar_usuario():
    try:
        nuevos_datos = request.get_json()
        usuario_actual = get_jwt_identity()
        usuario = Usuario.query.filter_by(usuario=usuario_actual).first()
        if not usuario:
            return jsonify({"error": "usuario no encontrado"}), 404
        if not usuario_actual == usuario.usuario:
            return jsonify({"error": "operacion no permitida"}), 401
        for key, value in nuevos_datos.items():
            setattr(usuario, key, value)
        db.session.commit()
        usuario_editado = Usuario.query.filter_by(id=usuario.id).first()
        return jsonify({"mensaje": "datos actualizados con exito", "datos usuario": usuario_editado.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/usuario/borrar', methods=['DELETE'])
@jwt_required()
def borrar_usuario():
    try:
        usuario_actual = get_jwt_identity()
        usuario = Usuario.query.filter_by(usuario=usuario_actual).first()
        if not usuario:
            return jsonify({"error": "usuario no encontrado"}), 404
        if not usuario_actual == usuario.usuario:
            return jsonify({"error": "operacion no permitida"}), 401
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({"mensaje": "usuario borrado con exito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/rutas', methods=['GET'])
def ver_rutas():
    try:
        rutas = Ruta.query.all()
        rutas_lista = [r.serialize() for r in rutas]
        return jsonify({"rutas": rutas_lista}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/ruta/crear', methods=['POST'])
@jwt_required()
def crear_ruta():
    try:
        datos_ruta = request.get_json()
        ruta = Ruta(
            punto_partida=datos_ruta['punto_partida'],
            punto_llegada=datos_ruta['punto_llegada'],
            valoracion_usuario=datos_ruta['valoracion_usuario'],
            categoria=datos_ruta['categoria'],
            temporalidad=datos_ruta['temporalidad'],
            creador=get_jwt_identity()
        )
        db.session.add(ruta)
        db.session.commit()
        return jsonify({"mensaje": "ruta creada con exito", "ruta": ruta.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('ruta_detalle/<int:ruta_id>', methods=['GET'])
def detalle_ruta(ruta_id):
    try:
        ruta = Ruta.query.filter_by(id=ruta_id).first()
        if not ruta:
            return jsonify({"error": "ruta no encontrada"}), 404
        return jsonify({"ruta": ruta.serialize()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# editar ruta
# borrar ruta
# agregar favorito
# borrar favorito