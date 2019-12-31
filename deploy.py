from flask import Flask, render_template

app = Flask(__name__)
app.config.from_object(__name__)

app.config.from_envvar('APP_CONFIG_FILE', silent=True)
MAPBOX_ACCESS_KEY = app.config['MAPBOX_ACCESS_KEY']

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about_me.html")
    
@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route('/hk')
def platform():
    return render_template(
        'platform_hk.html', 
        ACCESS_KEY=MAPBOX_ACCESS_KEY
    )

@app.route('/nyc')
def platform_us():
    return render_template(
        'platform_us.html', 
        ACCESS_KEY=MAPBOX_ACCESS_KEY
    )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
if __name__ == "__main__":
    app.run(debug=True)