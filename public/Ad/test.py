from PIL import Image
import os

# The directory containing the images
directory = './bookstore/public/Ad/'

# The size to which to resize the images
size = (4000, 2000)

# Iterate over all files in the directory
for filename in os.listdir(directory):
    # Check if the file is an image
    if filename.endswith('.jpg') or filename.endswith('.png'):
        # Open the image file
        img = Image.open(os.path.join(directory, filename))
        # Resize the image
        img = img.resize(size,Image.LANCZOS)
        # Save the resized image back to the file
        img.save(os.path.join(directory, filename))
        print(f'Resized {filename}')