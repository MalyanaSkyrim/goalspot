#!/bin/bash

# Check if a path is provided as an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path>"
    exit 1
fi

# Get the provided path
path="$1"

# Check if the path exists
if [ ! -d "$path" ]; then
    echo "Error: The specified path does not exist."
    exit 1
fi

# Move to the specified directory
cd "$path" || exit

# Loop through all files in the current directory
for file in *; do
    # Replace "-" with "_"
    new_name=$(echo "$file" | sed 's/-/_/g')

    # Convert uppercase letters to lowercase
    new_name=$(echo "$new_name" | tr '[:upper:]' '[:lower:]')

    # Rename the file if the name has changed
    if [ "$file" != "$new_name" ]; then
        mv "$file" "$new_name"
        echo "Renamed $file to $new_name"
    fi
done
