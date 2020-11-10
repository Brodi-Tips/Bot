## Init Loop
while :; do
    echo "Opening Chrome!"
    google-chrome-stable --no-sandbox  --new-window --start-minimized 'https://www.bet365.com/#/AS/B83/' &
    sleep 30
    echo "Closing Chrome!"
    kill -9 $(pgrep -d' ' -f chrome) &
    sleep 30
done
