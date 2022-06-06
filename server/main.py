from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from mongoDB import data
import model
load_dotenv()
import os
import json

api_key = os.getenv("ONLINE_KEY")

@webApp.route('/signup',methods=['POST']) #registrarse
def signup():
  if request.method=='POST':
    usuario=request.json['usuario']
    contraseña=request.json['contraseña']
    if data.login(usuario, contraseña):
      return jsonify({"error": "Usuario ya existe"}) #error
    data.signup(usuario, contraseña)
    return  jsonify({"ok":True})

@webApp.route('/login',methods=['POST']) #iniciar sesion
def login():
  if request.method=='POST':
    usuario=request.json['user']
    contraseña=request.json['password']
    if data.login(usuario, contraseña):
      return jsonify({"ok": True, "key": "userKey"}) #TODO, crear token
    return jsonify({"error": "Usuario o contraseña incorrecta"}) #error

@webApp.route('/registroAhorroIdeal',methods=['POST']) #iniciar sesion
def registroAhorroIdeal():
    if ahorroIdeal():
        return jsonify({"error": "Ya se tiene un ahorro ideal para la cuenta"}) #error
    if monto < 0 or monto == None:
        return jsonify({"error": "Monto incorrecto"}) #error
    if request.method=='POST':
        monto=request.json['monto']
    data.registroAhorroIdeal(monto)
    return  jsonify({"ok":True})

@webApp.route('/registroLimite',methods=['POST']) #iniciar sesion
def registroLimite():
    if limite():
        return jsonify({"error": "Ya se tiene un limite para la cuenta"}) #error
    if monto < 0 or monto == None:
        return jsonify({"error": "Monto incorrecto"}) #error
    if request.method=='POST':
        monto=request.json['monto']
    data.registroLimite(monto)
    return  jsonify({"ok":True})

@webApp.route('/registroIngreso',methods=['POST']) #iniciar sesion
def registroIngreso():
    if monto < 0 or monto == None:
        return jsonify({"error": "Monto incorrecto"}) #error
    if request.method=='POST':
        monto=request.json['monto']
        desc=request.json['desc']
    data.registroIngreso(monto, desc)
    return  jsonify({"ok":True})

@webApp.route('/registroEgreso',methods=['POST']) #iniciar sesion
def registroEgreso():
    if monto < 0 or monto == None:
        return jsonify({"error": "Monto incorrecto"}) #error
    if request.method=='POST':
        monto=request.json['monto']
        desc=request.json['desc']
    data.registroEgreso(monto, desc)
    return  jsonify({"ok":True})

webApp.run(host='0.0.0.0', port=8080, debug=True)
