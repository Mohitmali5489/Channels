from flask import Flask, request, jsonify
import pdfplumber

app = Flask(__name__)

# -------------------------------
# HOME ROUTE (VERY IMPORTANT)
# -------------------------------
@app.route("/")
def home():
    return "MU Result Parser API is running"

# -------------------------------
# PARSE ROUTE
# -------------------------------
@app.route("/parse", methods=["POST"])
def parse_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    results = []

    with pdfplumber.open(file) as pdf:
        for page_no, page in enumerate(pdf.pages, start=1):
            text = page.extract_text()
            if not text:
                continue

            results.append({
                "page": page_no,
                "text_preview": text[:300]
            })

    return jsonify({
        "status": "success",
        "pages_parsed": len(results),
        "data": results
    })

# -------------------------------
# REQUIRED FOR RENDER
# -------------------------------
if __name__ == "__main__":
    app.run()
