**⚠️ This project is not completed yet, and will have bugs! DO NOT use this in production.**
# stellepet ![IMG](https://hackatime-badge.hackclub.com/U08RJ1PEM7X/stellepet)
A small, fun clicker game where you give Stelle ([@purestellenium](https://github.com/purestellenium)) headpats! \
This was made for Hack Club [onekey](https://onekey.hackclub.com).

<a href="https://notbyai.fyi" target="_blank">
  <img src="public/not-by-ai.svg" alt="Developed by a human, not by AI!">
</a>

## How to Play
Open [stelle.transfem.xyz](https://stelle.transfem.xyz) in your web browser on a computer! \
From there, the game loop is this:
- Press space to give Stelle a headpat, gaining `+1 Pat` on the counter!
- After earning enough Pats, go to the shop (hold space to open the menu) and buy an Automatic Petter!
  - This will give you `+1 Pat` for each you have every five seconds! If you have four, you get `+4 Pats` every five seconds
- Keep giving Stelle headpats to earn more Pats and buy more upgrades!
## Shop Items
Items can only be purchased once unless otherwise noted!
- Automatic Petter: Gain `+1 Pat` every five seconds. Price starts at 200 Pats, then goes up by 150 Pats for each you have purchased.
  - You can purchase multiple Automatic Petters!
- Cat Ears: Give Stelle cat ears, giving a 25% chance for a pat to double (giving +2 Pats instead of just +1). Only works on non-automatic pats. Price is 1500 Pats.
  - This also increases the chance of a pat causing a meow from 10% to 15%!
- Skirt: Increase the speed of Automatic Petters to `+1 Pat` every three seconds (instead of five).
## Settings
You can use the settings menu to change things :3
- Mute SFX: Prevent sound effects from being played.
- Change Key: Change the keyboard key that the game uses (it defaults to space)!
- Export: Export your Pats and upgrades to a JSON file, you can then import it later.
- Import: Import a previously exported save! This **overwrites** your existing data.
- Reset: Reset your Pats, upgrades, and settings, putting you back at zero! This **CANNOT** be reversed unless you exported previously.
## Fun things
- There's a 10% chance on each human pat (not automated petter) for Stelle to meow! Stelle sent me this audio clip :3
  - The chance goes up to 15% if you have purchased cat ears in the shop!
- There's a counter that tracks your all time pats, so you can still show that off after spending a lot in the shop!
## Self-hosting
I heavily suggest using Docker to self-host stellepet, it's just the simplest method!
### With Docker Compose
Copy the following Compose file to your server or computer, naming it `compose.yml`:
```yaml
services:
  stellepet:
    image: ghcr.io/aelithron/stellepet:latest
    container_name: stellepet
    ports:
      - "3000:3000"
    restart: unless-stopped
```
Then, simply run `docker compose up -d` in the directory of the file!
### With `docker run`
Run the following command on your server or computer:
```bash
docker run -d \
  --name stellepet \
  -p 3000:3000 \
  --restart unless-stopped \
  ghcr.io/aelithron/stellepet:latest
```