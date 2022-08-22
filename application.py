#!/usr/bin/env python
import json
import random
import time
from datetime import datetime

from flask import Flask, Response, render_template

application = Flask(__name__, static_url_path='/static')
random.seed()


@application.route('/')
def index():
    return render_template('index.html')

@application.route('/ciencias')
def ciencias():
    return render_template('ciencias.html')

@application.route('/data_sensor1')
def data_sensor1():
    def generate_random_data():
        while True:
            json_data = json.dumps(
                {'time': datetime.now().strftime('%M:%S'), 'value': random.random() * 10})
            yield f"data:{json_data}\n\n"
            time.sleep(1)

    return Response(generate_random_data(), mimetype='text/event-stream')

@application.route('/data_sensor2')
def data_sensor2():
    def generate_random_data():
        while True:
            json_data = json.dumps(
                {'time': datetime.now().strftime('%M:%S'), 'value': random.random() * 10})
            yield f"data:{json_data}\n\n"
            time.sleep(1)

    return Response(generate_random_data(), mimetype='text/event-stream')

@application.route('/data_sensor3')
def data_sensor3():
    def generate_random_data():
        while True:
            json_data = json.dumps(
                {'time': datetime.now().strftime('%M:%S'), 'value': random.random() * 10})
            yield f"data:{json_data}\n\n"
            time.sleep(1)

    return Response(generate_random_data(), mimetype='text/event-stream')

@application.route('/data_bateria')
def data_bateria():
    def generate_random_data():
        while True:
            json_data = json.dumps(
                {'time': datetime.now().strftime('%M:%S'), 'value': random.random() * 6})
            yield f"data:{json_data}\n\n"
            time.sleep(30)

    return Response(generate_random_data(), mimetype='text/event-stream')

application.run(debug=True, threaded=True, host='0.0.0.0')