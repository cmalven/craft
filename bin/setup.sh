#!/bin/bash

echo "Replacing project slug..."
grep -rl your-project-slug . --exclude-dir={.git,bin,node_modules,vendor} | xargs sed -i '' -e "s/your-project-slug/$1/g"

echo "Replacing project title..."
grep -rl your-project-title . --exclude-dir={.git,bin,node_modules,vendor} | xargs sed -i '' -e "s/your-project-title/$2/g"

echo "Replacing project description..."
grep -rl your-project-description . --exclude-dir={.git,bin,node_modules,vendor} | xargs sed -i '' -e "s/your-project-description/$3/g"

echo "Renaming IDEA config file..."
mv ./.idea/your-project-slug.iml ./.idea/$1.iml

if [ -d ".git" ]; then
  echo "Deleting .git directory..."
  rm -rf .git
fi

if [ -d "node_modules" ]; then
  echo "Deleting node_modules directory..."
  rm -rf node_modules
fi

if [ -d "vendor" ]; then
  echo "Deleting vendor directory..."
  rm -rf vendor
fi

if [ -d "bin" ]; then
  echo "Deleting bin setup scripts..."
  rm -rf bin
fi
