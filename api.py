from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from colorthief import ColorThief
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test():
    return 'Test route is working'

@app.route('/generate-prompt', methods=['POST'])
def generate_prompt():
    if 'image' in request.files:
        image = request.files['image']
        filename = secure_filename(image.filename)
        file_path = os.path.join('C:/Users/Public', filename)

        # Replace backslashes with forward slashes
        file_path = file_path.replace("\\", "/")

        # print file path for debugging
        print("File Path:", file_path)

        # check if directory exists
        directory = os.path.dirname(file_path)
        if not os.path.exists(directory):
            print(f"Directory {directory} does not exist")
        else:
            image.save(file_path)
        
            color_thief = ColorThief(file_path)
            palette = color_thief.get_palette(color_count=6)
            dominant_color = color_thief.get_color(quality=1)


            print("Color palette:", palette)
            print("dominant_color:", dominant_color)


            # Inserting the image into the web page
            try:
                # Remove the iframe that is covering the input element
                js_remove_iframe = '''
                var iframe = document.querySelector('.image-container iframe');
                if (iframe) {
                    iframe.remove();
                }
                '''
                driver.execute_script(js_remove_iframe)
                print("Iframe removed.")

                # find the input element
                element = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'input.svelte-116rqfv'))
                )

                print("Found element after waiting:", element)
                print("Element attributes:", element.get_attribute('outerHTML'))

                # create a file object in JavaScript
                js = f'''
                var input = document.querySelector('input.svelte-116rqfv');
                console.log('Input element:', input);
                
                var file = new File([""], "{file_path}");
                console.log('File created:', file);
                
                var dt = new DataTransfer();
                dt.items.add(file);
                console.log('DataTransfer object:', dt);
                
                input.files = dt.files;
                console.log('Files added to input:', input.files);
                
                // Trigger change event
                var event = new Event('change', {{ bubbles: true }});
                input.dispatchEvent(event);
                console.log('Event dispatched.');
                '''
                driver.execute_script(js)

                print("JavaScript executed.")

            except Exception as e:
                print(f"Error inserting the image: {e}")




    else:
        return 'No image uploaded.', 400

    return jsonify(result={'dominant_color': dominant_color, 'palette': palette})

@app.route('/api/color-info', methods=['POST'])
def color_info():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    # we create a BytesIO object so we can handle the file data in memory
    temp = BytesIO()
    file.save(temp)
    temp.seek(0)  # seek to the beginning of file

    color_thief = ColorThief(temp)
    
    dominant_color = color_thief.get_color(quality=1)
    palette = color_thief.get_palette(color_count=6)

    print("Color palette:", palette)
    print("dominant_color:", dominant_color)

    return jsonify({'dominant_color': dominant_color, 'palette': palette})

@app.route('/draw', methods=['POST'])
def draw():
    data = request.json['data']
    actions = ActionChains(driver)

    for action in data:
        x, y, event = action
        if event == 'mousedown':
            actions.move_to_element_with_offset(driver.find_element_by_tag_name('body'), x, y).click_and_hold()
        elif event == 'mousemove':
            actions.move_to_element_with_offset(driver.find_element_by_tag_name('body'), x, y)
        elif event == 'mouseup':
            actions.release()

    actions.perform()

    return {'message': 'Success'}, 200

@app.route('/api/test', methods=['GET'])
def api_test():
    return jsonify({'message': 'Test route is working'})

@app.route('/api/color', methods=['POST'])
def api_color():
    return jsonify({'dominant_color': (255, 255, 255), 'palette': [(255, 255, 255)]})

@app.route('/api/inpaint', methods=['POST'])
def api_inpaint():
    return jsonify({'inpaint_image': 'image_link'})

if __name__ == '__main__':
    driver = webdriver.Firefox()  # or Chrome(), depending on your preferences
    driver.get('http://127.0.0.1:7860/')
    app.run(port=5000)
