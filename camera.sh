#!/bin/bash

PLUGIN="/home/felix/Program/mjpg-streamer/mjpg-streamer-experimental"

mjpg_streamer -i "$PLUGIN/input_uvc.so -f 30" -o "$PLUGIN/output_http.so -p 8086"
