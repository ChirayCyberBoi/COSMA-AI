

from flask import Flask, send_from_directory, request, jsonify

app = Flask(
    __name__,
    static_folder="../frontend",
    static_url_path=""
)

@app.route("/")
def home():
    return send_from_directory("../frontend", "index.html")


@app.route("/test")
def test():
    return "COSMA AI Backend is Working!"


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json

    user_message = data.get("message", "")

    reply = "Hello! I received your message: " + user_message

    return jsonify({
        "reply": reply
    })


if __name__ == "__main__":
    app.run(debug=True)
