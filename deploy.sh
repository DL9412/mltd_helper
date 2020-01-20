cd ./mltd_frontend
#rm -rf ./node_modules
#rm -rf ./dist
npm install --unsafe-perm=true --allow-root
npm run build
cd ..
pm2 restart mltd
