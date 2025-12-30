from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import re

app = Flask(__name__)

# 🔥 ENABLE CORS (THIS FIXES YOUR ISSUE)
CORS(app)

# -------------------------------------------------
# HOME ROUTE
# -------------------------------------------------
@app.route("/")
def home():
    return "MU Result Parser API is running"

# -------------------------------------------------
# PARSE ROUTE
# -------------------------------------------------
@app.route("/parse", methods=["POST"])
def parse_pdf():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        students = []

        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if not text:
                    continue

                lines = [l.strip() for l in text.split("\n") if l.strip()]

                for line in lines:
                    m = re.match(
                        r"^(\d{9})\s+([A-Z\s]+)\s+Regular\s+(MALE|FEMALE)\s+\((MU\d+)\)",
                        line
                    )
                    if not m:
                        continue

                    students.append({
                        "student": {
                            "seat_no": m.group(1),
                            "name": m.group(2).strip(),
                            "status": "Regular",
                            "gender": m.group(3),
                            "ern": m.group(4),
                            "college": {
                                "code": "MU-1122",
                                "name": "Kalyan Citizens Education Society's B K Birla Night Arts Science and Commerce College"
                            }
                        },
                        "subjects": [],
                        "semester_summary": {}
                    })

        return jsonify({
            "status": "success",
            "total_students": len(students),
            "data": students
        })

    except Exception as e:
        # 🔥 PREVENTS 500 CRASH
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# -------------------------------------------------
# REQUIRED FOR LOCAL / RENDER
# -------------------------------------------------
if __name__ == "__main__":
    app.run()
