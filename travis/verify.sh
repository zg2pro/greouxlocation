#! /bin/bash
npm install -g protractor
webdriver-manager update
webdriver-manager start &
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
sleep 5
npm run deploy:check
