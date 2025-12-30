from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import re

app = Flask(__name__)

# ✅ HARD CORS FIX (ALLOW EVERYTHING FOR NOW)
CORS(app)

@app.route("/")
def home():
    return "MU Result Parser API is running"

@app.route("/parse", methods=["POST"])
def parse_pdf():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        students = []
        current_student = None

        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:   # ✅ ALL pages
                text = page.extract_text()
                if not text:
                    continue

                lines = [l.strip() for l in text.split("\n") if l.strip()]

                for line in lines:
                    # -------- STUDENT HEADER --------
                    header = re.match(
                        r"^(\d{9})\s+([A-Z\s]+)\s+Regular\s+(MALE|FEMALE)\s+\((MU\d+)\)",
                        line
                    )

                    if header:
                        current_student = {
                            "seat_no": header.group(1),
                            "name": header.group(2).strip(),
                            "gender": header.group(3),
                            "ern": header.group(4),
                            "subjects": []
                        }
                        students.append(current_student)
                        continue

                    # -------- SUBJECT (SAFE, SIMPLE) --------
                    if current_student:
                        sub = re.match(r"^(\d{7})\s+(.+)", line)
                        if sub:
                            current_student["subjects"].append({
                                "course_code": sub.group(1),
                                "raw_line": line
                            })

        return jsonify({
            "status": "success",
            "students_found": len(students),
            "students": students
        })

    except Exception as e:
        # ✅ NO MORE 500 CRASHES
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 200
