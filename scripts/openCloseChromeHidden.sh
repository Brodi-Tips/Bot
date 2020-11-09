## Init Loop
echo "Init Loop!"

while :; do
    echo "Opening Chrome!"
    xvfb-run --server-args='-screen 0, 1024x768x16' google-chrome --no-sandbox --new-window --start-maximized 'https://www.bet365.com/#/AS/B83/' >/dev/null &
    sleep 30
    echo "Closing Chrome!"
    kill -9 $(pgrep -d' ' -f xvfb) &
    sleep 30
done
