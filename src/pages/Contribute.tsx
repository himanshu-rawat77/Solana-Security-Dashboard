import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, FileText, GitFork, Heart, MessagesSquare, Shield } from "lucide-react";

const Contribute = () => {
  return (
    <div className="container mx-auto space-y-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Contribute</h1>
        <p className="text-muted-foreground">
          Help improve security across the Solana ecosystem
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitFork className="h-5 w-5 mr-2 text-purple-600" />
              <span>Join the Community</span>
            </CardTitle>
            <CardDescription>
              The Solana Security Dashboard is a community-driven project aimed at improving
              security across the ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert">
              <p>
                We welcome contributions from security researchers, developers, analysts, and anyone passionate about
                improving security in the Solana ecosystem. Whether you're submitting data about security incidents,
                contributing code, improving documentation, or sharing educational resources - every contribution helps
                build a more secure ecosystem.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="incidents">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="incidents">
            <Shield className="h-4 w-4 mr-2" />
            Security Incidents
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="h-4 w-4 mr-2" />
            Code Contributions
          </TabsTrigger>
          <TabsTrigger value="resources">
            <BookOpen className="h-4 w-4 mr-2" />
            Educational Resources
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessagesSquare className="h-4 w-4 mr-2" />
            Feedback & Ideas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="incidents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Security Incident Data</CardTitle>
              <CardDescription>
                Contribute information about exploits and security incidents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Submission Guidelines</h3>
                  <p className="text-sm mb-4">
                    When submitting information about security incidents, please follow these guidelines to ensure quality and accuracy:
                  </p>
                  <ul className="space-y-2 list-disc pl-5 text-sm">
                    <li>Provide verifiable sources and references</li>
                    <li>Include technical details when available (exploit vectors, contract addresses)</li>
                    <li>Specify the impact (funds lost, users affected)</li>
                    <li>Include timestamps and relevant transaction hashes</li>
                    <li>If possible, provide root cause analysis</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Quality Process</h3>
                  <p className="text-sm">
                    All submitted incidents go through a verification process before publication:
                  </p>
                  <ol className="space-y-2 list-decimal pl-5 text-sm mt-2">
                    <li>Initial review by our team</li>
                    <li>Technical verification (on-chain data, source confirmation)</li>
                    <li>Community feedback period</li>
                    <li>Final review and publication</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                <span>Submit Security Incident</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Code Contributions</CardTitle>
              <CardDescription>
                Help improve the Solana Security Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                  <p className="text-sm mb-4">
                    The Solana Security Dashboard is an open-source project built with modern web technologies.
                    Here's how to get started:
                  </p>
                  <div className="p-4 bg-muted rounded-md text-sm font-mono">
                    # Clone the repository<br />
                    git clone https://github.com/solana-security/dashboard<br /><br />
                    
                    # Install dependencies<br />
                    npm install<br /><br />
                    
                    # Start the development server<br />
                    npm run dev
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Project Structure</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="font-medium">/src/components</span> - UI components
                    </li>
                    <li>
                      <span className="font-medium">/src/pages</span> - Page components
                    </li>
                    <li>
                      <span className="font-medium">/src/api</span> - API clients and hooks
                    </li>
                    <li>
                      <span className="font-medium">/src/utils</span> - Utility functions
                    </li>
                    <li>
                      <span className="font-medium">/src/hooks</span> - Custom React hooks
                    </li>
                    <li>
                      <span className="font-medium">/src/types</span> - TypeScript types
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Current Needs</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md flex items-start">
                      <Heart className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Real-time Monitoring Improvements</h4>
                        <p className="text-sm text-muted-foreground">Enhanced on-chain analysis for suspicious transactions</p>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex items-start">
                      <Heart className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Visualization Components</h4>
                        <p className="text-sm text-muted-foreground">Better data visualizations for security trends</p>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex items-start">
                      <Heart className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Alert System</h4>
                        <p className="text-sm text-muted-foreground">Improved notification system for security alerts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <GitFork className="h-4 w-4 mr-2" />
                <span>View GitHub Repository</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Educational Resources</CardTitle>
              <CardDescription>
                Contribute educational content and security resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Resource Types</h3>
                  <p className="text-sm mb-4">
                    We welcome various types of educational resources to help improve security practices:
                  </p>
                  <ul className="space-y-2 list-disc pl-5 text-sm">
                    <li>
                      <span className="font-medium">Best Practices Guides</span> - Security recommendations for Solana development
                    </li>
                    <li>
                      <span className="font-medium">Vulnerability Patterns</span> - Common security issues and how to avoid them
                    </li>
                    <li>
                      <span className="font-medium">Audit Preparation Guides</span> - How to prepare for a security audit
                    </li>
                    <li>
                      <span className="font-medium">Tool Reviews</span> - Analysis of security tools and their effectiveness
                    </li>
                    <li>
                      <span className="font-medium">Technical Articles</span> - In-depth analysis of security concepts
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Submission Format</h3>
                  <p className="text-sm mb-4">
                    Educational resources can be submitted in various formats:
                  </p>
                  <ul className="space-y-2 list-disc pl-5 text-sm">
                    <li>Markdown documents</li>
                    <li>Technical blog posts</li>
                    <li>Code examples with explanations</li>
                    <li>Video tutorials (with transcripts)</li>
                    <li>Interactive guides</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                <span>Submit Educational Resource</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback & Ideas</CardTitle>
              <CardDescription>
                Share your thoughts on how we can improve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">We Value Your Input</h3>
                  <p className="text-sm">
                    The Solana Security Dashboard is continuously evolving based on community feedback. 
                    We welcome suggestions, feature requests, and constructive criticism to make this 
                    platform more valuable for everyone.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Feedback Channels</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md flex items-start">
                      <GitFork className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">GitHub Issues</h4>
                        <p className="text-sm text-muted-foreground">For bug reports and feature requests</p>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex items-start">
                      <MessagesSquare className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Discord Community</h4>
                        <p className="text-sm text-muted-foreground">For discussions and real-time feedback</p>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex items-start">
                      <FileText className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Feedback Form</h4>
                        <p className="text-sm text-muted-foreground">For structured feedback and suggestions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                <span>Submit Feedback</span>
              </Button>
              <Button variant="outline" className="w-full">
                <MessagesSquare className="h-4 w-4 mr-2" />
                <span>Join Discord Community</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Contribute;