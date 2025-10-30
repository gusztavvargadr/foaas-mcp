# FOAAS MCP Demo Materials# FOAAS MCP Demo Materials



Complete toolkit for demonstrating FOAAS MCP Server capabilities and creating announcements.This directory contains everything needed to demo FOAAS MCP and create announcements.



## 📁 Directory Structure## Files



```### Demo Setup & Testing

docs/demo/- **`demo-setup.sh`** - Automated demo repository creation

├── README.md                    # This file- **`issues.json`** - 20 issue templates (100% tool coverage)

├── data/- **`pull-requests.json`** - 19 PR templates (all scenarios)  

│   ├── issues.json             # 20 issue templates (100% tool coverage)- **`analyze-coverage.sh`** - Verify FOAAS tool coverage

│   ├── labels.json             # Label definitions

│   └── pull-requests.json      # 19 PR templates### Recording

├── scripts/- **`recording-script.sh`** - Terminal demo automation

│   ├── demo-setup.sh           # Automated demo repository creation

│   ├── analyze-coverage.sh     # Verify FOAAS tool coverage---

│   ├── recording-script.sh     # CLI terminal demo automation

│   ├── simple-demo.sh          # Simple single-issue demo## Quick Start: Create Demo Repository

│   ├── linkedin-workflow-demo.sh  # Interactive 5-issue workflow

│   └── generate-demo-gif.sh    # asciinema + agg GIF generator```bash

└── vhs-tapes/# Authenticate with GitHub CLI (first time only)

    ├── linkedin-automated.tape # ⭐ LinkedIn 5-issue demo (recommended)gh auth login

    ├── linkedin-demo.tape      # Compact 5-issue version

    └── foaas-demo.tape         # Simple single-issue demo# Preview what would be created  

```./docs/demo/demo-setup.sh --dry-run



---# Create demo repository (private by default)

./docs/demo/demo-setup.sh

## 🚀 Quick Start: Generate LinkedIn Demo GIF

# Create public demo with custom name

**Recommended for announcements** - Shows 5 issues being processed with contextually-aware FOAAS responses:./docs/demo/demo-setup.sh --name my-foaas-demo --visibility public

```

```bash

# 1. Install VHS (one-time)**Creates:**

brew install vhs  # macOS- Repository with README

# or- 20 sample issues (lazy reports, security vulns, bikeshedding, etc.)

go install github.com/charmbracelet/vhs@latest  # Linux- 19 sample PRs (excellent fixes, vague descriptions, breaking changes, etc.)

- All 23 FOAAS tools covered

# 2. Generate LinkedIn-optimized GIF (1200x675, <5MB)- Proper labels

vhs docs/demo/vhs-tapes/linkedin-automated.tape

### Customizing Demo Data

# 3. Output: linkedin-demo.gif (ready for LinkedIn!)

```Edit JSON files to customize scenarios:



**What it shows:**```bash

1. Lazy bug report → `foaas_logs` → "Read the fucking manual. Check your logs."# Edit templates

2. Excellent bug report → `foaas_legend` → "You're a fucking legend!"vim docs/demo/issues.json

3. Absurd feature request → `foaas_ridiculous` → "That's fucking ridiculous."vim docs/demo/pull-requests.json

4. Bikeshedding → `foaas_shutup` → "Shut the fuck up."

5. No error details → `foaas_look` → "Look at what you're doing."# Verify coverage

./docs/demo/analyze-coverage.sh

**Duration:** ~45 seconds | **Resolution:** 1200x675 (16:9) | **Size:** <3MB```



---**JSON Format (issues.json):**

```json

## 🎬 All Demo Recording Options{

  "title": "Application crashes on startup",

### Option 1: VHS Automated (Best Quality) ⭐  "body": "it doesn't work\n\nhelp",

  "labels": ["bug"],

**A) LinkedIn 5-Issue Workflow** (Recommended for announcements)  "suggested_tool": "foaas_logs or foaas_rtfm",

```bash  "scenario": "Lazy bug report without details"

vhs docs/demo/vhs-tapes/linkedin-automated.tape}

``````

- Shows complete workflow: 5 issues → contextual FOAAS → professional comments

- Duration: ~45 seconds**JSON Format (pull-requests.json):**

- LinkedIn-optimized: 1200x675, <5MB```json

{

**B) Compact Version**  "title": "Fix memory leak in session handler",

```bash  "body": "## Summary\nFixes memory leak...",

