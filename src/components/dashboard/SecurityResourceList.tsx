
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, FileText, Link as LinkIcon, Shield } from "lucide-react";

type ResourceType = "guide" | "tool" | "article" | "code" | "audit";

type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  tags: string[];
};

const resources: Resource[] = [
  {
    id: "1",
    title: "Solana Program Security Guidelines",
    description: "Official guidelines for writing secure Solana programs",
    url: "https://docs.solana.com/developing/on-chain-programs/security",
    type: "guide",
    tags: ["official", "beginner-friendly"],
  },
  {
    id: "2",
    title: "Soteria - Smart Contract Security Scanner",
    description: "Automated security scanner for Solana programs",
    url: "https://www.soteria.dev/",
    type: "tool",
    tags: ["static-analysis", "automation"],
  },
  {
    id: "3",
    title: "Anchor Framework Security Best Practices",
    description: "Security tips when building with Anchor",
    url: "https://www.anchor-lang.com/docs/security",
    type: "article",
    tags: ["anchor", "best-practices"],
  },
  {
    id: "4",
    title: "Understanding Solana Transaction Processing",
    description: "Deep dive into how transactions are processed and common pitfalls",
    url: "https://solana.com/developers",
    type: "article",
    tags: ["advanced", "transactions"],
  },
  {
    id: "5",
    title: "Secure Program Examples Repository",
    description: "Collection of well-audited program examples as references",
    url: "https://github.com/solana-labs/solana-program-library",
    type: "code",
    tags: ["examples", "reference"],
  },
  {
    id: "6",
    title: "Common Solana Vulnerabilities",
    description: "Analysis of commonly found vulnerabilities in Solana programs",
    url: "https://blog.neodyme.io/posts/solana_common_pitfalls",
    type: "article",
    tags: ["vulnerabilities", "case-studies"],
  },
  {
    id: "7",
    title: "Audit Checklist for Solana Programs",
    description: "Comprehensive checklist before submitting for a formal audit",
    url: "https://github.com/slowmist/solana-smart-contract-security-checklist",
    type: "audit",
    tags: ["checklist", "preparation"],
  },
];

const typeIcons = {
  guide: BookOpen,
  tool: Code,
  article: FileText,
  code: Code,
  audit: Shield,
};

const typeColors = {
  guide: "text-blue-600 bg-blue-50 border-blue-200",
  tool: "text-purple-600 bg-purple-50 border-purple-200",
  article: "text-amber-600 bg-amber-50 border-amber-200",
  code: "text-green-600 bg-green-50 border-green-200",
  audit: "text-red-600 bg-red-50 border-red-200",
};

export function SecurityResourceList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Resources</CardTitle>
        <CardDescription>
          Curated resources for Solana security best practices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => {
              const TypeIcon = typeIcons[resource.type];
              return (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={typeColors[resource.type]}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {resource.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{resource.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <LinkIcon className="h-3 w-3 mr-1" />
                      <span>View</span>
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
