# Code Ninjas Kiosk

An improved version of the Code Ninjas Kiosk display.

*Note 7/25/2025 - As Code Ninjas moves further towards the new Impact curriculum, the version of the kiosk that this application was made for is likely going to be retired soon. Therefore, this repository will be archived.*

### Features

- Stem/Free time indicators

- Support for pulling sessions from Sensei Web (Impact)

  - Some ninjas at my center are bugged which is why I needed this

- Automatic reloading of ninjas

  - For when a session length or belt update occurs during the session

- Overall reduced latency

- Added a shortcut to remove all ninjas with 0 minutes

  - Ctrl+X

## How To Use

To use, create a new bookmark, copy the text from [here](bookmarklet/bookmarklet.txt) and paste it into the URL. Then open the kiosk page and click the bookmark, and it will load this version of the kiosk.

This gives you the latest version of the kiosk, but you can alternatively use this snippet as the URL to get an auto-updating version:

```
javascript:(async()%3D%3E%7Bconst%20r%3Dawait%20fetch(%22https%3A%2F%2Fmbg206.github.io%2Fcode-ninjas-kiosk%2Fbookmarklet%2Fbookmarklet.txt%22)%3Bconst%20t%3Dawait%20r.text()%3Beval(decodeURIComponent(t.slice(11)))%3B%7D)()%3B
```

### Sensei Web (Impact)

When you hover your mouse over the top left of the kiosk, a button will appear labeled "Enable Impact sessions". Click this button and when the new Sensei Web tab opens and the My Ninja page *fully* loads, click the same bookmark from above. This new tab will send information to the main kiosk tab, so it needs to remain open for Sensei Web sessions to function correctly.
