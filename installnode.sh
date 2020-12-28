cd /
mkdir install
cd ./install
curl https://nodejs.org/dist/v10.16.1/node-v10.16.1-linux-x64.tar.xz --output node.tar.xz
tar -xf node.tar.xz
rm node.tar.xz
cd /usr/local/bin
ln -s /install/node-v10.16.1-linux-x64/bin/node node
ln -s /install/node-v10.16.1-linux-x64/bin/npm npm
ln -s /install/node-v10.16.1-linux-x64/bin/npx npx
npm install pm2
ln -s  /install/node-v10.16.1-linux-x64/bin/pm2 pm2
