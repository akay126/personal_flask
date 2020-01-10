import os
from flask import Flask, render_template, flash, redirect, url_for, logging, session, request
from flask_login import (
    current_user,
    login_required,
    login_user,
    logout_user
)
from flask import current_app as app


from app import db, login_manager
from app.base import blueprint
from app.base.forms import LoginForm, CreateAccountForm
from app.base.models import User
from app.base.util import verify_pass

@blueprint.route("/")
def home():
    return render_template("home.html")

@blueprint.route("/about")
def about():
    return render_template("about_me.html")

@blueprint.route('/create_user', methods=['GET', 'POST'])
def create_user():
    login_form = LoginForm(request.form)
    create_account_form = CreateAccountForm(request.form)
    if 'register' in request.form:

        username  = request.form['username']
        email     = request.form['email'   ]

        user = User.query.filter_by(username=username).first()
        if user:
            flash('Username already registered', 'danger' )
            return render_template( 'login/register.html', msg='Username already registered', form=create_account_form)

        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already registered', 'danger' )
            return render_template( 'login/register.html', msg='Email already registered', form=create_account_form)

        # else we can create the user
        user = User(**request.form)
        db.session.add(user)
        db.session.commit()

        flash('User created please login', 'success' )
        return render_template( 'login/login.html', form=create_account_form)

    else:
        return render_template( 'login/register.html', form=create_account_form)

@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    login_form = LoginForm(request.form)
    if 'login' in request.form:
        
        # read form data
        username = request.form['username']
        password = request.form['password']

        # Locate user
        user = User.query.filter_by(username=username).first()
        
        # Check the password
        if user and verify_pass( password, user.password):

            login_user(user)
            return redirect(url_for('base_blueprint.login')) # route_default

        # Something (user or pass) is not ok
        return render_template( 'login/login.html', msg='Wrong user or password', form=login_form)

    if not current_user.is_authenticated:
        return render_template( 'login/login.html',
                                form=login_form)
    return redirect(url_for('base_blueprint.platform_us'))

@blueprint.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('base_blueprint.login'))

@blueprint.route("/projects")
def projects():
    return render_template("projects.html")

@blueprint.route("/contact")
def contact():
    return render_template("contact.html")

@blueprint.route('/hk',methods = ['GET'])
def platform():
    MAPBOX_ACCESS_KEY = app.config["MAPBOX_ACCESS_KEY"]
    return render_template(
        'platform_hk.html', 
        ACCESS_KEY=MAPBOX_ACCESS_KEY
    )
@blueprint.route('/nyc',methods = ['GET'])
def platform_us():
    MAPBOX_ACCESS_KEY = app.config["MAPBOX_ACCESS_KEY"]
    return render_template(
        'platform_us.html', 
        ACCESS_KEY=MAPBOX_ACCESS_KEY
    )