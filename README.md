# Taha Rezzag — Portfolio Website

A personal academic portfolio for a propulsion researcher at UCF specializing in rotating detonation engines.

## Structure

```
portfolio/
├── index.html        ← Main portfolio (About, Research, Publications, Contact)
├── blog.html         ← Blog with expandable posts
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Hosting on GitHub Pages

1. Create a new GitHub repository named `your-username.github.io` (for a personal site) OR any name (for a project site).

2. Push all files in this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. In your repo on GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root) → Save**

4. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/` within a few minutes.

---

## Customization Checklist

### index.html
- [ ] Update `your.email@ucf.edu` with your real email
- [ ] Update Google Scholar link
- [ ] Update LinkedIn link
- [ ] Update GitHub link
- [ ] Add real publications in the `pub-list` section
- [ ] Add your UCF lab/advisor details if desired

### blog.html
- [ ] Add new posts by duplicating an `<article class="post-card">` block
- [ ] Update dates and tags
- [ ] Assign a unique `id` to each article for direct linking

### Fonts
The site uses Google Fonts (Cormorant Garamond + JetBrains Mono). These load from the CDN and work fine on GitHub Pages as long as there's an internet connection.

---

## Adding a New Blog Post

1. Open `blog.html`
2. Find the `<!-- ADD MORE POSTS PLACEHOLDER -->` comment
3. Copy and paste this template above it:

```html
<article class="post-card" id="post-your-slug">
  <div class="post-card-meta">
    <span class="mono">Month Year</span>
    <span class="tag mono">Category</span>
  </div>
  <h2 class="post-card-title">Your Post Title Here</h2>
  <p class="post-card-excerpt">A one or two sentence summary of the post.</p>
  <div class="post-card-body hidden" id="post-your-slug-body">
    <p>Your full post content goes here...</p>
    <h3>Subheading</h3>
    <p>More content...</p>
  </div>
  <button class="post-expand-btn mono" data-target="post-your-slug-body">→ Read more</button>
</article>
```

4. Also add a preview card in the `blog-teaser-right` section of `index.html` if you want it featured on the home page.
