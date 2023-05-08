from flask import Flask, render_template, request, jsonify

from chat import get_response



app = Flask(__name__) #  template_folder='templates'

@app.route("/")
def index():
    return render_template('templates\index.html')

@app.get("/")
def index_get():
    return render_template("templates\index.html")

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    # TODO check if text is valid
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
