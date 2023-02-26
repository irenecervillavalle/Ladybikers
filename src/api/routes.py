"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import db, Usuario, Ruta, Favorito
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

# crear usuario
@api.route('/signup', methods=['POST'])
def create_user():
    if request.method != 'POST':
        return jsonify({"error": "esta ruta espera el metodo POST"}), 405
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

# hacer login
@api.route('/login', methods=['POST'])
def login():
    if request.method != 'POST':
        return jsonify({"error": "esta ruta espera el metodo POST"}), 405
    try:
        usuario = request.json.get('user', None)
        contrasena = request.json.get('password', None)
        usuario_db = Usuario.query.filter_by(usuario=usuario).first()
        if not usuario_db:
            return jsonify({"error": "usuario no encontrado"}), 404
        if usuario_db.contrasena != contrasena:
            return jsonify({"error": "contraseña incorrecta"}), 400
        access_token = create_access_token(identity=usuario)
        return jsonify({"mensaje": "login exitoso", "access_token": access_token}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# acceder info usuario
@api.route('/usuario', methods=['GET'])
@jwt_required() 
# ruta protegida, hay que mandar el token en un Authorization header
def usuario_actual():
    if request.method != 'GET':
        return jsonify({"error": "esta ruta espera el metodo GET"}), 405
    try:
        usuario_actual = get_jwt_identity()
        usuario_db = Usuario.query.filter_by(usuario=usuario_actual).first()
        return jsonify({"datos usuario": usuario_db.serialize()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# editar datos usuario
@api.route('/usuario/editar', methods=['PUT'])
@jwt_required()
def editar_usuario():
    if request.method != 'PUT':
        return jsonify({"error": "esta ruta espera el metodo PUT"}), 405
    try:
        nuevos_datos = request.get_json()
        usuario_actual = get_jwt_identity()
        usuario = Usuario.query.filter_by(usuario=usuario_actual).first()
        if not usuario:
            return jsonify({"error": "usuario no encontrado"}), 404
        if not usuario_actual == usuario.usuario:
            return jsonify({"error": "operacion no permitida"}), 403
        for key, value in nuevos_datos.items():
            setattr(usuario, key, value)
        db.session.commit()
        usuario_editado = Usuario.query.filter_by(id=usuario.id).first()
        return jsonify({"mensaje": "datos actualizados con exito", "datos usuario": usuario_editado.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# borrar cuenta de usuario
@api.route('/usuario/borrar', methods=['DELETE'])
@jwt_required()
def borrar_usuario():
    if request.method != 'DELETE':
        return jsonify({"error": "esta ruta espera el metodo DELETE"}), 405
    try:
        usuario_actual = get_jwt_identity()
        usuario = Usuario.query.filter_by(usuario=usuario_actual).first()
        if not usuario:
            return jsonify({"error": "usuario no encontrado"}), 404
        if not usuario_actual == usuario.usuario:
            return jsonify({"error": "operacion no permitida"}), 403
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({"mensaje": "usuario borrado con exito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# ver todas las rutas
@api.route('/rutas', methods=['GET'])
def ver_rutas():
    if request.method != 'GET':
        return jsonify({"error": "esta ruta espera el metodo GET"}), 405
    try:
        rutas = Ruta.query.all()
        rutas_lista = [r.serialize() for r in rutas]
        return jsonify({"rutas": rutas_lista}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# crear nueva ruta
@api.route('/ruta/crear', methods=['POST'])
@jwt_required()
def crear_ruta():
    if request.method != 'POST':
        return jsonify({"error": "esta ruta espera el metodo POST"}), 405
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

# ver detalle de una ruta
@api.route('ruta_detalle/<int:ruta_id>', methods=['GET'])
def detalle_ruta(ruta_id):
    if request.method != 'GET':
        return jsonify({"error": "esta ruta espera el metodo GET"}), 405
    try:
        ruta = Ruta.query.filter_by(id=ruta_id).first()
        if not ruta:
            return jsonify({"error": "ruta no encontrada"}), 404
        return jsonify({"ruta": ruta.serialize()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# editar ruta
@api.route('/ruta/<int:ruta_id>/editar', methods=['PUT'])
@jwt_required()
def editar_ruta(ruta_id):
    if request.method != 'PUT':
        return jsonify({"error": "esta ruta espera el metodo PUT"}), 405
    try:
        usuario_actual = get_jwt_identity()
        ruta = Ruta.query.filter_by(id=ruta_id).first()
        if not ruta:
            return jsonify({"error": "ruta no encontrada"}), 404
        if ruta.creador != usuario_actual:
            return jsonify({"error": "usuario actual no es el creador de la ruta"}), 403
        nuevos_datos = request.get_json()
        for key, value in nuevos_datos:
            setattr(ruta, key, value)
        ruta = Ruta.query.filter_by(id=ruta_id).first()
        db.session.commit()
        return jsonify({"mensaje": "datos actualizados con exito", "ruta": ruta.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# borrar ruta
@api.route('/ruta/<int:ruta_id>/borrar', methods=['DELETE'])
@jwt_required()
def borrar_ruta(ruta_id):
    if request.method != 'DELETE':
        return jsonify({"error": "esta ruta espera el metodo DELETE"}), 405
    try:
        usuario_actual = get_jwt_identity()
        ruta = Ruta.query.filter_by(id=ruta_id).first()
        if not ruta:
            return jsonify({"error": "ruta no encontrada"}), 404
        if ruta.creador != usuario_actual:
            return jsonify({"error": "usuario actual no es el creador de la ruta"}), 403
        db.session.delete(ruta)
        db.session.commit()
        return jsonify({"mensaje": "ruta borrada con exito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# agregar favorito
@api.route('/ruta/<int:ruta_id>/favorito', methods=['POST'])
@jwt_required()
def agregar_favorito(ruta_id):
    if request.method != 'POST':
        return jsonify({"error": "esta ruta espera el metodo POST"}), 405
    try:
        ruta = Ruta.query.filter_by(id=ruta_id).first()
        if not ruta:
            return jsonify({"error": "ruta no encontrada con este id"}), 404
        fav = Favorito(
            ruta_id=ruta_id,
            usuario_id=get_jwt_identity()
        )
        db.session.add(ruta)
        db.session.commit()
        return jsonify({"mensaje": "ruta creada con exito", "ruta": ruta.serialize(), "favorito_id": fav.id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# borrar favorito
@api.route('/ruta/<int:fav_id>/borrar_favorito', methods=['DELETE'])
@jwt_required()
def borrar_favorito(fav_id):
    if request.method != 'DELETE':
        return jsonify({"error": "esta ruta espera el metodo DELETE"}), 405
    try:
        fav = Favorito.query.filter_by(id=fav_id).first()
        if not fav:
            return jsonify({"error": "favorito no encontrado"}), 404
        usuario_actual = get_jwt_identity()
        if fav.usuario_id != usuario_actual:
            return jsonify({"error": "id de usuario erronea"}), 403
        db.session.delete(fav)
        db.session.commit()
        return jsonify({"mensaje": "favorito borrado con exito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
