#!/bin/bash

# Check if two arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <path_to_fonts> <xml_output_path>"
    exit 1
fi


# Get the provided paths
font_path="$1"
xml_output_path="$2"


# Create the output directory if it doesn't exist
mkdir -p "$xml_output_path"

# Check if the font path exists
if [ ! -d "$font_path" ]; then
    echo "Error: The specified font path does not exist."
    exit 1
fi

# Get the name before underscore of the first font in the folder
first_font_file=$(ls "$font_path"/*.ttf | head -n 1)
first_font_name=$(basename "$first_font_file" .ttf | cut -d'_' -f1)

# Define the output XML file name based on the first font name before underscore in the folder
output_file="$xml_output_path/$first_font_name.xml"

# Create or overwrite the XML file
echo '<?xml version="1.0" encoding="utf-8"?>' > "$output_file"
echo '<font-family xmlns:app="http://schemas.android.com/apk/res-auto">' >> "$output_file"

# Loop through all .ttf files in the font directory
for font_file in "$font_path"/*.ttf; do
    # Extract font name without extension
    font_name=$(basename "$font_file" .ttf)

    # Use the name before the underscore as the file name
    file_name=$(echo "$font_name" | cut -d'_' -f1)

    # Determine font style based on the presence of "italic" in the font name
    if [[ "$font_name" == *italic* ]]; then
        style="italic"
    else
        style="normal"
    fi

    # Extract font weight from the font name
    weight=""
    
    case "$font_name" in
        *thin*) weight="100" ;;
        *extralight*) weight="200" ;;
        *light*) weight="300" ;;
        *regular*) weight="400" ;;
        *medium*) weight="500" ;;
        *semibold*) weight="600" ;;
        *bold*) weight="700" ;;
        *extrabold*) weight="800" ;;
        *black*) weight="900" ;;
        *)
            echo "Warning: Font weight not recognized for $font_name. Using default weight (400)."
            weight="400"
            ;;
    esac

    # Generate XML for each font
    echo "    <font" \
        " app:fontStyle=\"$style\"" \
        " app:fontWeight=\"$weight\"" \
        " app:font=\"@font/$font_name\" />" >> "$output_file"
done

# Close the font-family tag in the XML file
echo '</font-family>' >> "$output_file"

echo "XML file generated: $output_file"
