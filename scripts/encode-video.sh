#!/bin/bash
# Uso: scripts/encode-video.sh <entrada.mp4> <public/work/slug> <nome> <tempo-do-poster> <inicio-da-previa>
# Gera <nome>.mp4 (com áudio), <nome>-preview.mp4 (6 s, sem áudio) e <nome>-poster.webp.
# Requer ffmpeg e python3 com Pillow.
set -e
in="$1"; out="$2"; name="$3"; pt="$4"; ps="$5"
mkdir -p "$out"
w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$in")
h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$in")
if [ "$w" -gt "$h" ]; then sc="scale=1280:-2"; sp="scale=854:-2"; else sc="scale=720:-2"; sp="scale=480:-2"; fi
ffmpeg -v error -y -i "$in" -vf "$sc,fps=30" -c:v libx264 -preset slow -crf 25 -profile:v high -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 112k -ac 2 "$out/$name.mp4"
ffmpeg -v error -y -ss "$ps" -t 6 -i "$in" -vf "$sp,fps=24" -an -c:v libx264 -preset slow -crf 29 -profile:v high -pix_fmt yuv420p -movflags +faststart "$out/$name-preview.mp4"
ffmpeg -v error -y -ss "$pt" -i "$in" -frames:v 1 -vf "$sc" -q:v 2 /tmp/poster_$name.png
python3 -c "from PIL import Image;Image.open('/tmp/poster_$name.png').convert('RGB').save('$out/$name-poster.webp','WEBP',quality=82)"
echo "$name $(du -h $out/$name.mp4|cut -f1) preview $(du -h $out/$name-preview.mp4|cut -f1)"
