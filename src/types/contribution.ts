
/**
 * Type definitions for the contribution system
 */

import { Exploit, SecurityResource } from "./security";

// User role types
export type UserRole = "contributor" | "reviewer" | "admin";

// User profile
export interface UserProfile {
  id: string;
  username: string;
  role: UserRole;
  contributions: number;
  joinDate: Date;
  expertise?: string[];
}

// Contribution status
export type ContributionStatus = "submitted" | "under-review" | "approved" | "rejected" | "published";

// Base contribution interface
export interface Contribution {
  id: string;
  type: "exploit" | "resource" | "analysis" | "tool" | "other";
  title: string;
  description: string;
  submittedBy: string;
  submissionDate: Date;
  status: ContributionStatus;
  reviewedBy?: string;
  reviewDate?: Date;
  reviewComments?: string;
}

// Exploit contribution
export interface ExploitContribution extends Contribution {
  type: "exploit";
  exploitData: Omit<Exploit, "id">;
  evidence: string[];
}

// Resource contribution
export interface ResourceContribution extends Contribution {
  type: "resource";
  resourceData: Omit<SecurityResource, "id">;
}

// Technical analysis contribution
export interface AnalysisContribution extends Contribution {
  type: "analysis";
  relatedExploitId: string;
  analysisContent: string;
  codeSnippets?: string[];
}

// API structure for submitting contributions
export interface ContributionSubmission {
  type: "exploit" | "resource" | "analysis" | "tool" | "other";
  title: string;
  description: string;
  content: any; // Specific to the contribution type
  references?: string[];
  tags?: string[];
}

// API response for contribution submission
export interface ContributionResponse {
  success: boolean;
  message: string;
  contributionId?: string;
  status: ContributionStatus;
  nextSteps?: string;
}

// GitHub integration types
export interface GitHubPullRequest {
  id: string;
  title: string;
  url: string;
  status: "open" | "closed" | "merged";
  createdAt: Date;
  updatedAt: Date;
  contributor: string;
}

// Contribution statistics
export interface ContributionStats {
  totalContributions: number;
  pendingReview: number;
  approvedLastMonth: number;
  rejectedLastMonth: number;
  topContributors: {
    username: string;
    contributionCount: number;
  }[];
}
