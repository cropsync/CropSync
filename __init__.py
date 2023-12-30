import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager




app=Flask(__name__)
app.config['SECRET_KEY']='e46165afab2a0992081b372a1eaee11b'
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///C:\\code-files\\CropSync\\site.db'
db=SQLAlchemy(app)
bcrypt=Bcrypt(app)
login_manager=LoginManager(app)
login_manager.login_view='login'  # type: ignore
login_manager.login_message_category='info'



import routes