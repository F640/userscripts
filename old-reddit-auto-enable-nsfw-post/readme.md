# What does this script do?

This scipt allows anyone without Reddit account to see NSFW posts by default at Old Reddit. This script does:

- Automatically click yes button in over 18 confirmation page
- Sets over 18 cookie to `1` (yes) if it has any value other than `1` including empty/null

## Additional notes:

There are 2 ways to set over 18 cookies:

- Directly set over 18 cookie using javascript (default)
- Creating over 18 confirmation request via userscript

These can be toggle either by using script menu or modify directly via script configuration by changing value in `set_cookie_mode` to either `direct` (1st point above) or `xhr` (2nd point above).

I also personally recommend these extension as some addional nice stuffs:

- [Old Reddit Redirect](https://github.com/tom-james-watson/old-reddit-redirect) extension ([Chrome](https://chrome.google.com/webstore/detail/dneaehbmnbhcippjikoajpoabadpodje) and [Firefox](https://addons.mozilla.org/firefox/addon/old-reddit-redirect)) to ensure Old Reddit always used. Do note you may be unable to use some features like new awards and some Reddit-specific embeds
- [Reddit Enhancement Suite](https://redditenhancementsuite.com/) extension ([Chrome](https://chrome.google.com/webstore/detail/kbmfpngjjgdllneeigpgjifpgocmfgmb) and [Firefox](https://addons.mozilla.org/firefox/addon/reddit-enhancement-suite/)) for additional features in Old Reddit

New Reddit design does not work with this userscript as that version disregards that cookie. So you will need other userscript for that purpose like [this one](https://greasyfork.org/en/scripts/491441).
