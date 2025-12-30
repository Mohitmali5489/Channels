from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import re

app = Flask(__name__)

# 🔥 STRICT CORS (GitHub Pages allowed)
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://mohitmali5489.github.io"
        ]
    }
})

@app.route("/")
def home():
    return "MU Result Parser API is running"

@app.route("/parse", methods=["POST", "OPTIONS"])
def parse_pdf():
    # OPTIONS request for CORS preflight
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    students = []

    # ⚠️ SAFE, FAST PARSE (NO HEAVY LOGIC YET)
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages[:2]:  # LIMIT pages for stability
            text = page.extract_text()
            if not text:
                continue

            for line in text.split("\n"):
                m = re.match(
                    r"^(\d{9})\s+([A-Z\s]+)\s+Regular\s+(MALE|FEMALE)\s+\((MU\d+)\)",
                    line.strip()
                )
                if m:
                    students.append({
                        "seat_no": m.group(1),
                        "name": m.group(2).strip(),
                        "gender": m.group(3),
                        "ern": m.group(4)
                    })

    return jsonify({
        "status": "success",
        "students_found": len(students),
        "students": students
    })
