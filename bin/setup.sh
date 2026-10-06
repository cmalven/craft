#!/bin/bash

# bash ./bin/setup.sh "my-project-slug" "My Project Title" "A brief description of my project"

# Skip binary files (-I) and generated or local-only directories
GREP_OPTS=(-rlI --null --exclude-dir={.git,.claude-ddev,bin,cpresources,db_snapshots,node_modules,storage,vendor})

echo "Replacing project slug..."
grep "${GREP_OPTS[@]}" your-project-slug . | xargs -0 sed -i '' -e "s/your-project-slug/$1/g"

echo "Replacing project title..."
grep "${GREP_OPTS[@]}" your-project-title . | xargs -0 sed -i '' -e "s/your-project-title/$2/g"

echo "Replacing project description..."
grep "${GREP_OPTS[@]}" your-project-description . | xargs -0 sed -i '' -e "s/your-project-description/$3/g"

echo "Replacing port 3111 with random port..."
RANDOM_PORT="3$((RANDOM % 900 + 100))"
grep "${GREP_OPTS[@]}" 3111 . | xargs -0 sed -i '' -e "s/3111/$RANDOM_PORT/g"

echo "Renaming IDEA config file..."
mv ./.idea/your-project-slug.iml ./.idea/$1.iml

echo "Removing name from DDEV config..."
sed -i '' '/^name: /d' .ddev/config.yaml

if [ -f "config/license.key" ]; then
  echo "Deleting Craft license key..."
  rm config/license.key
fi

echo "Removing plugin license keys..."
sed -i '' '/^    licenseKey: /d' config/project/project.yaml

if [ -d "storage/backups" ]; then
  echo "Emptying storage/backups directory..."
  find storage/backups -mindepth 1 -delete
fi

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

