#! /bin/bash
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
npm install -g protractor
webdriver-manager update
webdriver-manager start &
sleep 20
npm run deploy:check
