from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import re
import pandas as pd
from io import BytesIO

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# -----------------------------
# HOME
# -----------------------------
@app.route("/")
def home():
    return "MU Result Parser API is running"

# -----------------------------
# PARSE PDF
# -----------------------------
@app.route("/parse", methods=["POST"])
def parse_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    students = []
    current_student = None

    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue

            lines = [l.strip() for l in text.split("\n") if l.strip()]

            for line in lines:
                # ---------- STUDENT HEADER ----------
                header = re.match(
                    r"^(\d{9})\s+([A-Z\s]+)\s+Regular\s+(MALE|FEMALE)\s+\((MU\d+)\)",
                    line
                )

                if header:
                    current_student = {
                        "student": {
                            "seat_no": header.group(1),
                            "name": header.group(2).strip(),
                            "status": "Regular",
                            "gender": header.group(3),
                            "ern": header.group(4)
                        },
                        "subjects": [],
                        "semester_summary": {}
                    }
                    students.append(current_student)
                    continue

                # ---------- SUBJECT ROW ----------
                if current_student:
                    subject = re.match(
                        r"^(\d{7})\s+(MAJOR|MINOR|OE|SEC|AECC|VEC|CO-CURRICULAR)\s+(.+?)\s+TH\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+\.\d+)\s+([A+OBCDF]+)\s+(\d+\.\d+)\s+([PF])",
                        line
                    )

                    if subject:
                        current_student["subjects"].append({
                            "course_code": subject.group(1),
                            "vertical": subject.group(2),
                            "course_name": subject.group(3).strip(),
                            "marks": {
                                "cia": {
                                    "max": int(subject.group(4)),
                                    "min": int(subject.group(5)),
                                    "obtained": int(subject.group(6))
                                },
                                "see": {
                                    "max": int(subject.group(7)),
                                    "min": int(subject.group(8)),
                                    "obtained": int(subject.group(9))
                                },
                                "total": {
                                    "max": int(subject.group(10)),
                                    "obtained": int(subject.group(11))
                                }
                            },
                            "credits": float(subject.group(12)),
                            "grade": subject.group(13),
                            "credit_points": float(subject.group(14)),
                            "remark": subject.group(15)
                        })

                # ---------- SEMESTER SUMMARY ----------
                if current_student:
                    summary = re.search(
                        r"Credits\s*:\s*(\d+\.\d+).*EGP\s*:\s*(\d+\.\d+).*Percentage\s*:\s*(\d+\.\d+).*GRADE\s*:\s*([A+OBCDF]+).*SGPA\s*:\s*(\d+\.\d+)",
                        line
                    )
                    if summary:
                        current_student["semester_summary"] = {
                            "credits": float(summary.group(1)),
                            "egp": float(summary.group(2)),
                            "percentage": float(summary.group(3)),
                            "grade": summary.group(4),
                            "sgpa": float(summary.group(5)),
                            "result": "PASS"
                        }

    return jsonify({
        "status": "success",
        "total_students": len(students),
        "students": students
    })

# -----------------------------
# EXPORT EXCEL
# -----------------------------
@app.route("/export-excel", methods=["POST"])
def export_excel():
    data = request.json["students"]

    rows = []
    for s in data:
        for sub in s["subjects"]:
            rows.append({
                "Seat No": s["student"]["seat_no"],
                "Name": s["student"]["name"],
                "Course": sub["course_name"],
                "Credits": sub["credits"],
                "Grade": sub["grade"],
                "Credit Points": sub["credit_points"]
            })

    df = pd.DataFrame(rows)
    output = BytesIO()
    df.to_excel(output, index=False)
    output.seek(0)

    return output.read(), 200, {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=results.xlsx"
    }