vhs docs/demo/vhs-tapes/linkedin-demo.tape  "head": "fix/memory-leak",

```  "suggested_tool": "foaas_legend",

- Same 5 issues, more concise  "scenario": "Excellent PR with tests"

- Duration: ~30 seconds}

```

**C) Simple Single-Issue Demo**

```bash---

vhs docs/demo/vhs-tapes/foaas-demo.tape

```## Tool Coverage Analysis

- One lazy bug report scenario

- Duration: ~15 secondsCheck FOAAS tool coverage:



**Advantages:**```bash

- ✅ Deterministic (same output every time)./docs/demo/analyze-coverage.sh

- ✅ Easy to edit (just text files)```

- ✅ Professional quality

- ✅ No manual recording needed**Current Status: 100% Coverage** (23/23 tools, 39 samples)



### Option 2: Interactive Bash ScriptOutput shows:

- Coverage percentage

Run interactive demo and screen-record manually:- Tools by category (Appreciation, Rejections, Confrontations, Code Quality)

- Sample distribution (issues vs PRs)

```bash- Missing tools (if any)

# Run interactive demo (press key between issues)

./docs/demo/scripts/linkedin-workflow-demo.sh---



# Record with OBS Studio, Peek, or screen recorder## Recording Demo for LinkedIn

```

### 🎯 Quick Start (Recommended)

### Option 3: asciinema + agg

**For LinkedIn announcement, use the automated 5-issue workflow:**

Fully automated recording with different tool:

```bash

```bash# Install VHS

# Install dependencies (one-time)brew install vhs  # macOS

pip install asciinema# or: go install github.com/charmbracelet/vhs@latest  # Linux

cargo install agg

# Generate LinkedIn-optimized GIF (1200x675, <5MB)

# Generatevhs docs/demo/linkedin-automated.tape

./docs/demo/scripts/generate-demo-gif.sh```

```

**Output:** `linkedin-demo.gif` - Shows 5 issues being processed with contextually-aware FOAAS responses.

### Optimize GIF for LinkedIn

See **[LINKEDIN-GIF.md](LINKEDIN-GIF.md)** for detailed LinkedIn posting guide.

```bash

# Install optimizer---

sudo apt install gifsicle  # Linux

brew install gifsicle      # macOS### All Demo Options



# Optimize (LinkedIn < 5MB limit)### Option 1: VHS Tape (Easiest, Best Quality)

gifsicle -O3 --colors 256 input.gif -o output.gif

```Modern tool for generating terminal GIFs from "tape" files:



**LinkedIn specs:****A) LinkedIn 5-Issue Workflow (Recommended for announcement):**

- Max size: 5MB```bash

- Optimal: 1200x675 (16:9) or 1200x1200 (1:1)vhs docs/demo/linkedin-automated.tape

- Frame rate: 10-15 fps```

- Duration: 30-60 secondsShows: 5 different issues → contextual FOAAS tools → professional comments  

Duration: ~45 seconds, 1200x675 (LinkedIn-optimized)

---

**B) Simple Single-Issue Demo:**

## 🏗️ Create Demo Repository```bash

vhs docs/demo/foaas-demo.tape

Set up a complete demo repository with sample issues and PRs:```

Shows: 1 lazy bug report → foaas_logs → professional response  

```bashDuration: ~15 seconds

# Authenticate with GitHub CLI (first time only)

gh auth login**C) LinkedIn Short Version:**

```bash

# Preview what would be createdvhs docs/demo/linkedin-demo.tape

./docs/demo/scripts/demo-setup.sh --dry-run```

Shows: 5 issues in compact format  

# Create demo repository (private by default)Duration: ~30 seconds

./docs/demo/scripts/demo-setup.sh

**Advantages:**

# Create public demo with custom name- ✅ Deterministic (same output every time)

./docs/demo/scripts/demo-setup.sh --name my-foaas-demo --visibility public- ✅ Easy to edit (just text file)

```- ✅ Professional quality

- ✅ No manual recording needed

**Creates:**

- Repository with README**Customization:**

- 20 sample issues (lazy reports, security vulns, bikeshedding, etc.)- Edit `foaas-demo.tape` to change scenario, timing, colors

- 19 sample PRs (excellent fixes, vague descriptions, breaking changes, etc.)- Adjust `Set Theme`, `Set FontSize`, `Set TypingSpeed`

- All 23 FOAAS tools covered

- Proper labels### Option 2: Automated Script + asciinema



### Customize Demo DataFully automated terminal recording → GIF conversion:



Edit JSON templates to create your own scenarios:```bash

