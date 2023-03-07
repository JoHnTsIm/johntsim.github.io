from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return "A random message"

app.run(host="johntsim.github.io")