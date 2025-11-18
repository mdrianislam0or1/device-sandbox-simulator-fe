# Device Sandbox Simulator

A modern, interactive device simulator built with React and TypeScript that allows users to control and visualize smart devices like lights and fans. Features real-time device control, preset management, and a visual canvas interface for an intuitive user experience.

![Device Sandbox Simulator Architecture](/images/image.png)

## 🌐 Live Demo & Resources

- **Live Application**: [https://device-sandbox-simulator-fe.vercel.app/frontend](https://device-sandbox-simulator-fe.vercel.app/frontend)
- **Frontend Repository**: [GitHub - device-sandbox-simulator-fe](https://github.com/mdrianislam0or1/device-sandbox-simulator-fe)
- **Backend Repository**: [GitHub - device-sandbox-simulator-be](https://github.com/mdrianislam0or1/device-sandbox-simulator-be)
- **Demo Video**: [YouTube Tutorial](https://youtu.be/X3tND2GWQMw)
- **Project Documentation**: [Google Drive](https://drive.google.com/file/d/1PjJR1cgfZQJHQF9XFy7yn9DcEU0uUCjM/view?usp=sharing)

## ✨ Features

### Device Control

- **Light Controller**: Brightness adjustment, color temperature control, and on/off functionality
- **Fan Controller**: Speed control with multiple speed levels and on/off functionality
- **Real-time Visualization**: Live visual representation of device states

### Device Management

- View all connected devices with current status
- Toggle devices on/off from the device list
- Individual device detail views
- Real-time device status updates

### Preset System

- Save custom device configurations as presets
- Load and apply saved presets instantly
- Delete or update existing presets
- Preset management modal interface

### Canvas Interface

- Visual representation of multiple devices
- Drag and drop device positioning
- Interactive testing environment
- Real-time state updates

### Responsive Design

- Fully responsive layout for mobile, tablet, and desktop
- Raw CSS with mobile-first approach
- Optimized touch interactions for mobile devices

## 🛠️ Tech Stack

### Frontend

- **React 18+** - UI framework
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **Raw CSS** - Styling with responsive design
- **Vite** - Build tool and dev server

### Backend

- Node.js with Express
- RESTful API architecture
- Real-time device state management

### Deployment

- **Frontend**: Vercel
- **Backend**: Cloud hosting

---

## 📁 Project Structure

```
device-sandbox-simulator/
│
├── 📂 public/                    # Static assets
│   └── 📂 images/                # Image resources
│
├── 📂 src/
│   ├── 📂 components/            # React components
│   │   ├── 📂 Canvas/            # Testing canvas
│   │   │   ├── TestingCanvas.tsx
│   │   │   └── TestingCanvas.css
│   │   │
│   │   ├── 📂 Controllers/       # Device controllers
│   │   │   ├── LightController.tsx
│   │   │   ├── LightController.css
│   │   │   ├── FanController.tsx
│   │   │   └── FanController.css
│   │   │
│   │   ├── 📂 Devices/           # Visual representations
│   │   │   ├── LightVisual.tsx
│   │   │   ├── LightVisual.css
│   │   │   ├── FanVisual.tsx
│   │   │   └── FanVisual.css
│   │   │
│   │   ├── 📂 Modals/            # Modal dialogs
│   │   │   ├── SavePresetModal.tsx
│   │   │   └── SavePresetModal.css
│   │   │
│   │   ├── 📂 Sidebar/           # Navigation sidebar
│   │   │   ├── 📂 DeviceItem/
│   │   │   ├── 📂 PresetItem/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Sidebar.css
│   │   │
│   │   └── 📂 Toast/             # Notification system
│   │       ├── Toast.tsx
│   │       └── Toast.css
│   │
│   ├── 📂 redux/                 # State management
│   │   ├── 📂 api/
│   │   │   └── deviceApi.ts      # RTK Query API
│   │   └── 📂 slices/
│   │       ├── devicesSlice.ts   # Device state
│   │       └── presetsSlice.ts   # Preset state
│   │
│   ├── 📂 hooks/                 # Custom React hooks
│   │   └── store.ts              # Redux hooks
│   │
│   ├── 📄 App.tsx                # Root component
│   ├── 📄 App.css                # App styles
│   ├── 📄 main.tsx               # Entry point
│   └── 📄 index.css              # Global styles
│
├── 📄 index.html                 # HTML template
├── 📄 package.json               # Dependencies
├── 📄 tsconfig.json              # TypeScript config
├── 📄 vite.config.ts             # Vite configuration
└── 📄 README.md                  # Documentation
```

---

### Using the Canvas

```
┌─────────────────────────┐
│  Interactive Canvas     │
│  ┌───┐      ┌───┐      │
│  │ 💡│      │ 🌀│      │
│  └───┘      └───┘      │
│   Drag & Drop Enabled  │
└─────────────────────────┘
```

- **Drag**: Click and hold to move devices
- **Select**: Click device to highlight
- **Control**: Use sidebar controllers
- **Test**: Experiment with configurations

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/mdrianislam0or1/device-sandbox-simulator-fe.git
   cd device-sandbox-simulator-fe
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

# or

yarn install
\`\`\`

# Add any other required environment variables

\`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev

# or

yarn dev
\`\`\`

5. **Build for production**
   \`\`\`bash
   npm run build

# or

yarn build
\`\`\`

## 📖 Usage

### Controlling Devices

**Light Controller**

- Adjust brightness using the slider (0-100%)
- Control color temperature (warm to cool)
- Toggle light on/off
- Real-time brightness visualization

**Fan Controller**

- Select fan speed (Off, Low, Medium, High)
- Adjust speed with slider control
- Visual fan blade animation based on speed
- Real-time speed visualization

### Managing Presets

1. **Save a Preset**

   - Configure devices to desired state
   - Click "Save Preset" button
   - Enter preset name in modal
   - Click "Save" to store configuration

2. **Load a Preset**

   - Select preset from preset list
   - Click to apply all device settings instantly
   - Devices update to saved configuration

3. **Delete a Preset**
   - Right-click or click delete on preset item
   - Confirm deletion
   - Preset is removed from list

### Canvas Interface

- Drag devices to reposition on canvas
- Click devices to select/deselect
- Adjust device properties through controllers
- Test multiple device scenarios

## 🎨 Styling Approach

This project uses **raw CSS** instead of CSS frameworks for:

- Better performance and smaller bundle size
- Complete styling control
- Pixel-perfect design implementation
- Responsive design with mobile-first approach

**Responsive Breakpoints:**

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔄 State Management

Uses **Redux Toolkit** for:

- Centralized device state management
- Preset configuration storage
- API integration with Redux RTK Query
- Real-time state synchronization

## 🌐 API Integration

All backend API calls are managed through Redux API slices:

- `deviceApi.ts` - Device CRUD operations
- Device retrieval and updates
- Real-time state synchronization

## 📱 Responsive Design Features

- **Mobile Optimization**: Adjusted layouts, larger touch targets, optimized spacing
- **Tablet Adaptation**: Balanced column layouts, medium-sized controls
- **Desktop Experience**: Full-featured interface with optimal spacing and sizing
- **Touch-friendly**: Large buttons and interactive elements for mobile users

## 🐛 Known Issues & Improvements

### Current Limitations

- Real-time sync requires page refresh in some scenarios
- Preset limit not yet implemented

### Future Enhancements

- [ ] WebSocket support for real-time updates
- [ ] Multi-user device sharing
- [ ] Device automation and scheduling
- [ ] Advanced analytics dashboard
- [ ] Export/import presets
- [ ] Dark mode theme support

## 🔧 Development

### Available Scripts

\`\`\`bash

# Development server

npm run dev

# Build for production

npm run build

\`\`\`

### Code Structure Best Practices

- **Components**: Each component has its own folder with .tsx and .css files
- **State Management**: Redux slices organize related state logic
- **API Layer**: Centralized API calls through Redux RTK Query
- **CSS Modules**: Separate CSS files prevent style conflicts

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Md Rian Islam**

- GitHub: [@mdrianislam0or1](https://github.com/mdrianislam0or1)
- Project Links:
  - Frontend: [device-sandbox-simulator-fe](https://github.com/mdrianislam0or1/device-sandbox-simulator-fe)
  - Backend: [device-sandbox-simulator-be](https://github.com/mdrianislam0or1/device-sandbox-simulator-be)

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Check existing documentation on Google Drive
- Watch the YouTube tutorial for guidance
- Contact via GitHub

## 🎯 Key Achievements

✅ Fully functional device simulator with real-time control
✅ Responsive design for all screen sizes (mobile, tablet, desktop)
✅ Redux-based state management for scalable architecture
✅ Preset system for saving and loading configurations
✅ Professional UI with smooth animations and transitions
✅ Deployed to Vercel for live access

---

**Version**: 1.0.0
**Last Updated**: November 2025
**Status**: Active Development
