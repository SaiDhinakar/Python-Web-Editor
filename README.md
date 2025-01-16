# Python Online Editor

A simple, elegant web-based Python code editor that allows users to write and execute Python code directly in the browser. Built with Flask.

![Python Editor Screenshot](screenshots/image.png)

## Features

- Clean, modern user interface
- Syntax error detection
- Responsive design
- Keyboard shortcuts (Shift + Enter to run code)
- Smooth animations and transitions

## Prerequisites

- Python 3.6 or higher
- Flask

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SaiDhinakar/Python-Web-Editor.git
cd Python-Web-Editor
```

2. Install the required dependencies:
```bash
pip install flask
```

3. Project Structure:
```
Python-Web-Editor/
├── static/
│   ├── css/
│   │   └── index.css
│   └── js/
│       └── index.js
├── templates/
│   └── index.html
├── app.py
└── README.md
```

## Running the Application

1. Start the Flask server:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

## Usage

1. Enter your Python code in the editor
2. Click the "Run Code" button or press Shift + Enter
3. View the output in the result section below

Example code:
```python
# Simple calculation
x = 10
y = 20
print(f"Sum: {x + y}")
```

