from flask import Flask, request, jsonify
import pdfplumber
import re

app = Flask(__name__)

GRADE_POINTS = {
    "O": 10, "A+": 9, "A": 8, "B+": 7,
    "B": 6, "C": 5, "D": 4, "F": 0
}

@app.route("/parse", methods=["POST"])
def parse_pdf():
    file = request.files["file"]
    results = []

    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()

            for table in tables:
                if not table or "Course Code" not in table[0]:
                    continue

                student = {
                    "student": {},
                    "subjects": [],
                    "semester_summary": {}
                }

                for row in table[1:]:
                    if not row or not row[0]:
                        continue

                    if row[0].isdigit() and len(row[0]) == 9:
                        student["student"]["seat_no"] = row[0]
                        student["student"]["name"] = row[1]
                        student["student"]["status"] = row[2]
                        student["student"]["gender"] = row[3]
                        student["student"]["ern"] = row[4]

                    elif row[0].isdigit() and len(row[0]) == 7:
                        grade = row[11]
                        gp = GRADE_POINTS.get(grade, 0)
                        credits = float(row[10])

                        student["subjects"].append({
                            "course_code": row[0],
                            "course_name": row[2],
                            "marks": {
                                "cia": int(row[5]),
                                "see": int(row[8]),
                                "total": int(row[9])
                            },
                            "credits": credits,
                            "grade": grade,
                            "grade_point": gp,
                            "credit_points": credits * gp,
                            "remark": row[12]
                        })

                results.append(student)

    return jsonify(results)
