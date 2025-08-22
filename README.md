# AspireCRM - Smart Mentorship Management System

A modern, responsive web application for managing mentorship programs with intelligent mentor-mentee matching capabilities.

## 🚀 Features

### Core Functionality
- **Smart Matching Algorithm** - Compatibility-based mentor-mentee pairing
- **Profile Management** - Comprehensive mentor and mentee profiles
- **Active Relationships** - Track and manage ongoing mentorships
- **Dashboard Analytics** - Overview of program metrics and statistics

### User Experience
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Clean interface built with Tailwind CSS
- **Intuitive Navigation** - Easy-to-use routing and page structure
- **Real-time Updates** - Dynamic data management with React Context

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 6.26.0
- **Icons**: Lucide React 0.344.0
- **State Management**: React Context + useReducer
- **Data Persistence**: LocalStorage

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Niketan77/Project.git
cd Project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Getting Started
1. **Add Mentors** - Create profiles for available mentors
2. **Add Mentees** - Register people seeking mentorship
3. **Smart Matching** - Use the matching hub to find compatible pairs
4. **Create Relationships** - Establish mentor-mentee connections
5. **Track Progress** - Monitor active mentorships

### Key Pages
- **Dashboard** - Overview and quick actions
- **Mentors** - Manage mentor profiles and availability
- **Mentees** - Handle mentee applications and needs
- **Matching Hub** - AI-powered compatibility matching
- **Active Matches** - Current mentorship relationships

## 🧠 Matching Algorithm

Our smart matching system considers:
- **Skill Compatibility** (40% weight) - Mentor expertise vs mentee needs
- **Industry Alignment** (25% weight) - Professional background matching
- **Experience Level** (20% weight) - Appropriate mentor-mentee experience gap
- **Communication Style** (15% weight) - Preferred interaction methods

## 🚀 Deployment

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Common/          # Reusable UI components
│   ├── Dashboard/       # Dashboard and metrics
│   ├── Layout/          # App layout and navigation
│   ├── Matching/        # Matching hub and active relationships
│   ├── Mentees/         # Mentee management
│   └── Mentors/         # Mentor management
├── context/             # Global state management
├── styles/              # CSS and styling
└── utils/               # Utility functions and algorithms
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Niketan Agrawal**
- GitHub: [@Niketan77](https://github.com/Niketan77)

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- UI inspired by contemporary CRM and management systems
- Matching algorithm designed for real-world mentorship scenarios

---

⭐ If you found this project helpful, please give it a star on GitHub!
