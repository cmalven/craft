#!/bin/bash

echo "Replacing project slug..."
grep -rl your-project-slug . --exclude-dir={.git,bin,node_modules,vendor} | xargs sed -i '' -e "s/your-project-slug/$1/g"

echo "Replacing project title..."
grep -rl your-project-title . --exclude-dir={.git,bin,node_modules,vendor} | xargs sed -i '' -e "s/your-project-title/$2/g"
