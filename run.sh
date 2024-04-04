#!/usr/bin/env bash

while true
do
    if node stardomCal.js; then
        mv stardom.ics /var/www/iridescentsun.com/wrestlingcalendars/
        echo "$(date +%d/%m/%Y-%H:%M): Build success"
    else
        echo "$(date +%d/%m/%Y-%H:%M): Build failure"
    fi
    sleep 86400
done
