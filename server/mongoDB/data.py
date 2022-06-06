import pymongo
import dns
import json
import model

print("dataing!")
client = pymongo.MongoClient("mongodb+srv://tec:100@cluster0-rmunm.mongodb.net/dataBase?retryWrites=true&w=majority")
users = dataBase.user


def signup(user, password):
  users.insert_one({
    "user" : user, 
    "password": password,
    })

def login(user, password):
  if users.find_one({"user": user, "password": password}):
    return True
  return False