# Install dependencies (one-time)

```bashpip install asciinema

# Edit templatescargo install agg  # or download from https://github.com/asciinema/agg/releases

vim docs/demo/data/issues.json

vim docs/demo/data/pull-requests.json# Generate demo GIF

./docs/demo/generate-demo-gif.sh

# Verify all FOAAS tools are covered```

./docs/demo/scripts/analyze-coverage.sh

```**Output:** `foaas-mcp-demo.gif` (ready for LinkedIn)



**JSON Format (issues.json):****Shows:**

```json- Issue #42 with lazy bug report ("it doesn't work")

{- User asks Copilot for help

  "title": "Application crashes on startup",- Copilot uses FOAAS MCP Server (foaas_logs tool)

  "body": "it doesn't work\n\nhelp",- Professional response suggestion provided

  "labels": ["bug"],

  "suggested_tool": "foaas_logs or foaas_rtfm",**Customization:**

  "scenario": "Lazy bug report without details"- Edit `demo_script()` function to change scenario

}- Adjust `--fps` and `--speed` in `agg` command for timing

```- Change `--theme` to match your preference (dracula, monokai, solarized-dark, etc.)



**JSON Format (pull-requests.json):**### Option 3: Simple Terminal Demo (Manual Recording)

```json

{Run this script and screen-record it yourself:

  "title": "Fix memory leak in session handler",

  "body": "## Summary\nFixes memory leak...",```bash

  "head": "fix/memory-leak",./docs/demo/simple-demo.sh

  "suggested_tool": "foaas_legend",```

  "scenario": "Excellent PR with tests"

}Then record with:

```

**Peek (GIF, Linux GUI):**

### Verify Coverage```bash

sudo apt install peek

Check that all FOAAS tools are represented:peek  # Position over terminal, click Record

```

```bash

./docs/demo/scripts/analyze-coverage.sh**asciinema (Cross-platform):**

``````bash

asciinema rec demo.cast

**Current Status: 100% Coverage** (23/23 tools, 39 samples)# Upload to asciinema.org or convert locally

```

Output shows:

- Coverage percentage**OBS Studio (Professional):**

- Tools by category (Appreciation, Rejections, Confrontations, Code Quality)- Supports all platforms

- Sample distribution (issues vs PRs)- Record terminal window

- Missing tools (if any)- Export as MP4, convert to GIF



---### Option 4: CLI Terminal Recording



## 📝 LinkedIn Post TemplatesFor pure CLI workflow:



### Version 1: Technical Focus (Recommended)```bash

# Run existing demo script

```./docs/demo/recording-script.sh

🚀 Shipped: FOAAS MCP Server v0.1.0```



After exploring Model Context Protocol, I built my first MCP server as a **Shows:**

learning project - and it turned into something actually useful for demo 1. Docker image pull

purposes.2. List FOAAS tools (23 total)

3. Three scenarios:

The FOAAS MCP Server exposes 23 humorous response tools through Docker,    - Praising teammate (`foaas_legend`)

demonstrating MCP's ability to extend AI assistants with custom capabilities.    - Lazy bug reports (`foaas_logs`)

Perfect for testing agentic workflows with... shall we say, colorful feedback.   - Celebrating success (`foaas_awesome`)



[Insert linkedin-demo.gif here]**Duration:** ~30 seconds



🔧 Architecture highlights:### Optimize GIF for LinkedIn

• stdio transport (no HTTP complexity)

• Docker-first design (isolated, portable)```bash

• Individual tool pattern (AI picks contextual best fit)# Install optimizer

• TypeScript + Zod schemas (type safety)sudo apt install gifsicle



📦 Ready to use:# Optimize (LinkedIn recommends < 5MB)

docker pull ghcr.io/gusztavvargadr/foaas-mcp:latestgifsicle -O3 --colors 256 input.gif -o output.gif



Integrates with GitHub Copilot in VS Code - the demo GIF shows it responding # Check size

appropriately to issues and PRs in a test repository.ls -lh output.gif

```

⚠️ Content warning: Intentionally contains explicit language (it's FOAAS 

after all)**Tips:**

- LinkedIn max: 5MB

This was a great way to learn MCP architecture, Docker packaging, and - Optimal dimensions: 800x600 or 1024x768

automated CI/CD. Looking forward to building more useful servers!- Frame rate: 10-15 fps is plenty

- Duration: 10-20 seconds ideal

