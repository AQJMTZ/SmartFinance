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
    user=request.json['user']
    password=request.json['password']
    if data.login(user, password):
      return jsonify({"error": "Usuario ya existe"})
    data.signup(user, password)
    return  jsonify({"ok":True})

@webApp.route('/login',methods=['POST']) #iniciar sesion
def addtoinv():
  if request.method=='POST':
    user=request.json['user']
    password=request.json['password']
    if data.login(user, password):
      return jsonify({"ok": True, "key": "userKey"}) #TODO, crear token
    return jsonify({"error": "Usuario o contrasena incorrecta"})

webApp.run(host='0.0.0.0', port=8080, debug=True)