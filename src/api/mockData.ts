
import { Alert, Exploit, SecurityResource } from "@/types/security";

// Mock data for exploit history
export const mockExploits: Exploit[] = [
  {
    id: "1",
    name: "Wormhole Bridge Hack",
    date: new Date("2022-02-02"),
    type: "bridge",
    impact: "critical",
    fundsLost: 320000000,
    target: "Wormhole Bridge",
    status: "confirmed",
    description: "An attacker exploited a vulnerability in the signature verification process of the Wormhole bridge, resulting in the theft of 120,000 wETH.",
    technicalDetails: "The exploit leveraged a failure to properly validate guardian signatures during the token transfer process, allowing the attacker to mint 120,000 wETH on Solana without depositing any collateral.",
    postMortem: "https://wormholecrypto.medium.com/wormhole-incident-report-02-02-22-ad9b8f21eec6",
    references: [
      "https://wormholecrypto.medium.com/wormhole-incident-report-02-02-22-ad9b8f21eec6",
      "https://rekt.news/wormhole-rekt/",
    ],
    transactions: [
      "3Q2sCNGCYwmQQcd4ioANJQibLyykKXN2Hm39Fz8KJDh5TXa5FmEBiWCUPuSkTgXGPFMPfJoEQq141tXBa1x8EAz",
    ],
  },
  {
    id: "2",
    name: "Mango Markets Price Manipulation",
    date: new Date("2022-10-11"),
    type: "protocol",
    impact: "high",
    fundsLost: 114000000,
    target: "Mango Markets",
    status: "confirmed",
    description: "An attacker manipulated the price of MNGO to create artificial collateral, then took out large loans they had no intention of repaying.",
    technicalDetails: "The attacker used two accounts to take opposing positions in the MNGO-PERP market. By executing large trades between these accounts, they artificially inflated the price of MNGO on the Mango Markets exchange, which then allowed them to take out substantial loans against this inflated collateral.",
    references: [
      "https://www.theblock.co/post/175839/mango-markets-community-approves-plan-to-reimburse-bad-debt",
      "https://twitter.com/mangomarkets/status/1580035879965933569",
    ],
  },
  {
    id: "3",
    name: "Slope Wallet Private Key Leak",
    date: new Date("2022-08-02"),
    type: "other",
    impact: "high",
    fundsLost: 4700000,
    target: "Slope Wallet",
    status: "confirmed",
    description: "User private keys were inadvertently transmitted to centralized servers by the Slope mobile wallet, leading to compromised accounts.",
    technicalDetails: "Slope's mobile wallet was sending user mnemonic phrases in plaintext to their centralized logging servers, which were later compromised, allowing attackers to drain multiple wallets.",
    references: [
      "https://twitter.com/SolanaStatus/status/1554921836553273344",
      "https://twitter.com/slope_finance/status/1554761738094452736",
    ],
  },
  {
    id: "4",
    name: "Cashio Infinite Mint",
    date: new Date("2022-03-23"),
    type: "smart-contract",
    impact: "high",
    fundsLost: 52000000,
    target: "Cashio",
    status: "confirmed",
    description: "An attacker exploited a vulnerability in the collateral verification process, allowing them to mint unlimited CASH tokens.",
    technicalDetails: "The exploit stemmed from improper validation of user-supplied collateral accounts during the minting process. The attacker was able to create fake collateral account that passed verification checks, allowing them to mint CASH tokens without providing actual backing assets.",
    references: [
      "https://twitter.com/CashioApp/status/1506570009981288450",
      "https://halborn.com/explained-the-cashio-hack-march-2022/",
    ],
  },
  {
    id: "5",
    name: "Crema Finance Flash Loan Attack",
    date: new Date("2022-07-03"),
    type: "flash-loan",
    impact: "medium",
    fundsLost: 8800000,
    target: "Crema Finance",
    status: "resolved",
    description: "An attacker used a flash loan to manipulate price feeds and exploit the Crema Finance protocol, stealing approximately $8.8 million in assets.",
    technicalDetails: "The attacker exploited a vulnerability in Crema's tick account handling, allowing them to create fake instances of tick accounts and manipulate the market's perception of liquidity. Combined with flash loans, this allowed the attacker to execute trades at advantageous prices.",
    references: [
      "https://twitter.com/Crema_Finance/status/1543682466203709440",
      "https://medium.com/@CremaFinance/post-mortem-analysis-of-the-exploit-7-3-2022-3c66604ab7f1",
    ],
  },
];

