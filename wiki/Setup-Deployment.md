# Setup and Deployment

Run a static server from the repository root:

```sh
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/index.html. Preserve the exact case of page and image filenames.

The live site is hosted on Vercel. Deploy the root static files with `index.html` as the entry. Check the current project configuration before changing domains or deployment settings.
