from flask import Flask, request, jsonify, render_template
import sys
from io import StringIO
import contextlib
import traceback

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024  # 16KB max-limit

restricted_modules = [
    'import os', 'import shutil', 'import psutil', 'import sys'
]

restricted_keyword = [
    'exec'
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/execute', methods=['POST'])
def execute_code():
    try:
        data = request.get_json()
        if not data or 'code' not in data:
            return jsonify({
                'success': False,
                'error': 'No code provided'
            }), 400
            
        code = data['code']
        
        flag = True

        for module in restricted_modules:
            if module in code:
                flag = False
                break
        
        for keyword in restricted_keyword:
            if keyword in code:
                flag = False
                break
        
        if ';' in code:
            return jsonify({
                    'success': False,
                    'error': 'Semicolon-separated statements are not allowed'
                })

        if flag == False:
            return jsonify({
                'success': False,
                'error': 'Restricted module or keyword detected'
            })
        
        # Create string buffer to capture output
        output_buffer = StringIO()
        
        # Capture both stdout and stderr
        with contextlib.redirect_stdout(output_buffer), \
             contextlib.redirect_stderr(output_buffer):
            try:
                # Execute the code in a restricted environment
                exec(code, {'__builtins__': __builtins__}, {})
                output = output_buffer.getvalue()
                return jsonify({
                    'success': True,
                    'output': output or 'Code executed successfully with no output'
                })
            except Exception as e:
                # Get the full traceback
                error_msg = traceback.format_exc()
                return jsonify({
                    'success': False,
                    'error': error_msg
                }), 400
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)

