
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ExploitTrends } from "@/components/dashboard/ExploitTrends";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Mock data for different chart types
const pieData = [
  { name: 'Smart Contract', value: 42 },
  { name: 'Protocol', value: 28 },
  { name: 'Bridge', value: 15 },
  { name: 'Flash Loan', value: 10 },
  { name: 'Other', value: 5 },
];

const barData = [
  { name: '2020', smartContract: 5, protocol: 3, bridge: 1 },
  { name: '2021', smartContract: 12, protocol: 8, bridge: 4 },
  { name: '2022', smartContract: 18, protocol: 12, bridge: 7 },
  { name: '2023', smartContract: 7, protocol: 5, bridge: 3 },
];

const lineData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 30 },
  { name: 'Apr', value: 15 },
  { name: 'May', value: 25 },
  { name: 'Jun', value: 45 },
  { name: 'Jul', value: 60 },
  { name: 'Aug', value: 35 },
  { name: 'Sep', value: 28 },
  { name: 'Oct', value: 42 },
  { name: 'Nov', value: 38 },
  { name: 'Dec', value: 30 },
];

const Analytics = () => {
  return (
    <div className="container mx-auto space-y-6 pb-8">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <DashboardHeader /> */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto space-y-6 pb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Visualizations and insights from Solana security incidents
              </p>
            </div>
            
            <ExploitTrends />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exploit Types</CardTitle>
                  <CardDescription>
                    Distribution of security incidents by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Yearly Comparison</CardTitle>
                  <CardDescription>
                    Security incidents by type and year
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="smartContract" fill="#8884d8" name="Smart Contract" />
                      <Bar dataKey="protocol" fill="#82ca9d" name="Protocol" />
                      <Bar dataKey="bridge" fill="#ffc658" name="Bridge" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Temporal Analysis</CardTitle>
                  <CardDescription>
                    Security incidents over time with trend analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <Tabs defaultValue="monthly">
                    <TabsList>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="monthly" className="h-64 mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke="#8884d8" name="Incidents" />
                        </LineChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="quarterly" className="h-64 mt-4">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Quarterly data visualization coming soon</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="yearly" className="h-64 mt-4">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Yearly data visualization coming soon</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
