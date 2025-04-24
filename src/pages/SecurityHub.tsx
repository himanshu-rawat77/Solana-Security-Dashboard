import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SecurityResourceList } from "@/components/dashboard/SecurityResourceList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, FileText, LinkIcon, Search, Shield } from "lucide-react";

const SecurityHub = () => {
  return (
    <div className="container mx-auto space-y-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Security Hub</h1>
        <p className="text-muted-foreground">
          Best practices, tools, and resources for Solana security
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Security Resources</CardTitle>
            <CardDescription>
              Curated collection of security guides, tools, and references
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="guides">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Guides
                </TabsTrigger>
                <TabsTrigger value="tools">
                  <Code className="h-4 w-4 mr-2" />
                  Tools
                </TabsTrigger>
                <TabsTrigger value="articles">
                  <FileText className="h-4 w-4 mr-2" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="audits">
                  <Shield className="h-4 w-4 mr-2" />
                  Audit Resources
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <SecurityResourceList />
              </TabsContent>
              <TabsContent value="guides" className="mt-4">
                <SecurityResourceList />
              </TabsContent>
              <TabsContent value="tools" className="mt-4">
                <SecurityResourceList />
              </TabsContent>
              <TabsContent value="articles" className="mt-4">
                <SecurityResourceList />
              </TabsContent>
              <TabsContent value="audits" className="mt-4">
                <SecurityResourceList />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
            <CardDescription>
              Security recommendations for Solana developers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Always use the latest version of Anchor framework</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Implement comprehensive account validation</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Use proper owner checks on all accounts</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Validate all instruction data properly</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Implement proper signer verification</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                <span>View All Best Practices</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Common Vulnerabilities</CardTitle>
            <CardDescription>
              Patterns to avoid in your programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Missing ownership checks on accounts</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Improper validation of cross-program invocations</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Insufficient signer verification</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Reentrancy vulnerabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Integer overflow/underflow</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                <span>Explore Vulnerability Database</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Audit Preparation</CardTitle>
            <CardDescription>
              Get your project ready for security review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Complete technical documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Comprehensive test suite with high coverage</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Self-assessment using security checklists</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Clean, well-commented codebase</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Clear scope definition for auditors</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <LinkIcon className="h-4 w-4 mr-2" />
                <span>Audit Firms Directory</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityHub;
