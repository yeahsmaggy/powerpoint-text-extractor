#!/bin/bash
FILES=/Users/User1/Projects/powerpointtextextractor/powerpoint_files/*
for f in $FILES
do
  echo "Processing $f file..."
  # take action on each file. $f store current file name
  /Users/User1/.npm-global/bin/pptx2pdf $f --png -o converted/
done