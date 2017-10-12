#! /bin/bash
cd dist
mkdir assets/security
echo "<?php define('BASE_PWD', '$GREOUXLOCATION_FTP_PWD'); ?>" > assets/security/key.php
find * -type f -exec curl -u $FTP_USER:$GREOUXLOCATION_FTP_PWD --ftp-create-dirs -T {} ftp://ftpperso.free.fr/{} \;
cd ..