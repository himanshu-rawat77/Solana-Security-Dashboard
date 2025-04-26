# Security-Dashboard

A comprehensive open-source platform for monitoring, analyzing, and reporting on security incidents within the Solana ecosystem.



## Project Overview

The Solana Security Dashboard serves as a public resource for the Solana community to understand security trends, access historical data about exploits, follow best practices, and receive real-time alerts about ongoing security incidents.

## Project Demo 
[![SOLCuardian]([https://www.youtube.com/watch?v=video-id](https://youtu.be/i3VjNOUQZDE))]

### Core Features

- **Exploit History & Analytics**: Detailed overview of major exploits in Solana's history with root cause analysis and visualizations
- **Real-Time Hack Detection**: On-chain monitoring for suspicious transaction patterns with automated alerts
- **Security Resource Hub**: Best practices, common vulnerability patterns, and security tools directory
- **Contributor Framework**: Well-documented structure for community contributions

## Technical Architecture

### Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Data Visualization**: Recharts
- **State Management**: React Query
- **Styling**: TailwindCSS with shadcn/ui components

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    Client Application                       │
│                                                             │
├─────────────┬─────────────────────────────┬────────────────┤
│             │                             │                │
│  Dashboard  │   Exploit History & Data    │  Monitoring    │
│  Components │                             │  System        │
│             │                             │                │
├─────────────┼─────────────────────────────┼────────────────┤
│             │                             │                │
│  Security   │   API Integration Layer     │  Contribution  │
│  Resources  │                             │  Framework     │
│             │                             │                │
└─────────────┴─────────────────────────────┴────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    Backend Services                         │
│                                                             │
├─────────────┬─────────────────────────────┬────────────────┤
│             │                             │                │
│  Database   │   Blockchain Listeners      │  Alert System  │
│             │                             │                │
└─────────────┴─────────────────────────────┴────────────────┘
```

## Implementation Plan

### Phase 1: Foundation (Current Release)
- Dashboard UI with key components
- Exploit history database and visualizations
- Security resource hub
- Project documentation

### Phase 2: Monitoring System
- On-chain transaction monitoring
- Alert system implementation
- Social media signal integration
- Verification system for alerts

### Phase 3: Extended Analytics
- Advanced statistical analysis
- Prediction models for vulnerability detection
- Ecosystem health metrics
- API for third-party integration


## Getting Started

1. Clone the repository
```bash
git clone https://github.com/solana-security/dashboard.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## License

This project is open-source and available under the Apache-2.0 License.
