import os
import secrets
from PIL import Image
from flask import render_template,url_for,flash,redirect,request,abort
from __init__ import app,db,bcrypt
from  forms import RegistrationForm,LoginForm
from  models import User
from flask_login import login_user,current_user,logout_user,login_required


@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html')


@app.route("/register",methods=['GET','POST'])
def register():
    #if current_user.is_authenticated: # type: ignore
     #    return redirect(url_for('home'))
    form=RegistrationForm()
    if form.validate_on_submit():
        hashed_password=bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user=User(username=form.username.data,email=form.email.data,password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in.', 'success')
        return redirect(url_for('login'))
    else:
        print('Form is not valid.')
        print(form.errors)
        return render_template('register.html',form=form)

@app.route("/login",methods=["GET","POST"])
def login():
    #if current_user.is_authenticated:  # type: ignore
       #  return redirect('url_for(home)')
    form=LoginForm()
    if form.validate_on_submit():
        user=User.query.filter_by(email=form.email.data).first()
        
        if user and bcrypt.check_password_hash(user.password,form.password.data):
            login_user(user,remember=form.remember.data)
            next_page=request.args.get('next')
            return redirect(next_page) if next_page else redirect('https://cropsync.github.io/CropSync/')
        else:
             flash('Login Unsuccessful.Please check email and password','danger')
    return render_template('login.html',form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))

