rem set DEBUG=lounger,cloudant,nano & node isonline.js
rem set DEBUG=lounger,cloudant,nano,lounger-cli
rem set DEBUG=lounger,lounger-cli
set DEBUG=''
node --trace-warnings lounger-cli.js %*