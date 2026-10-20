# Polyester Block
The ad blockers to end all ad blockers. A Chrome extension works likes a regular ad blocker, disabling any element that 
it identifies as an ad, but also replaces them with Polyester edits. What is a polyester edit?
They are videos to which are ~~Hilariously over the top~~ The coolest video you have ever seen, hip with the times!
Here is the [most famous example](https://www.youtube.com/watch?v=zswT92VzOYM)! Made with `JavaScript`, `HTML/CSS`, and `Manifest v3`

# The General Blocking
When `Polyester Block` is on, with a `MutationObserver`, continuously checks through newly generated `HTML` elements that either include IDs or class names that match with `AD_SELECTORS`. 

If it matches, it will find the element's parent, and to the parent, adds a new video HTML element that is randomly selected from the `VIDEO_LIST`, which are all polyester edit videos. These videos have auto-play enabled, although to stay in line with Chrome Extensions, and just of of general good-will, the audio of these video are disabled.

After the new video has has been added, the original ad will have the `!important` flag enabled, disallowing the ad from visually appearing and leaving only the newly added video.

# General Overview of Domain Lists
On top of the general blocking, specific websites can be added and removed to the following:
- **White List**: Polyester Block does nothing on websites on it
- **Black List**: Polyester Block completely replaces the websites with one giant Polyester edit.

In both cases, they can be added or removed on the user on the main extension page, and are stored using `chrome.storage.local`

# Whitelisting

When a new `HTML` element is detected, before checking for IDs and class, it checks through every element in a whitelist and compared it to the website's domain name. 

If it fully matches or the whitelisted element or it is a sub-string (Ex: whitelisting `youtube.com` would also also whitelist `youtube.com/watch?v=<video_id>`), the `whitelist` flag is set to `true`, and the actual blocking algorithm does not run.

# Blacklisting

It goes through a similar process as whitelisting to identify if the website you are on is blacklisted. If it is, is recursively goes through all the children of the `body` element and gives them all the `!important` flag. For clarification, this does not include the `body` element itself.

After this process is done, a single `video` element will be added that includes one of the polyester edits from `VIDEO_LIST`, that is the full size of `body`.

# Credits
- **Santiago Sanhueza** - Back-end Development
- **Johaan Riat** - Front-end Development
