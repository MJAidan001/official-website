import os
import requests
from PIL import Image
from io import BytesIO
import urllib.request
import shutil

# 创建images目录
if not os.path.exists('images'):
    os.makedirs('images')

# 图片URL列表，带尺寸参数
image_urls = {
    'hero-bg.jpg': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&fit=crop&w=1920&h=1080',
    'about-bg.jpg': 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&fit=crop&w=1920&h=1080',
    'products-bg.jpg': 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&fit=crop&w=1920&h=1080',
    'education.jpg': 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&fit=crop&w=600&h=400',
    'healthcare.jpg': 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&fit=crop&w=600&h=400',
    'consulting.jpg': 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&fit=crop&w=600&h=400',
    'ring.jpg': 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&fit=crop&w=600&h=400',
    'band.jpg': 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&fit=crop&w=600&h=400',
    'watch.jpg': 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&fit=crop&w=600&h=400',
    'earphone.jpg': 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&fit=crop&w=600&h=400',
    'necklace.jpg': 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&fit=crop&w=600&h=400',
    'glasses.jpg': 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&fit=crop&w=600&h=400',
    'glove.jpg': 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&fit=crop&w=600&h=400'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# 下载并保存图片
for filename, url in image_urls.items():
    try:
        print(f'Downloading {filename}...')
        response = requests.get(url, headers=headers)
        img = Image.open(BytesIO(response.content))
        img.save(f'images/{filename}', quality=85, optimize=True)
        print(f'Successfully downloaded and processed {filename}')
    except Exception as e:
        print(f'Error processing {filename}: {str(e)}')

# 下载favicon
favicon_url = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/brain.svg'
try:
    print('Downloading favicon...')
    response = requests.get(favicon_url)
    with open('images/favicon.svg', 'wb') as f:
        f.write(response.content)
    print('Successfully downloaded favicon')
except Exception as e:
    print(f'Error downloading favicon: {str(e)}')

print('All images have been downloaded and processed!') 