# Saikat's Portfolio Website

A modern, responsive portfolio website showcasing projects, games, and contact information. Built with HTML, CSS (Tailwind), and vanilla JavaScript.

🌐 **Live Site**: [https://saikatwtf.github.io](https://saikatwtf.github.io)

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **GitHub Integration**: Dynamically fetches and displays public repositories
- **Interactive Games**: 19 playable web games including board games, math games, creative games, classic games, retro games, and AI games
- **Smooth Navigation**: Sticky navbar with smooth scrolling
- **SEO Optimized**: Meta tags and Open Graph support
- **Contact Integration**: Direct Telegram links and bot integration

## Project Structure

```
saikatwtf.github.io/
├── index.html          # Main portfolio page
├── js/
│   └── main.js         # Theme toggle & GitHub API integration
├── images/
│   └── profile.jpg      # Profile picture
├── games/
│   ├── tic-tac-toe.html
│   ├── chess.html
│   ├── ludo.html
│   ├── snake-ladder.html
│   ├── sudoku.html
│   
│   ├── math/
│   │   ├── 24-game.html
│   │   ├── arithmetic-memory.html
│   │   └── math-blaster.html
│   ├── creative/
│   │   ├── pixel-painter.html
│   │   ├── typing-test.html
│   │   └── wordle.html
│   ├── classics/
│   ├── flappy-bird.html
│   └── bike-racing.html
├── retro/
│   │   ├── pixel-snake.html
│   │   └── block-invaders.html
│   └── ai/
│       ├── rock-paper-scissors.html
│       ├── trivia-quiz.html
│       └── mini-chatbot.html
├── README.md
└── LICENSE
```

## Games Included

### Board Games
1. **Tic-Tac-Toe** - Classic 3x3 grid game with win detection
2. **Chess** - Basic chess board with piece movement
3. **Ludo** - Simplified Ludo with dice rolling mechanics
4. **Snake & Ladder** - Traditional board game with snakes and ladders
5. **Sudoku** - Number puzzle with validation and hints

### Math Games
7. **24 Game** - Use four numbers and operations to make 24
8. **Arithmetic Memory** - Match equations with their correct answers
9. **Math Blaster** - Solve math problems to blast asteroids

### Creative Games
10. **Pixel Painter** - Create your own pixel art masterpieces
11. **Typing Speed Test** - Test your typing speed and accuracy
12. **Wordle Clone** - Guess the 5-letter word in 6 tries

### Classic Games
13. **Flappy Bird** - Arcade-style game with pipe navigation
14. **Bike Racing** - Endless 2D racing game with obstacles

### Retro Games
15. **Pixel Snake** - Classic 8-bit snake game with retro graphics
16. **Block Invaders** - Space Invaders style game with pixel graphics

### AI Games
17. **Rock Paper Scissors AI** - Play against an AI that learns your patterns
18. **Trivia Quiz** - Test your knowledge with API-powered questions
19. **Mini AI Chatbot** - Chat with a rule-based AI assistant

## GitHub Pages Deployment

### Method 1: Direct Push
1. Clone this repository:
   ```bash
   git clone https://github.com/saikatwtf/saikatwtf.github.io.git
   cd saikatwtf.github.io
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

3. Your site will be live at `https://saikatwtf.github.io`

### Method 2: GitHub Web Interface
1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

## Customization

### Personal Information
Edit the following in `index.html`:
- Name and bio in the hero section
- GitHub username in `js/main.js` (line 25)
- Telegram links in the contact section

### Adding Games
1. Create new HTML file in `/games/` directory
2. Add game card to the games section in `index.html`
3. Follow the existing game structure for consistency

### Styling
- Uses Tailwind CSS via CDN
- Dark mode classes: `dark:*`
- Responsive breakpoints: `sm:`, `md:`, `lg:`

## API Integration

### GitHub API
The site automatically fetches public repositories from:
```
https://api.github.com/users/saikatwtf/repos?sort=updated&per_page=6
```

### Rate Limiting
- GitHub API allows 60 requests/hour for unauthenticated requests
- Consider adding GitHub token for higher limits if needed

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Telegram**: [@saikatftw](https://t.me/saikatftw)
- **Bot**: [@AnnihilusOP_Bot](https://t.me/AnnihilusOP_Bot)
- **GitHub**: [@saikatwtf](https://github.com/saikatwtf)

---

*Built with ❤️ by Saikat | Powered by GitHub Pages*