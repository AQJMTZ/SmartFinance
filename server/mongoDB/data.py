import pymongo
from pymongo import MongoClient
import dns
import json
import model


cluster = "mongodb+srv://SMF:projectoFinal@cluster0.wde0cra.mongodb.net/test"
cliente =  MongoClient(cluster)
database = cliente["datos"]
usuario = database["usuarios"]
idUsuario = None

def getDatabase():
    return database

def signup(usuario, contraseña):
  usuario.insert_one({
    "usuario" : usuario,
    "contraseña": contraseña,
    })

def login(usuario, contraseña):
  if usuario.find_one({"usuario": usuario, "contraseña": contraseña}):
    return True
    currentUsuario = usuario.find_one({"usuario": usuario, "contraseña": contraseña})
    idUsuario = currentUsuario["_id"]
  return False

def registroAhorroIdeal(monto):
    database["ahorroIdeal"].insert_one({
        "idUsuario": idUsuario,
        "monto": monto
    })

def ahorroIdeal():
  if database["ahorroIdeal"].find_one({"idUsuario": idUsuario}):
    return database["ahorroIdeal"].find_one({"idUsuario": idUsuario})["monto"]
  return False

def registroLimite(monto):
    database["limites"].insert_one({
        "idUsuario": idUsuario,
        "monto": monto
    })

def limite():
  if database["limites"].find_one({"idUsuario": idUsuario}):
    return database["limites"].find_one({"idUsuario": idUsuario})["monto"]
  return False

def registroIngreso(monto, desc, categoria):
        database["ingresos"].insert_one({
            "idUsuario": idUsuario,
            "monto": monto,
            "desc": desc,
            "categoria": categoria,
            "fecha": datetime.datetime.utcnow()
        })

def registroEgreso(monto, desc, categoria):
        database["egresos"].insert_one({
            "idUsuario": idUsuario,
            "monto": monto,
            "desc": desc,
            "categoria": categoria,
            "fecha": datetime.datetime.utcnow()
        })

if __name__ == "__main__
    dbname = getDatabase()
    signup = signup()
    login = login()
    registroAhorroIdeal = registroAhorroIdeal()
    ahorroIdeal = ahorroIdeal()
    registroLimite = registroLimite ()
    limite = limite()
    registroIngreso = registroIngreso()
    registroEgreso = registroEgreso()
