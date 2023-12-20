echo "Kill PM2 runnconnect process"
sudo pm2 delete runconnect

echo "Jump to app folder"
cd /home/ubuntu/apps/online-runner-back

echo "Update app from Git"
git pull origin master

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Build your app"
sudo npm run build

echo "Run new PM2 action"
sudo pm2 start dist/main.js --name runconnect
