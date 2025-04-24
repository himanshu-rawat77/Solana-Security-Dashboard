import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const Documentation = () => {
  return (
    <div className="container mx-auto space-y-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Documentation</h1>
        <p className="text-muted-foreground">
          Detailed guides and documentation for using the Solana Security Dashboard
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Learn how to set up and use the Solana Security Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Installation instructions</li>
            <li>Configuration options</li>
            <li>Basic usage examples</li>
          </ul>
          <Button variant="outline" className="mt-4">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Read Full Guide</span>
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Advanced Usage</CardTitle>
          <CardDescription>
            Explore advanced features and customization options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Custom alert configurations</li>
            <li>Integration with other tools</li>
            <li>API documentation</li>
          </ul>
          <Button variant="outline" className="mt-4">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Explore Advanced Features</span>
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
          <CardDescription>
            Find solutions to common issues and errors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Common error messages</li>
            <li>Debugging tips</li>
            <li>FAQ</li>
          </ul>
          <Button variant="outline" className="mt-4">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Visit Troubleshooting Guide</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documentation;