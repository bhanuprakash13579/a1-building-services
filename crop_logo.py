from PIL import Image
import os

source_path = '/home/bhanu/.gemini/antigravity/brain/142fc64c-2780-4258-a80e-c206d50d8ce6/uploaded_image_1768641860984.png'
dest_path = '/home/bhanu/Desktop/a1-building-services/public/logo_no_text.png'

try:
    img = Image.open(source_path)
    width, height = img.size
    print(f"Original Dimensions: {width}x{height}")
    
    # The logo icon is likely in the center-top. The text is at the bottom.
    # We'll crop to keep the top 70% of the image, which should exclude the text.
    # We also want to make it roughly square if possible for the round logo look.
    
    # Let's crop the bottom 25% off first.
    crop_height = int(height * 0.75)
    
    # Crop box: (left, top, right, bottom)
    img_cropped = img.crop((0, 0, width, crop_height))
    
    # Now let's try to verify if we can make it centered/square-ish around the icon.
    # Assuming the icon is centered.
    # We'll just save this top-cropped version first, it's safer than guessing a square crop.
    
    img_cropped.save(dest_path)
    print(f"Successfully saved cropped image to {dest_path}")
    print(f"New Dimensions: {width}x{crop_height}")

except Exception as e:
    print(f"Error processing image: {e}")
