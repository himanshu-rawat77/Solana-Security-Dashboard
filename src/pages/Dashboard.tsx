// import React from 'react';
// import { Grid, Typography, Box, CircularProgress } from '@mui/material';
// import {
//   Security as SecurityIcon,
//   Warning as WarningIcon,
//   Timeline as TimelineIcon,
//   Speed as SpeedIcon,
// } from '@mui/icons-material';
// import { StatusCard } from '../components/common/StatusCard';
// import { SecurityMetricsChart } from '../components/charts/SecurityMetricsChart';
// import { useSecurityMetrics } from '../hooks/useSecurityMetrics';

// export const Dashboard: React.FC = () => {
//   const { loading, error, metrics, chartData } = useSecurityMetrics();

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '60vh',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '60vh',
//           color: 'error.main',
//         }}
//       >
//         <Typography variant="h6">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Typography variant="h4" sx={{ mb: 4 }}>
//         Security Overview
//       </Typography>

//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatusCard
//             title="Active Alerts"
//             value={metrics[0].value}
//             severity={metrics[0].value > 5 ? 'critical' : 'medium'}
//             icon={<SecurityIcon />}
//             trend={{
//               value: metrics[0].change,
//               label: `vs last ${metrics[0].timeframe}`,
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <StatusCard
//             title="24h Total Loss"
//             value={`$${metrics[1].value.toLocaleString()}`}
//             severity={metrics[1].value > 50000 ? 'high' : 'low'}
//             icon={<WarningIcon />}
//             trend={{
//               value: metrics[1].change,
//               label: `vs last ${metrics[1].timeframe}`,
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <StatusCard
//             title="Avg Response Time"
//             value={`${metrics[2].value}s`}
//             severity={metrics[2].value > 60 ? 'high' : 'low'}
//             icon={<SpeedIcon />}
//             trend={{
//               value: metrics[2].change,
//               label: `vs last ${metrics[2].timeframe}`,
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <StatusCard
//             title="Monitored Protocols"
//             value={156}
//             icon={<TimelineIcon />}
//             trend={{
//               value: 12,
//               label: 'new this month',
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <SecurityMetricsChart
//             title="Security Incidents Over Time"
//             data={chartData.alerts}
//             height={400}
//           />
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <SecurityMetricsChart
//             title="Total Losses (24h)"
//             data={chartData.losses}
//             height={400}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }; 