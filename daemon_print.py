import qrcode
from PIL import Image, ImageDraw, ImageFont
import os
import platform

RESTAURANT_NAME = "MIA CAFE"
TABLE_NUMBER = "01"
ITEMS = [
    ("2x Gambas Pil Pil", "15.00"),
    ("1x Coca Cola", "2.50"),
    ("1x Pan", "1.50")
]
TOTAL_AMOUNT = "19.00"

VERCEL_URL = "https://pay-at-table-two.vercel.app"
checkout_url = f"{VERCEL_URL}/?mesa={TABLE_NUMBER}&total={TOTAL_AMOUNT}"

print(f"Generando ticket de DEMO para {RESTAURANT_NAME}...")

qr = qrcode.QRCode(version=1, box_size=10, border=2)
qr.add_data(checkout_url)
qr.make(fit=True)
qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGB")

qr_width, qr_height = qr_img.size
padding = 20
header_height = 200

total_width = qr_width + (padding * 2)
total_height = qr_height + header_height + (padding * 2)

canvas = Image.new("RGB", (total_width, total_height), "white")
draw = ImageDraw.Draw(canvas)

try:
    font_bold = ImageFont.truetype("arialbd.ttf", 16)
    font_regular = ImageFont.truetype("arial.ttf", 14)
    font_small = ImageFont.truetype("arial.ttf", 12)
except IOError:
    font_bold = font_regular = font_small = ImageFont.load_default()

text_rest = RESTAURANT_NAME
bbox = draw.textbbox((0, 0), text_rest, font=font_bold)
draw.text(((total_width - (bbox[2] - bbox[0])) / 2, padding), text_rest, fill="black", font=font_bold)

text_info = f"Mesa: {TABLE_NUMBER}  |  Camarero: Demo"
bbox = draw.textbbox((0, 0), text_info, font=font_regular)
draw.text(((total_width - (bbox[2] - bbox[0])) / 2, padding + 25), text_info, fill="black", font=font_regular)

draw.text((padding, padding + 48), "-" * 42, fill="gray", font=font_small)

y_offset = padding + 65
for desc, price in ITEMS:
    draw.text((padding, y_offset), desc, fill="black", font=font_regular)
    price_text = f"{price} EUR"
    bbox_p = draw.textbbox((0, 0), price_text, font=font_regular)
    w_p = bbox_p[2] - bbox_p[0]
    draw.text((total_width - padding - w_p, y_offset), price_text, fill="black", font=font_regular)
    y_offset += 20

draw.text((padding, y_offset + 5), "-" * 42, fill="gray", font=font_small)

text_total = f"TOTAL: {TOTAL_AMOUNT} EUR"
bbox_t = draw.textbbox((0, 0), text_total, font=font_bold)
w_t = bbox_t[2] - bbox_t[0]
draw.text((total_width - padding - w_t, y_offset + 22), text_total, fill="black", font=font_bold)

text_callout = "PLEASE PAY BY SCANNING THE QR"
bbox_c = draw.textbbox((0, 0), text_callout, font=font_bold)
w_c = bbox_c[2] - bbox_c[0]
draw.text(((total_width - w_c) / 2, y_offset + 55), text_callout, fill="black", font=font_bold)

canvas.paste(qr_img, (padding, padding + header_height))

file_name = "ticket_demo_miacafe.png"
canvas.save(file_name)
print(f"[OK] Ticket generado como '{file_name}'.")

if platform.system() == "Windows":
    os.startfile(file_name)
elif platform.system() == "Darwin":
    os.system(f"open {file_name}")
else:
    os.system(f"xdg-open {file_name}")