// Mock data for live alerts
export const mockAlerts: Alert[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    level: "critical",
    title: "Unusual token transfer patterns detected",
    description: "Multiple large token transfers from multiple accounts to a new address",
    source: "on-chain",
    verified: true,
    relatedAddresses: ["8JUjWjAyXTMB4ZXcV7nk3p6Gg1fWAAoSck4b5tqNfSYS"],
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    level: "high",
    title: "Possible price manipulation attempt",
    description: "Rapid buy/sell patterns detected on DEX for token XYZ",
    source: "dex-monitor",
    verified: true,
    relatedAddresses: ["DuZQM91dZXuDBFiBEMufgZ1E7FBiRMVHPoLshMgc4u3Z"],
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    level: "medium",
    title: "New unverified program deployment",
    description: "Program deployed without source code verification",
    source: "program-tracker",
    verified: false,
    relatedAddresses: ["9ej9BKP1gYLJjgKXSAxrSWcjsNYKZYnZfvjCQNKrzimj"],
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    level: "info",
    title: "Flash loan activity increase",
    description: "25% increase in flash loan volume in the past hour",
    source: "defi-monitor",
    verified: true,
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    level: "low",
    title: "Twitter security alert mention",
    description: "Security researcher mentioned possible vulnerability in Project XYZ",
    source: "social-feed",
    verified: false,
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    level: "info",
    title: "Program update detected",
    description: "Major DeFi protocol updated its program",
    source: "program-tracker",
    verified: true,
    relatedAddresses: ["Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"],
  },
  {
    id: "7",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    level: "medium",
    title: "Governance proposal with admin rights",
    description: "Proposal to grant admin rights submitted on Project ABC",
    source: "governance-monitor",
    verified: true,
    relatedAddresses: ["2JC8KhJ8YuGxQdksx3TJWv3EJMKv7eQqYRgyXtoXc5Bk"],
  },
];

// Mock data for security resources
export const mockResources: SecurityResource[] = [
  {
    id: "1",
    title: "Solana Program Security Guidelines",
    description: "Official guidelines for writing secure Solana programs",
    url: "https://docs.solana.com/developing/on-chain-programs/security",
    type: "guide",
    tags: ["official", "beginner-friendly"],
    verified: true,
  },
  {
    id: "2",
    title: "Soteria - Smart Contract Security Scanner",
    description: "Automated security scanner for Solana programs",
    url: "https://www.soteria.dev/",
    type: "tool",
    tags: ["static-analysis", "automation"],
    verified: true,
  },
  {
    id: "3",
    title: "Anchor Framework Security Best Practices",
    description: "Security tips when building with Anchor",
    url: "https://www.anchor-lang.com/docs/security",
    type: "article",
    tags: ["anchor", "best-practices"],
    verified: true,
  },
  {
    id: "4",
    title: "Understanding Solana Transaction Processing",
    description: "Deep dive into how transactions are processed and common pitfalls",
    url: "https://solana.com/developers",
    type: "article",
    tags: ["advanced", "transactions"],
    verified: true,
  },
  {
    id: "5",
    title: "Secure Program Examples Repository",
    description: "Collection of well-audited program examples as references",
    url: "https://github.com/solana-labs/solana-program-library",
    type: "code",
    tags: ["examples", "reference"],
    verified: true,
  },
  {
    id: "6",
    title: "Common Solana Vulnerabilities",
    description: "Analysis of commonly found vulnerabilities in Solana programs",
    url: "https://blog.neodyme.io/posts/solana_common_pitfalls",
    type: "article",
    tags: ["vulnerabilities", "case-studies"],
    verified: true,
  },
  {
    id: "7",
    title: "Audit Checklist for Solana Programs",
    description: "Comprehensive checklist before submitting for a formal audit",
    url: "https://github.com/slowmist/solana-smart-contract-security-checklist",
    type: "audit",
    tags: ["checklist", "preparation"],
    verified: true,
  },
];

// Mock data for dashboard statistics
export const mockDashboardStats = {
  totalExploits: 42,
  totalFundsLost: 1200000000, // $1.2B
  avgLossPerExploit: 28700000, // $28.7M
  activeAlerts: 3,
  exploitsByType: {
    "smart-contract": 18,
    "protocol": 12,
    "bridge": 6,
    "flash-loan": 4,
    "other": 2
  },
  exploitsByMonth: [
    { month: "Jan 22", count: 2, fundsLost: 32 },
    { month: "Feb 22", count: 3, fundsLost: 320 },
    { month: "Mar 22", count: 2, fundsLost: 52 },
    { month: "Apr 22", count: 1, fundsLost: 5 },
    { month: "May 22", count: 0, fundsLost: 0 },
    { month: "Jun 22", count: 1, fundsLost: 12 },
    { month: "Jul 22", count: 3, fundsLost: 15 },
    { month: "Aug 22", count: 2, fundsLost: 8 },
    { month: "Sep 22", count: 0, fundsLost: 0 },
    { month: "Oct 22", count: 2, fundsLost: 114 },
    { month: "Nov 22", count: 1, fundsLost: 3 },
    { month: "Dec 22", count: 0, fundsLost: 0 },
    { month: "Jan 23", count: 1, fundsLost: 8 },
    { month: "Feb 23", count: 1, fundsLost: 4 },
    { month: "Mar 23", count: 2, fundsLost: 42 },
  ],
};
