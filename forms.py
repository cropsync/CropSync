from flask_wtf import FlaskForm
from wtforms import StringField,BooleanField,EmailField,SubmitField,PasswordField
from wtforms.validators import DataRequired,Length,EqualTo,Email,ValidationError
from models import User
from flask_login import current_user
from flask_wtf.file import FileField,FileAllowed

class RegistrationForm(FlaskForm):
    username=StringField('Username',validators=[DataRequired(),Length(min=2,max=20)])
    email=EmailField('Email',validators=[DataRequired(),Email()])
    password=PasswordField('Password',validators=[DataRequired()])
    confirm_password=PasswordField('Confirm Password',validators=[DataRequired(),EqualTo('password')])
    submit=SubmitField('SignUp')
    
    def validate_username(self,username):
        user=User.query.filter_by(username=username.data).first()
        
        if user:
            raise ValidationError('That Username is taken.Please choose different one.')
    
    def validate_email(self,email):
        
        email=User.query.filter_by(email=email.data).first()
        if email:
            raise ValidationError('That email is taken.Please choose a different one')
    

class LoginForm(FlaskForm):
      email=EmailField('Email',validators=[DataRequired(),Email()])
      password=PasswordField('Password',validators=[DataRequired()])
      remember=BooleanField('Remember Me')
      submit=SubmitField('Log In')
      
class UpdateAccountForm(FlaskForm):
    username=StringField('Username',validators=[DataRequired(),Length(min=2,max=20)])
    email=EmailField('Email',validators=[DataRequired(),Email()])
    picture=FileField('Update Profile Picture',validators=[FileAllowed(['jpg','png'],'Images only!')])
    submit=SubmitField('Update')
    
    def validate_username(self,username):
        if username.data != current_user.username: # type: ignore
            user=User.query.filter_by(username=username.data).first()
            if user :
                raise ValidationError('That username is taken by someone,Please Choose different one.')
        
    def validate_email(self,email):
        if email.data != current_user.email: # type: ignore
            email=User.query.filter_by(email=email.data).first()
            if email:
                raise ValidationError('That email is taken.Please choose a different one')
    
    