🔗 github.com/gusztavvargadr/foaas-mcp

---

#MCP #ModelContextProtocol #AITooling #Docker #OpenSource #LearningInPublic

```## LinkedIn Post Versions



### Version 2: Relatable/Humorous### Version 1: Technical Focus (Recommended)



``````

Do you also feel sometimes that LLMs are soulless? They don't appreciate 🚀 Shipped: FOAAS MCP Server v0.1.0

your efforts on new feature requests, while calmly accepting the silliest 

bug reports. They nitpick documentation formatting while approving PRs with After exploring Model Context Protocol, I built my first MCP server as a learning project - and it turned into something actually useful for demo purposes.

merge conflicts.

The FOAAS MCP Server exposes 23 humorous response tools through Docker, demonstrating MCP's ability to extend AI assistants with custom capabilities. Perfect for testing agentic workflows with... shall we say, colorful feedback.

This ends today. Meet FOAAS MCP Server - finally, a way to address those 

issues and pull requests with the tone they deserve.🔧 Architecture highlights:

• stdio transport (no HTTP complexity)

[Insert linkedin-demo.gif here]• Docker-first design (isolated, portable)

• Individual tool pattern (AI picks contextual best fit)

Built on Model Context Protocol + FOAAS (Fuck Off As A Service). 23 • TypeScript + Zod schemas (type safety)

contextually-aware tools. Works in VS Code with GitHub Copilot. Open source.

📦 Ready to use:

Cool story, bro. Now go ahead and install it.docker pull ghcr.io/gusztavvargadr/foaas-mcp:latest



🔗 github.com/gusztavvargadr/foaas-mcpIntegrates with GitHub Copilot in VS Code - the demo GIF shows it responding appropriately to issues and PRs in a test repository.



#MCP #GitHubCopilot #OpenSource #DeveloperTools⚠️ Content warning: Intentionally contains explicit language (it's FOAAS after all)

```

This was a great way to learn MCP architecture, Docker packaging, and automated CI/CD. Looking forward to building more useful servers!

### Version 3: Short & Punchy

Full repo: [link]

```

🎯 Built my first MCP server: FOAAS MCP#MCP #ModelContextProtocol #AITooling #Docker #OpenSource #LearningInPublic

```

[Insert linkedin-demo.gif here]

### Version 2: Story Focus

23 humorous response tools. Docker packaged. stdio transport. GitHub Copilot 

integration demo.```

💭 Learning by doing: I built an MCP server (and learned a lot)

Perfect for testing agentic workflows with... personality.

Been exploring Model Context Protocol for a few weeks. Read the docs, tried examples, but nothing clicks like building something yourself.

⚠️ Warning: Explicit language (it's FOAAS)

So I built the FOAAS MCP Server - a deliberately humorous demo that wraps FOAAS in Docker and exposes it through MCP's tool protocol.

Live on GHCR, MIT licensed.

What I learned:

🔗 github.com/gusztavvargadr/foaas-mcp✅ MCP's stdio transport is beautifully simple  

✅ Docker-first architecture = zero dependency hell

#MCP #ModelContextProtocol #AI #Docker✅ Type safety (Zod) catches issues early

```✅ Individual tools > grouped tools for AI selection



---The demo shows GitHub Copilot using it to respond to issues and PRs - it actually picks appropriate responses based on context!



## 🎥 Recording Tipsv0.1.0 is live on GHCR. MIT licensed. Feedback welcome!



### Manual Recording Tools⚠️ Note: Contains explicit language (FOAAS is intentionally profane)



**OBS Studio** (All platforms, professional)[link to repo]

- Screen + audio recording

- Scene composition#MCP #LearningInPublic #AI #OpenSource #Docker

- Export as MP4 → convert to GIF```



**Peek** (Linux, simple GIF recorder)### Version 3: Short & Punchy

```bash

sudo apt install peek```

peek  # Position window over terminal🎯 Built my first MCP server: FOAAS MCP

```

23 humorous response tools. Docker packaged. stdio transport. GitHub Copilot integration demo.

**QuickTime** (macOS, built-in)

- Screen RecordingPerfect for testing agentic workflows with... personality.

- Export → convert to GIF with ffmpeg

