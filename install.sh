#!/bin/bash
echo "installing support packages for chromium";
sudo apt-get update

sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget -y

echo "installing node"
 
cd ~ && sudo curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

cd ~ &&  sudo bash nodesource_setup.sh  

sudo apt install nodejs -y

sudo apt install build-essential -y

sudo apt install tor -y

echo "ControlPort 9051" >> /etc/tor/torrc

echo "CookieAuthentication 0" >> /etc/tor/torrc

sudo /etc/init.d/tor restart

echo -e 'AUTHENTICATE ""\r\nsignal NEWNYM\r\nQUIT' | nc 127.0.0.1 9051