⚠️ Warning: Explicit language (it's FOAAS)

**asciinema** (Cross-platform, terminal-focused)

```bashLive on GHCR, MIT licensed.

asciinema rec demo.cast

# Upload to asciinema.org or convert locally[link]

```

#MCP #ModelContextProtocol #AI #Docker

### Edit VHS Tapes```



To customize scenarios, edit `.tape` files:---



```bash## Hashtag Strategy

# Edit timing

Sleep 2s  # Change to 1s or 3s**Primary (always include):**

- `#MCP` - Core technology

# Edit text- `#ModelContextProtocol` - Full name for discoverability

Type "Your custom text here"

**Secondary (choose 3-4):**

# Change theme- `#AI` - Broad reach

Set Theme "Dracula"  # Options: Monokai, Solarized-Dark, etc.- `#AITooling` - Specific niche

- `#Docker` - Technology showcase  

# Adjust size- `#OpenSource` - Community signal

Set Width 1200- `#LearningInPublic` - Personal touch (Version 2)

Set Height 675- `#GitHub` - Platform mention (if showing Copilot)

```

**Maximum:** 7-10 hashtags (LinkedIn allows 3, but more work in practice)

---

---

## 🛠️ Troubleshooting

## Posting Guidelines

### VHS not found

### Timing

```bash- **Best:** Tuesday-Thursday, 7-9 AM or 12-1 PM (timezone: EU/US business hours)

# macOS- **Avoid:** Weekends, late night, holidays

brew install vhs

### Content Warning

# Linux with GoInclude in post or first comment:

go install github.com/charmbracelet/vhs@latest```

⚠️ Content Warning: This project intentionally contains explicit language.

# Linux without Go - download binaryIt's a demo/learning tool using the FOAAS API (Fuck Off As A Service).

wget https://github.com/charmbracelet/vhs/releases/latest/download/vhs_Linux_x86_64.tar.gz```

tar -xzf vhs_Linux_x86_64.tar.gz

sudo mv vhs /usr/local/bin/### Engagement Tips

```- **First hour:** Respond quickly to comments

- **Ask questions:** "What MCP servers are you building?"

### GIF too large- **Share learnings:** "The hardest part was..."

- **Be humble:** "First attempt, feedback welcome"

```bash

# Optimize### Follow-up Content Ideas

gifsicle -O3 --colors 256 input.gif -o output.gif1. **Technical deep dive:** Architecture decisions (thread or article)

2. **Development log:** What I learned building this

# More aggressive (reduce colors)3. **Demo video:** Extended tutorial

gifsicle -O3 --colors 128 input.gif -o output.gif4. **Comparison:** MCP vs other extension patterns



# Check size---

ls -lh output.gif

```## Troubleshooting



### Slow terminal rendering in VHS### Recording Issues



Edit `.tape` file:**Problem:** Peek doesn't capture transparent terminal  

```bash**Solution:** Change terminal to solid background before recording

Set TypingSpeed 10ms  # Faster (was 25ms)

Sleep 500ms          # Shorter pauses (was 1s)**Problem:** asciinema GIF is huge  

```**Solution:** Use gifsicle with `-O3 --colors 256` and limit recording time



---**Problem:** Text too small in GIF  

**Solution:** Increase terminal font size before recording (20pt+)

## 📊 Adding Demo GIF to Main README

### Demo Script Issues

You have several options for including the generated GIF in your repository's main README:

**Problem:** Docker pull takes too long  

### Option 1: Commit GIF Binary (Simple, Fast) ✅**Solution:** Pull image before recording, script will use cached version



**Best for:** Small GIFs (<5MB), infrequent updates**Problem:** Commands run too fast  

**Solution:** Edit `recording-script.sh` and increase sleep times

```bash

# Generate GIF### LinkedIn Upload

vhs docs/demo/vhs-tapes/linkedin-automated.tape

**Problem:** GIF too large (>5MB)  

# Add to repo (consider creating assets folder)**Solution:** Reduce colors, dimensions, or duration:

mkdir -p assets```bash

mv linkedin-demo.gif assets/demo.gifgifsicle -O3 --colors 128 --resize 800x_ demo.gif -o demo-small.gif

git add assets/demo.gif```

git commit -m "Add demo GIF"

**Problem:** Post flagged for profanity  

# Reference in README.md**Solution:** Add content warning as first line, avoid profanity in post text itself

![FOAAS MCP Demo](assets/demo.gif)

```---



**Pros:**## What's Next?

- ✅ Simple, reliable

- ✅ Works offlineAfter posting:

- ✅ No external dependencies

- ✅ Fast loading1. **Monitor engagement** (first 2-4 hours critical)

2. **Respond to comments** promptly

**Cons:**3. **Share in relevant communities** (MCP Discord, Reddit r/MachineLearning)

- ❌ Increases repo size4. **Consider follow-up** content (blog post, video tutorial)

- ❌ GIF in git history forever (even if updated)5. **Update README** with "Featured on LinkedIn" badge (optional)



**Recommendation:** Fine for GIFs <5MB with infrequent updates.---



### Option 2: GitHub Releases (Clean Repo) ✅## Resources



**Best for:** Keeping main repo lean, larger GIFs- [Model Context Protocol Docs](https://modelcontextprotocol.io/docs)

- [FOAAS API](https://www.foaas.io/)

```bash- [LinkedIn Best Practices](https://www.linkedin.com/help/linkedin/answer/a522288)

# 1. Generate GIF- [GIF Optimization Guide](https://www.npmjs.com/package/gifsicle)

vhs docs/demo/vhs-tapes/linkedin-automated.tape

---

# 2. Upload to release assets via GitHub UI or gh CLI

gh release create v0.1.0 linkedin-demo.gif --notes "Demo GIF"**Questions?** Open an issue or reach out on LinkedIn!


# 3. Get direct link from release
# URL format: https://github.com/USER/REPO/releases/download/TAG/FILE

# 4. Reference in README.md
![Demo](https://github.com/gusztavvargadr/foaas-mcp/releases/download/v0.1.0/linkedin-demo.gif)
```

**Pros:**
- ✅ Clean repository (no binary bloat)
- ✅ Versioned with releases
- ✅ Can update without repo history pollution

**Cons:**
- ❌ Requires release workflow
- ❌ External dependency (GitHub CDN)

### Option 3: GitHub Wiki or Docs Folder

**Best for:** Documentation-heavy projects

```bash
# Add to docs/assets/
mkdir -p docs/assets
mv linkedin-demo.gif docs/assets/demo.gif
git add docs/assets/demo.gif

# Reference in README.md (relative path)
![Demo](docs/assets/demo.gif)
```

Similar to Option 1 but keeps assets organized in `docs/` folder.

### Option 4: External Hosting (Optional)

**Best for:** Very large GIFs, frequent updates

Upload to:
- **GitHub Gist** (public, versionable)
- **Imgur** (easy, no auth required)
- **Cloudinary** (CDN, transformations)

```markdown
![Demo](https://i.imgur.com/XXXX.gif)
```

**Pros:**
- ✅ Zero repo size impact
- ✅ Easy to update

**Cons:**
- ❌ External dependency
- ❌ May break if service changes

---

### Recommended Approach for FOAAS MCP

Given your GIF will be:
- ✅ Small (<3MB, LinkedIn-optimized)
- ✅ Infrequently updated (once per major release)
- ✅ Important for first impressions

**I recommend Option 1 or 2:**

**Option 1** (assets/ folder):
```bash
mkdir -p assets
mv linkedin-demo.gif assets/demo.gif
git add assets/demo.gif
```

```markdown
<!-- In README.md -->
## Demo

![FOAAS MCP Server Demo](assets/demo.gif)

*GitHub Copilot responding to 5 different issue types with contextually-aware FOAAS tools*
```

**Option 2** (GitHub Releases):
```bash
gh release upload v0.1.0 linkedin-demo.gif
```

```markdown
<!-- In README.md -->
## Demo

![FOAAS MCP Server Demo](https://github.com/gusztavvargadr/foaas-mcp/releases/download/v0.1.0/linkedin-demo.gif)

*GitHub Copilot responding to 5 different issue types with contextually-aware FOAAS tools*
```

**For your case:** Start with Option 1 (commit to `assets/`). If you later find the repo size is an issue, move to releases. The ~3MB GIF is totally reasonable for a demo project.

---

## 💡 Use Cases

**Demo recordings for:**
- ✅ LinkedIn/social media announcements
- ✅ GitHub README demos
- ✅ Conference/meetup presentations
- ✅ Tutorial videos
- ✅ Documentation

**Demo repository for:**
- ✅ Testing MCP server functionality
- ✅ Copilot integration examples
- ✅ AI agent workflow demonstrations
- ✅ Live coding sessions
- ✅ Training materials

---

## 🤝 Contributing

Have ideas for better demo scenarios? Found bugs in scripts?

1. Edit `data/issues.json` or `data/pull-requests.json`
2. Run `./scripts/analyze-coverage.sh` to verify
3. Submit PR!

---

## ❓ Questions?

Open an issue: https://github.com/gusztavvargadr/foaas-mcp/issues
