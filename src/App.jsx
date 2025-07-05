import React, { useState, useEffect, createContext, useContext } from 'react';

// --- Conceptual Imports for shadcn/ui ---
// We'll define placeholder components for these later if needed for structure,
// or assume they are correctly set up in a typical shadcn/ui project structure.
// Example: import { Button } from "@/components/ui/button";
// For now, we'll list them as comments to acknowledge their need.

// Shadcn/ui Components:
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { DatePicker } from "@/components/ui/date-picker"; // This might be a composite component
// import { Textarea } from "@/components/ui/textarea";
// import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { Toast, useToast } from "@/components/ui/use-toast"; // useToast and Toaster will be needed
// import { Toaster } from "@/components/ui/toaster";
// import { Label } from "@/components/ui/label";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"; // For Combobox
// import { Check, ChevronsUpDown, Play, Pause, StopCircle, Settings, History, Download, AlertTriangle, Moon, Sun, PlusCircle, XCircle, Trash2, Copy, ExternalLink, BarChart, LineChart as LucideLineChartIcon, PieChart as LucidePieChartIcon, ListChecks, Clock, Zap, Users, FileText, Eye, EyeOff, ChevronDown, ChevronRight, ChevronLeft, ChevronUp, Filter, Columns, Search, HelpCircle } from 'lucide-react';


// --- Conceptual Imports for lucide-react ---
// Example: import { PlayCircle } from 'lucide-react';
// We'll list common ones. Specific icons will be imported as needed within components.
// import { Play, Pause, StopCircle, Settings, History, Download, AlertTriangle, Moon, Sun, PlusCircle, XCircle, Trash2, Copy, ExternalLink, BarChart, LineChartIcon, PieChartIcon, ListChecks, Clock, Zap, Users, FileText, Eye, EyeOff, ChevronDown, ChevronRight, ChevronLeft, ChevronUp, Filter, Columns, Search, HelpCircle } from 'lucide-react';


// --- Conceptual Imports for recharts ---
// Example: import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';


// --- Placeholder UI Component Mocks (VERY Basic) ---
// These are extremely simplified placeholders to allow the app to run without actual shadcn/ui.
// In a real shadcn setup, these would be the actual styled components.

const cn = (...classes) => classes.filter(Boolean).join(' '); // Basic clsx/tailwind-merge mock

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn("px-4 py-2 rounded-md border", className)} {...props} />
));
const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("px-3 py-2 border rounded-md", className)} {...props} />
));
const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("px-3 py-2 border rounded-md", className)} {...props} />
));
const Select = ({ children }) => <div>{children}</div>; // Highly simplified
const SelectTrigger = ({ children, className }) => <div className={cn("px-3 py-2 border rounded-md", className)}>{children}<span>▼</span></div>;
const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
const SelectContent = ({ children, className }) => <div className={cn("border mt-1 rounded-md bg-white shadow-lg", className)}>{children}</div>;
const SelectItem = ({ children, value, className }) => <div className={cn("px-3 py-2 hover:bg-gray-100", className)} data-value={value}>{children}</div>;
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("block text-sm font-medium text-gray-700 mb-1", className)} {...props} />
));
const Card = ({ className, ...props }) => <div className={cn("border rounded-lg shadow-sm bg-white", className)} {...props} />;
const CardHeader = ({ className, ...props }) => <div className={cn("p-4 border-b", className)} {...props} />;
const CardTitle = ({ className, ...props }) => <h3 className={cn("text-lg font-semibold", className)} {...props} />;
const CardDescription = ({ className, ...props }) => <p className={cn("text-sm text-gray-500", className)} {...props} />;
const CardContent = ({ className, ...props }) => <div className={cn("p-4", className)} {...props} />;
const CardFooter = ({ className, ...props }) => <div className={cn("p-4 border-t", className)} {...props} />;
const Switch = ({ checked, onCheckedChange, className, id }) => (
  <button
    id={id}
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      "relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
      checked ? "bg-indigo-600" : "bg-gray-200",
      className
    )}
  >
    <span
      className={cn(
        "inline-block w-4 h-4 transform bg-white rounded-full transition-transform",
        checked ? "translate-x-6" : "translate-x-1"
      )}
    />
  </button>
);
const Slider = ({ className, value, onValueChange, min, max, step }) => (
    <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange([parseFloat(e.target.value)])}
        className={cn("w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer", className)}
    />
);
const Collapsible = ({ className, ...props }) => <div className={cn(className)} {...props} />;
const CollapsibleTrigger = ({ children, className, ...props }) => <button className={cn("w-full text-left", className)} {...props}>{children}</button>;
const CollapsibleContent = ({ children, className, ...props }) => <div className={cn(className)} {...props}>{children}</div>;
const Checkbox = ({ id, checked, onCheckedChange, "aria-label": ariaLabel, className }) => (
    <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        aria-label={ariaLabel}
        className={cn("h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500", className)}
    />
);

// DatePicker, Table, AlertDialog, Toast, Popover, Calendar, Command are more complex and will be mocked minimally or functionality simulated.
// For now, we'll assume they exist or use basic HTML equivalents.
// A proper Toaster implementation would typically be placed at the root of the app.
const Toaster = () => <div id="toaster-placeholder" className="fixed top-0 right-0 p-4 z-50"></div>;
// Mock useToast hook
const useToast = () => {
  return {
    toast: ({ title, description, variant }) => {
      console.log(`Toast (${variant || 'default'}): ${title} - ${description}`);
      const toaster = document.getElementById('toaster-placeholder');
      if (toaster) {
        const toastElement = document.createElement('div');
        toastElement.className = `p-3 mb-2 rounded-md shadow-lg bg-gray-800 text-white border ${variant === 'destructive' ? 'border-red-500' : 'border-gray-700'}`;
        toastElement.innerHTML = `<strong>${title}</strong><br/>${description}`;
        toaster.appendChild(toastElement);
        setTimeout(() => {
          if (toastElement.parentNode === toaster) {
             toaster.removeChild(toastElement);
          }
        }, 3000);
      }
    }
  };
};

// Placeholder for DatePicker - very simplified
const DatePicker = ({ date, onDateChange, className }) => (
  <Input
    type="datetime-local"
    className={className}
    value={date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
    onChange={(e) => onDateChange(e.target.value ? new Date(e.target.value) : null)}
  />
);


// --- Lucide Icons (Mocked) ---
// In a real app: import { Play } from 'lucide-react';
const IconMock = ({ name, size = 24, color = "currentColor", className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Simple placeholder shape - a circle. Specific icons would have their paths. */}
    <circle cx="12" cy="12" r="10" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10px" fill={color}>{name.substring(0,1)}</text>
  </svg>
);

const Play = (props) => <IconMock name="Play" {...props} />;
const Pause = (props) => <IconMock name="Pause" {...props} />;
const StopCircle = (props) => <IconMock name="StopCircle" {...props} />;
const Settings = (props) => <IconMock name="Settings" {...props} />;
const History = (props) => <IconMock name="History" {...props} />;
const Download = (props) => <IconMock name="Download" {...props} />;
const AlertTriangle = (props) => <IconMock name="AlertTriangle" {...props} />;
const Moon = (props) => <IconMock name="Moon" {...props} />;
const Sun = (props) => <IconMock name="Sun" {...props} />;
const PlusCircle = (props) => <IconMock name="PlusCircle" {...props} />;
const XCircle = (props) => <IconMock name="XCircle" {...props} />;
const Trash2 = (props) => <IconMock name="Trash2" {...props} />;
const Copy = (props) => <IconMock name="Copy" {...props} />;
const ExternalLink = (props) => <IconMock name="ExternalLink" {...props} />;
const BarChart = (props) => <IconMock name="BarChart" {...props} />; // Lucide icon, not recharts
const LucideLineChartIcon = (props) => <IconMock name="LineChart" {...props} />; // Lucide icon
const LucidePieChartIcon = (props) => <IconMock name="PieChart" {...props} />; // Lucide icon
const ListChecks = (props) => <IconMock name="ListChecks" {...props} />;
const Clock = (props) => <IconMock name="Clock" {...props} />;
const Zap = (props) => <IconMock name="Zap" {...props} />;
const Users = (props) => <IconMock name="Users" {...props} />;
const FileText = (props) => <IconMock name="FileText" {...props} />;
const Eye = (props) => <IconMock name="Eye" {...props} />;
const EyeOff = (props) => <IconMock name="EyeOff" {...props} />;
const ChevronDown = (props) => <IconMock name="ChevronDown" {...props} />;
const ChevronRight = (props) => <IconMock name="ChevronRight" {...props} />;
const ChevronLeft = (props) => <IconMock name="ChevronLeft" {...props} />;
const ChevronUp = (props) => <IconMock name="ChevronUp" {...props} />;
const Filter = (props) => <IconMock name="Filter" {...props} />;
const Columns = (props) => <IconMock name="Columns" {...props} />;
const Search = (props) => <IconMock name="Search" {...props} />;
const HelpCircle = (props) => <IconMock name="HelpCircle" {...props} />;
const Check = (props) => <IconMock name="Check" {...props} />;
const ChevronsUpDown = (props) => <IconMock name="ChevronsUpDown" {...props} />;


// --- Recharts (Mocked) ---
// Basic mock for Recharts components. Real charts won't render but structure will be there.
const ResponsiveContainer = ({ children }) => <div style={{ width: '100%', height: '100%' }}>{children}</div>;
const RechartsChartMock = ({ data, children, className }) => (
  <div className={cn("bg-gray-100 p-4 rounded-md text-xs text-gray-500", className)} style={{ border: '1px dashed #ccc', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Mock Chart (Data points: {data?.length || 0})
    {/* {children} */}
  </div>
);
const LineChart = (props) => <RechartsChartMock {...props} />;
const BarChartRecharts = (props) => <RechartsChartMock {...props} />; // Renamed to avoid conflict with Lucide's BarChart
const PieChart = (props) => <RechartsChartMock {...props} />;
const Line = (props) => <div data-recharts-line-key={props.dataKey} className="recharts-mock-line" style={{display:'none'}}>Line: {props.dataKey}</div>;
const Bar = (props) => <div data-recharts-bar-key={props.dataKey} className="recharts-mock-bar" style={{display:'none'}}>Bar: {props.dataKey}</div>;
const Pie = (props) => <div data-recharts-pie-key={props.dataKey} className="recharts-mock-pie" style={{display:'none'}}>Pie: {props.dataKey}</div>;
const XAxis = (props) => <div data-recharts-xaxis-key={props.dataKey} className="recharts-mock-xaxis" style={{display:'none'}}>XAxis: {props.dataKey}</div>;
const YAxis = (props) => <div data-recharts-yaxis-key={props.dataKey} className="recharts-mock-yaxis" style={{display:'none'}}>YAxis: {props.dataKey}</div>;
const CartesianGrid = (props) => <div className="recharts-mock-grid" style={{display:'none'}}>CartesianGrid</div>;
const Tooltip = (props) => <div className="recharts-mock-tooltip" style={{display:'none'}}>Tooltip</div>;
const Legend = (props) => <div className="recharts-mock-legend" style={{display:'none'}}>Legend</div>;
const Cell = (props) => <div data-recharts-cell-fill={props.fill} className="recharts-mock-cell" style={{display:'none'}}>Cell</div>;



// --- Firebase Configuration (Conceptual) ---
const __app_id = "YOUR_APP_ID"; // Provided by user if they want to use their Firebase
const __firebase_config_str = '{}'; // JSON string, e.g., '{ "apiKey": "...", "authDomain": "...", ... }'
const __initial_auth_token = "YOUR_INITIAL_AUTH_TOKEN"; // For authentication if needed

let FIRESTORE_ENABLED = false; // Set to true to simulate Firestore interaction via console logs
let db = null; // Placeholder for Firestore instance
let currentUserId = null; // Placeholder for Firebase User ID

// Conceptual Firebase Initialization
try {
    if (__firebase_config_str && __firebase_config_str !== '{}' && FIRESTORE_ENABLED) {
        const firebaseConfig = JSON.parse(__firebase_config_str);
        // In a real app:
        // import { initializeApp } from "firebase/app";
        // import { getFirestore } from "firebase/firestore";
        // import { getAuth, signInWithCustomToken } from "firebase/auth";

        // const app = initializeApp(firebaseConfig);
        // db = getFirestore(app);
        // const auth = getAuth(app);
        // if (__initial_auth_token) {
        //   signInWithCustomToken(auth, __initial_auth_token)
        //     .then((userCredential) => {
        //       currentUserId = userCredential.user.uid;
        //       console.log("Firebase: Signed in with custom token. UserID:", currentUserId);
        //     })
        //     .catch((error) => {
        //       console.error("Firebase: Error signing in with custom token:", error);
        //     });
        // } else if (auth.currentUser) {
        //    currentUserId = auth.currentUser.uid;
        // } else {
        //    console.warn("Firebase: No initial auth token and no current user.");
        // }
        console.log("Firebase: Conceptual initialization with config:", firebaseConfig);
        currentUserId = "simulated-user-id-123"; // Simulate a user ID
        console.log("Firebase: SIMULATED Firestore initialized. UserID set to:", currentUserId);
    } else if (FIRESTORE_ENABLED) {
        console.warn("Firebase: FIRESTORE_ENABLED is true, but __firebase_config_str is missing or empty. Firestore will not be used.");
        FIRESTORE_ENABLED = false;
    }
} catch (error) {
    console.error("Firebase: Error parsing __firebase_config_str. Firestore will not be used.", error);
    FIRESTORE_ENABLED = false;
}

// Conceptual Firestore Service
const firestoreService = {
  saveTestResult: async (testResult) => {
    if (!FIRESTORE_ENABLED || !db || !currentUserId) {
      console.log("Firestore Service: Save skipped (Firestore not enabled or user/db not available). Storing locally.");
      return Promise.resolve(); // Still resolve so app flow continues
    }
    console.log(`Firestore Service: Conceptually saving test result ${testResult.id} for user ${currentUserId} to path /artifacts/${__app_id}/users/${currentUserId}/performanceTests/${testResult.id}`);
    // In a real app:
    // import { doc, setDoc } from "firebase/firestore";
    // const path = `/artifacts/${__app_id}/users/${currentUserId}/performanceTests/${testResult.id}`;
    // return setDoc(doc(db, path), testResult);
    return new Promise(resolve => setTimeout(() => { // Simulate async
        console.log(`Firestore Service: Conceptual save complete for ${testResult.id}.`);
        resolve();
    }, 500));
  },
  loadTestHistory: async () => {
    if (!FIRESTORE_ENABLED || !db || !currentUserId) {
      console.log("Firestore Service: Load skipped (Firestore not enabled or user/db not available). Using local history.");
      return Promise.resolve([]); // Return empty array, app will use local state
    }
    console.log(`Firestore Service: Conceptually loading test history for user ${currentUserId} from path /artifacts/${__app_id}/users/${currentUserId}/performanceTests`);
    // In a real app:
    // import { collection, getDocs, query, orderBy } from "firebase/firestore";
    // const path = `/artifacts/${__app_id}/users/${currentUserId}/performanceTests`;
    // const q = query(collection(db, path), orderBy("startTime", "desc"));
    // const querySnapshot = await getDocs(q);
    // const history = [];
    // querySnapshot.forEach((doc) => history.push({ id: doc.id, ...doc.data() }));
    // return history;
    return new Promise(resolve => setTimeout(() => { // Simulate async
        console.log("Firestore Service: Conceptual load complete. Returning empty array (use local for now).");
        resolve([]); // Keep using local state for actual data display
    }, 500));
  }
};


// --- Contexts ---
// 1. Test Configuration Context
const TestConfigurationContext = createContext();
const initialTestConfigState = {
  baseDomain: 'https://www.example.com',
  urlPaths: '/\n/products\n/about-us',
  releaseTag: '', // New field for release/version tag
  testDurationValue: 10,
  testDurationUnit: 'Minutes', // Minutes, Hours, Days
  warmupPeriod: 1, // minutes
  startTime: null, // Date object
  enableRecurrence: false,
  recurrenceType: 'Daily', // Daily, Weekly, Monthly, Custom
  recurrenceFrequency: '', // e.g., "every 2 days", "every Monday"
  recurrenceEndDate: null, // Date object
  concurrentUsers: 10,
  rampUpPeriod: 1, // minutes
  peakLoadDuration: 5, // minutes
  rampDownPeriod: 1, // minutes
  userPacing: 3, // seconds
  ollamaApiEndpoint: 'http://localhost:11434/api/generate',
  ollamaModel: 'llama2',
  ollamaTemperature: 0.8,
  ollamaTopP: 0.9,
  ollamaNumCtx: 2048,
  ollamaStopSequences: '', // comma-separated
  ollamaSeed: null, // number
  simulateHeadlessMode: true,
  // Thresholds
  thresholdLoadTime: 2500, // ms
  thresholdFCP: 1500, // ms
  thresholdLCP: 2000, // ms
  thresholdTPS: 100, // requests per second
  thresholdErrorRate: 5, // percentage
};

// 2. Test Data Context
const TestDataContext = createContext();
const initialTestDataState = {
  currentTestRunId: null,
  testStatus: 'idle', // idle, configuring, running, paused, completed, error
  liveMetrics: {}, // { url: [{timestamp, loadTime, fcp, ...}], ... }
  aggregatedMetrics: {}, // { overallAvgLoadTime, currentTps, ... }
  activityLog: [], // [{ timestamp, type: 'info'|'error'|'alert', message }]
  testResults: null, // { config, summary, detailedMetricsByUrl, log } for completed test
  historicalTests: [], // array of testResults objects
};

// 3. UI State Context
const UIStateContext = createContext();
const initialUIState = {
  currentView: 'new_test', // new_test, live_monitor, test_history, report_view
  theme: 'light', // light, dark
  isConfigPanelOpen: true,
  isLoading: false,
  activeModal: null, // e.g., 'confirmStopTest', 'reportCustomization'
  toast: () => {}, // Placeholder, will be replaced by actual useToast
};


// --- Main App Component ---
export default function App() {
  const [testConfig, setTestConfig] = useState(initialTestConfigState);
  const [testData, setTestData] = useState(initialTestDataState);
  const [uiState, setUiState] = useState(initialUIState);

  const { toast } = useToast(); // Initialize toast here for UIStateContext

  useEffect(() => {
    // Basic theme application
    if (uiState.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a'; // slate-900
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc'; // slate-50
    }
  }, [uiState.theme]);

  const toggleTheme = () => {
    setUiState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  // Function to update UI state, including toast
  const updateUIState = (newState) => {
    setUiState(prev => ({...prev, ...newState}));
  };

  // Add toast to uiState context for easier access in components
  useEffect(() => {
    setUiState(prev => ({ ...prev, toast }));
  }, [toast]);

  // --- Test Execution Engine ---
  useEffect(() => {
    let testIntervalId = null;

    // Persist these across pause/resume by storing them in testData if not already.
    // For simplicity in this effect, we'll re-initialize or read from testData.
    let currentPhase = testData.currentPhase || 'idle';
    let elapsedTestTime = testData.elapsedTestTime || 0; // Total time test has been in 'running' state
    const reportingInterval = 5; // seconds
    let progressMarkers = testData.progressMarkers || { 25: false, 50: false, 75: false, 100: false };
    let alertStates = testData.alertStates || {};

    // Main test processing function
    const runTestInterval = async () => {
      if (!testData.currentConfig || testData.testStatus !== 'running') {
        clearInterval(testIntervalId);
        return;
      }

      const config = testData.currentConfig;
      elapsedTestTime += reportingInterval;

      // Phase Management
      const warmupSeconds = config.warmupPeriod * 60;
      const rampUpSeconds = config.rampUpPeriod * 60;
      const peakLoadSeconds = config.peakLoadDuration * 60;
      const rampDownSeconds = config.rampDownPeriod * 60;
      const endWarmup = warmupSeconds;
      const endRampUp = endWarmup + rampUpSeconds;
      const endPeakLoad = endRampUp + peakLoadSeconds;
      const endRampDown = endPeakLoad + rampDownSeconds;

      let newPhase = currentPhase;
      if (elapsedTestTime <= endWarmup) newPhase = 'warmup';
      else if (elapsedTestTime <= endRampUp) newPhase = 'rampup';
      else if (elapsedTestTime <= endPeakLoad) newPhase = 'peak';
      else if (elapsedTestTime <= endRampDown && currentPhase !== 'stopping_gracefully_rampdown') newPhase = 'rampdown'; // Avoid re-entering rampdown if forced by stop
      else newPhase = (currentPhase === 'stopping_gracefully_rampdown' && elapsedTestTime < endRampDown) ? 'stopping_gracefully_rampdown' : 'finished_phases';


      if (newPhase !== currentPhase && currentPhase !== 'stopping_gracefully_rampdown') { // Don't log phase change if already in forced rampdown
        currentPhase = newPhase;
         setTestData(prev => ({ ...prev, currentPhase, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'info', message: `Phase changed to: ${currentPhase}. Elapsed: ${elapsedTestTime}s`}] }));
      }

      const totalDurationMinutes = config.testDurationUnit === 'Hours' ? config.testDurationValue * 60 : config.testDurationUnit === 'Days' ? config.testDurationValue * 60 * 24 : config.testDurationValue;
      const totalDurationSeconds = totalDurationMinutes * 60;

      // Test Completion Logic
      let testShouldComplete = elapsedTestTime >= totalDurationSeconds;
      if (currentPhase === 'stopping_gracefully_rampdown' && elapsedTestTime >= endRampDown) {
        testShouldComplete = true; // Graceful stop completes after its rampdown
      }
      if (testData.testStatus === 'stopping_gracefully' && currentPhase !== 'stopping_gracefully_rampdown') {
         // If 'stopping_gracefully' is set, and we are not already in its dedicated rampdown, force to it.
        currentPhase = 'stopping_gracefully_rampdown';
        // Reset elapsed time for this special rampdown, or use remaining rampdown time from original schedule.
        // For simplicity, let's assume it runs for `config.rampDownPeriod` from now or until total duration.
        elapsedTestTime = endPeakLoad; // Effectively restart rampdown phase time calculation
        setTestData(prev => ({ ...prev, currentPhase, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'info', message: `Graceful stop: Entering final ramp-down. New elapsed for phase: ${elapsedTestTime}s`}] }));
      }


      if (testShouldComplete) {
        const endTime = Date.now();
        const finalLog = [...testData.activityLog, { timestamp: endTime, type: 'info', message: `Test run ${testData.currentTestRunId} completed. Status: ${testData.testStatus === 'stopping_gracefully' ? 'Stopped Gracefully' : 'Completed'}` }];
        const configSnapshot = { ...testData.currentConfig };
        const testResult = {
          id: testData.currentTestRunId, config: configSnapshot, status: 'Completed', // Standardize final status
          startTime: testData.activityLog.length > 0 ? testData.activityLog[0].timestamp : Date.now() - (elapsedTestTime*1000),
          endTime, durationSeconds: elapsedTestTime,
          summaryMetrics: {
            overallAvgLoadTime: Object.values(testData.aggregatedMetrics).map(m => m.avgLoadTime).filter(Boolean).reduce((s, v, _, arr) => s + v / arr.length, 0) || 0,
            totalRequests: Object.values(testData.aggregatedMetrics).reduce((s, m) => s + (m.totalRequests || 0), 0),
            totalErrors: Object.values(testData.aggregatedMetrics).reduce((s, m) => s + (m.totalErrors || 0), 0),
          },
          detailedMetricsByUrl: { ...testData.liveMetrics }, activityLog: finalLog,
        };
        setTestData(prev => ({ ...prev, testStatus: 'completed', activityLog: finalLog, testResults: testResult, historicalTests: [...prev.historicalTests, testResult], elapsedTestTime, currentPhase, progressMarkers, alertStates }));
        if (FIRESTORE_ENABLED) { /* ... Firestore save logic ... */ } else { uiState.toast({ title: "Test Completed", description: `Test run ${testResult.id} finished. Results saved locally.` }); }
        updateUIState(prev => ({ ...prev, isLoading: false }));
        clearInterval(testIntervalId);
        return;
      }

      // ... (rest of the simulation logic: user calculation, URL iteration, ollamaSimulator call, metric update, alerting) ...
      // This part remains largely the same but uses the updated `currentPhase` and `elapsedTestTime`.
      // For brevity, I'm not repeating the entire simulation block here, just noting it's part of runTestInterval.
        let currentSimulatedUsers = config.concurrentUsers;
        if (currentPhase === 'rampup') {
          const rampUpProgress = Math.min(1, (elapsedTestTime - endWarmup) / rampUpSeconds);
          currentSimulatedUsers = Math.max(1, Math.round(config.concurrentUsers * rampUpProgress));
        } else if (currentPhase === 'rampdown' || currentPhase === 'stopping_gracefully_rampdown') {
          // For stopping_gracefully_rampdown, elapsedTestTime was reset to endPeakLoad effectively.
          const currentRampDownDuration = (currentPhase === 'stopping_gracefully_rampdown') ? rampDownSeconds : (elapsedTestTime - endPeakLoad);
          const totalRampDownPhaseDuration = rampDownSeconds; // Use original rampDownSeconds for calculation
          const rampDownProgress = Math.min(1, currentRampDownDuration / totalRampDownPhaseDuration );
          currentSimulatedUsers = Math.max(1, Math.round(config.concurrentUsers * (1 - rampDownProgress)));

        } else if (currentPhase === 'warmup') {
            currentSimulatedUsers = Math.max(1, Math.round(config.concurrentUsers * 0.25));
        } // else it's peak load or finished_phases (where it would be full users, or 0 if we decide to stop simulation)

        if (currentPhase === 'finished_phases') { // If all defined phases are done but total duration not met
            currentSimulatedUsers = config.concurrentUsers; // Maintain peak or could be 0 if cooling down
        }


        const urlsToTest = config.urlPaths.split('\n').map(p => p.trim()).filter(p => p);
        let newLiveMetricsBatch = {};
        let newAggregatedMetrics = { ...testData.aggregatedMetrics };

        for (const path of urlsToTest) {
          const fullUrl = config.baseDomain.endsWith('/') || path.startsWith('/') ? config.baseDomain + path : config.baseDomain + '/' + path;
          try {
            const simulatedData = await ollamaSimulator.simulatePerformanceTest({
              url: fullUrl, concurrentUsers: currentSimulatedUsers, ollamaModel: config.ollamaModel,
              simulateHeadlessMode: config.simulateHeadlessMode, userPacing: config.userPacing,
            });
            if (currentPhase !== 'warmup') {
                if (!newLiveMetricsBatch[fullUrl]) newLiveMetricsBatch[fullUrl] = [];
                newLiveMetricsBatch[fullUrl].push(simulatedData);
                const allPointsForUrl = [...(testData.liveMetrics[fullUrl] || []), ...newLiveMetricsBatch[fullUrl]]; // Use current batch too
                const totalLoadTime = allPointsForUrl.reduce((sum, m) => sum + m.loadTime, 0);
                const totalRequests = allPointsForUrl.length;
                const totalErrors = allPointsForUrl.filter(m => m.failed).length;
                const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;
                newAggregatedMetrics[fullUrl] = { avgLoadTime: totalLoadTime / totalRequests, totalRequests, totalErrors, errorRate };
                // Alerting Logic
                if (simulatedData.loadTime > config.thresholdLoadTime) { /* ... alert ... */ }
                if (simulatedData.fcp > config.thresholdFCP) { /* ... alert ... */ }
                if (simulatedData.lcp > config.thresholdLCP) { /* ... alert ... */ }
                if (simulatedData.tps < config.thresholdTPS) { /* ... alert ... */ }
                if (newAggregatedMetrics[fullUrl].errorRate > config.thresholdErrorRate) { /* ... alert ... */ }
            }
            setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'debug', message: `Sim ${fullUrl} (${currentPhase}, ${currentSimulatedUsers}u). Load: ${simulatedData.loadTime}ms` }] }));
          } catch (error) { /* ... error logging ... */ }
        }
        if (currentPhase !== 'warmup' && Object.keys(newLiveMetricsBatch).length > 0) {
            setTestData(prev => {
                const updatedLiveMetrics = { ...prev.liveMetrics };
                for (const url in newLiveMetricsBatch) {
                    if (!updatedLiveMetrics[url]) updatedLiveMetrics[url] = [];
                    updatedLiveMetrics[url].push(...newLiveMetricsBatch[url]);
                }
                return { ...prev, liveMetrics: updatedLiveMetrics, aggregatedMetrics: { ...prev.aggregatedMetrics, ...newAggregatedMetrics }, elapsedTestTime, currentPhase, progressMarkers, alertStates };
            });
        } else {
             setTestData(prev => ({ ...prev, elapsedTestTime, currentPhase, progressMarkers, alertStates })); // Save time even if warmup
        }
        const currentProgress = Math.floor((elapsedTestTime / totalDurationSeconds) * 100);
        [25, 50, 75, 100].forEach(marker => { /* ... progress notification ... */ });
    }; // End of runTestInterval

    if ((testData.testStatus === 'running' || testData.testStatus === 'resuming') && testData.currentConfig) {
      if (testData.testStatus === 'resuming') {
        // Restore state from testData before resuming interval
        currentPhase = testData.currentPhase || 'warmup'; // Default to warmup if phase somehow not set
        elapsedTestTime = testData.elapsedTestTime || 0;
        progressMarkers = testData.progressMarkers || { 25: false, 50: false, 75: false, 100: false };
        alertStates = testData.alertStates || {};
        setTestData(prev => ({ ...prev, testStatus: 'running' })); // Change status to running
        updateUIState(prev => ({ ...prev, isLoading: true }));
      } else if (testData.testStatus === 'starting') { // Initial start
        currentPhase = 'warmup';
        elapsedTestTime = 0;
        progressMarkers = { 25: false, 50: false, 75: false, 100: false };
        alertStates = {};
        setTestData(prev => ({ ...prev, testStatus: 'running', currentPhase, elapsedTestTime, progressMarkers, alertStates, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'info', message: `Warm-up phase started.`}] }));
        updateUIState(prev => ({ ...prev, isLoading: true }));
      }

      // Clear any existing interval before starting a new one (e.g., on resume)
      clearInterval(testIntervalId); // Make sure to clear previous if any
      testIntervalId = setInterval(runTestInterval, reportingInterval * 1000);
      runTestInterval(); // Run immediately once on start/resume

    } else if (testData.testStatus === 'paused') {
      clearInterval(testIntervalId);
      // Persist current state to testData so it can be resumed
      setTestData(prev => ({ ...prev, currentPhase, elapsedTestTime, progressMarkers, alertStates }));
      updateUIState(prev => ({ ...prev, isLoading: false }));

    } else if (testData.testStatus === 'stopping_gracefully') {
        // If not already in its special rampdown, the next runTestInterval call will force it.
        // Ensure interval is running if it's not.
        if (!testIntervalId && testData.currentConfig) {
             updateUIState(prev => ({ ...prev, isLoading: true })); // Ensure loading is true
             testIntervalId = setInterval(runTestInterval, reportingInterval * 1000);
             runTestInterval(); // Run immediately
        }
    } else if (testData.testStatus === 'completed' || testData.testStatus === 'stopped_unexpectedly') {
      clearInterval(testIntervalId);
      updateUIState(prev => ({ ...prev, isLoading: false }));
    }

    return () => {
      clearInterval(testIntervalId);
      // If unmounting while running, persist state for potential resume later (though full app unmount usually means reset)
      if (testData.testStatus === 'running') {
         setTestData(prev => ({ ...prev, testStatus: 'paused', currentPhase, elapsedTestTime, progressMarkers, alertStates }));
      }
    };
  }, [testData.testStatus, testData.currentConfig, setTestData, updateUIState, uiState.toast]); // uiState.toast was missing
      const warmupSeconds = config.warmupPeriod * 60;
      const rampUpSeconds = config.rampUpPeriod * 60;
      const peakLoadSeconds = config.peakLoadDuration * 60; // This is duration of peak, not end time
      const rampDownSeconds = config.rampDownPeriod * 60;

      // Derived timings for phase transitions
      const endWarmup = warmupSeconds;
      const endRampUp = endWarmup + rampUpSeconds;
      const endPeakLoad = endRampUp + peakLoadSeconds;
      const endRampDown = endPeakLoad + rampDownSeconds;


      setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'info', message: `Warm-up phase started (duration: ${config.warmupPeriod}m).`}] }));

      testIntervalId = setInterval(async () => {
        elapsedTestTime += reportingInterval;

        // Determine current phase based on elapsed time
        if (currentPhase === 'warmup' && elapsedTestTime >= endWarmup) {
          currentPhase = 'rampup';
          setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'info', message: `Ramp-up phase started (duration: ${config.rampUpPeriod}m). Warm-up complete.`}] }));
        }
        if (currentPhase === 'rampup' && elapsedTestTime >= endRampUp) {
          currentPhase = 'peak';
           setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'info', message: `Peak load phase started (duration: ${config.peakLoadDuration}m). Ramp-up complete.`}] }));
        }
        if (currentPhase === 'peak' && elapsedTestTime >= endPeakLoad) {
          currentPhase = 'rampdown';
          setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'info', message: `Ramp-down phase started (duration: ${config.rampDownPeriod}m). Peak load complete.`}] }));
        }
        if (currentPhase === 'rampdown' && elapsedTestTime >= endRampDown) {
           // This means rampdown is finished, but the test might continue if totalDuration is longer
           // Or, if totalDuration is mainly defined by these phases, then it's effectively finished.
           // For now, let's assume totalDuration is the primary driver for test end.
        }

        if (elapsedTestTime >= totalDurationSeconds) {
          currentPhase = 'finished';
          const endTime = Date.now();
          const finalLog = [...testData.activityLog, { timestamp: endTime, type: 'info', message: `Test run ${testData.currentTestRunId} completed.` }];
          const configSnapshot = { ...testData.currentConfig }; // Ensure config is a snapshot for this specific run

          // Compile test result
          const testResult = {
            id: testData.currentTestRunId,
            config: { ...testData.currentConfig }, // Deep copy config
            status: 'Completed',
            startTime: testData.activityLog.length > 0 ? testData.activityLog[0].timestamp : Date.now() - (elapsedTestTime*1000), // Approx start
            endTime: endTime,
            durationSeconds: elapsedTestTime,
            summaryMetrics: { /* Populate with key overall aggregates */
                // Example: Calculate overall average load time from aggregatedMetrics
                // This needs to be more robust, considering only valid, non-warmup data
                overallAvgLoadTime: Object.values(testData.aggregatedMetrics)
                                        .map(m => m.avgLoadTime)
                                        .filter(Boolean)
                                        .reduce((s, v, _, arr) => s + v / arr.length, 0) || 0,
                totalRequests: Object.values(testData.aggregatedMetrics).reduce((s, m) => s + (m.totalRequests || 0), 0),
                totalErrors: Object.values(testData.aggregatedMetrics).reduce((s, m) => s + (m.totalErrors || 0), 0),

            },
            detailedMetricsByUrl: { ...testData.liveMetrics }, // Snapshot of live metrics
            activityLog: finalLog,
          };

          setTestData(prev => ({
            ...prev,
            testStatus: 'completed',
            activityLog: finalLog,
            testResults: testResult, // Store the current completed test result
            historicalTests: [...prev.historicalTests, testResult] // Add to history (local fallback)
          }));

          // Attempt to save to Firestore if enabled
          if (FIRESTORE_ENABLED) {
            firestoreService.saveTestResult(testResult)
              .then(() => {
                uiState.toast({ title: "Test Completed", description: `Test run ${testResult.id} finished. Results saved to Firestore & locally.` });
              })
              .catch(error => {
                console.error("Firestore: Failed to save test result", error);
                uiState.toast({ title: "Test Completed (Local Save Only)", description: `Test run ${testResult.id} results saved locally. Firestore save failed.`, variant: "warning" });
              });
          } else {
            uiState.toast({ title: "Test Completed", description: `Test run ${testResult.id} finished. Results saved locally.` });
          }

          updateUIState(prev => ({ ...prev, isLoading: false }));
          clearInterval(testIntervalId);
          // Optionally switch to report view or history view
          // updateUIState(prev => ({ ...prev, currentView: 'test_history' }));
          return;
        }

        // Determine current number of concurrent users for simulation
        let currentSimulatedUsers = config.concurrentUsers;
        if (currentPhase === 'rampup') {
          const rampUpProgress = (elapsedTestTime - endWarmup) / rampUpSeconds;
          currentSimulatedUsers = Math.max(1, Math.round(config.concurrentUsers * Math.min(1, rampUpProgress)));
        } else if (currentPhase === 'rampdown') {
          const rampDownProgress = (elapsedTestTime - endPeakLoad) / rampDownSeconds;
          currentSimulatedUsers = Math.max(1, Math.round(config.concurrentUsers * (1 - Math.min(1, rampDownProgress))));
        } else if (currentPhase !== 'peak') { // warmup or if rampdown finished but test continues
            // For warmup, simulate with a fraction of users or 1 if total users is low
            currentSimulatedUsers = Math.max(1, Math.round(config.concurrentUsers * 0.25));
        }
        // During peak, it's config.concurrentUsers

        const urlsToTest = config.urlPaths.split('\n').map(p => p.trim()).filter(p => p);
        let newLiveMetricsBatch = {}; // Temp store for this interval's metrics
        let newAggregatedMetrics = { ...testData.aggregatedMetrics }; // Start with existing aggregates

        for (const path of urlsToTest) {
          const fullUrl = config.baseDomain.endsWith('/') || path.startsWith('/') ? config.baseDomain + path : config.baseDomain + '/' + path;

          // Simulate calls for each "concurrent user" for this URL
          // For simplicity, we'll make one call to ollamaSimulator per URL per interval,
          // passing the currentSimulatedUsers. The simulator itself will use this to vary metrics.
          // A more complex simulation might make `currentSimulatedUsers` calls.
          try {
            const simulatedData = await ollamaSimulator.simulatePerformanceTest({
              url: fullUrl,
              concurrentUsers: currentSimulatedUsers,
              ollamaModel: config.ollamaModel,
              simulateHeadlessMode: config.simulateHeadlessMode,
              userPacing: config.userPacing,
            });

            if (currentPhase !== 'warmup') { // Only record if not in warmup
                // Update liveMetrics
                if (!newLiveMetricsBatch[fullUrl]) newLiveMetricsBatch[fullUrl] = [];
                newLiveMetricsBatch[fullUrl].push(simulatedData);

                // Rudimentary aggregation - this should be more sophisticated
                // For example, avg load time over a window, total TPS, error counts
                const allPointsForUrl = [...(testData.liveMetrics[fullUrl] || []), simulatedData];
                const totalLoadTime = allPointsForUrl.reduce((sum, m) => sum + m.loadTime, 0);
                const totalRequests = allPointsForUrl.length;
                const totalErrors = allPointsForUrl.filter(m => m.failed).length;
                const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;

                newAggregatedMetrics[fullUrl] = {
                    avgLoadTime: totalLoadTime / totalRequests,
                    totalRequests,
                    totalErrors,
                    errorRate,
                };

                // Alerting Logic (Immediate Breach)
                if (simulatedData.loadTime > config.thresholdLoadTime) {
                    const message = `High Load Time for ${fullUrl}: ${simulatedData.loadTime.toFixed(0)}ms (Threshold: ${config.thresholdLoadTime}ms)`;
                    uiState.toast({ title: "Alert: High Load Time", description: message, variant: "destructive" });
                    setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'alert', message }] }));
                }
                if (simulatedData.fcp > config.thresholdFCP) {
                    const message = `High FCP for ${fullUrl}: ${simulatedData.fcp.toFixed(0)}ms (Threshold: ${config.thresholdFCP}ms)`;
                    uiState.toast({ title: "Alert: High FCP", description: message, variant: "destructive" });
                    setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'alert', message }] }));
                }
                if (simulatedData.lcp > config.thresholdLCP) {
                    const message = `High LCP for ${fullUrl}: ${simulatedData.lcp.toFixed(0)}ms (Threshold: ${config.thresholdLCP}ms)`;
                    uiState.toast({ title: "Alert: High LCP", description: message, variant: "destructive" });
                    setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'alert', message }] }));
                }
                if (simulatedData.tps < config.thresholdTPS) { // Assuming lower TPS is bad
                    const message = `Low TPS for ${fullUrl}: ${simulatedData.tps.toFixed(1)} (Threshold: ${config.thresholdTPS})`;
                    uiState.toast({ title: "Alert: Low TPS", description: message, variant: "destructive" });
                    setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'alert', message }] }));
                }
                if (newAggregatedMetrics[fullUrl].errorRate > config.thresholdErrorRate) {
                    const message = `High Error Rate for ${fullUrl}: ${newAggregatedMetrics[fullUrl].errorRate.toFixed(1)}% (Threshold: ${config.thresholdErrorRate}%)`;
                    uiState.toast({ title: "Alert: High Error Rate", description: message, variant: "destructive" });
                    setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'alert', message }] }));
                }
            }
            setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'debug', message: `Simulated fetch for ${fullUrl} (${currentPhase}, ${currentSimulatedUsers} users). Load: ${simulatedData.loadTime}ms. Failed: ${simulatedData.failed}` }] }));

          } catch (error) {
            console.error(`Error simulating test for ${fullUrl}:`, error);
            setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'error', message: `Error simulating for ${fullUrl}: ${error.message}`}] }));
          }
        }

        // Batch update liveMetrics and aggregatedMetrics after processing all URLs for the interval
        if (currentPhase !== 'warmup' && Object.keys(newLiveMetricsBatch).length > 0) {
            setTestData(prev => {
                const updatedLiveMetrics = { ...prev.liveMetrics };
                for (const url in newLiveMetricsBatch) {
                    if (!updatedLiveMetrics[url]) updatedLiveMetrics[url] = [];
                    updatedLiveMetrics[url].push(...newLiveMetricsBatch[url]);
                }
                return {
                    ...prev,
                    liveMetrics: updatedLiveMetrics,
                    aggregatedMetrics: { ...prev.aggregatedMetrics, ...newAggregatedMetrics }
                };
            });
        }

        // Progress Notifications
        const currentProgress = Math.floor((elapsedTestTime / totalDurationSeconds) * 100);
        [25, 50, 75, 100].forEach(marker => {
          if (currentProgress >= marker && !progressMarkers[marker]) {
            const message = `Test run ${testData.currentTestRunId} is ${marker}% complete.`;
            uiState.toast({ title: "Test Progress", description: message });
            setTestData(prev => ({ ...prev, activityLog: [...prev.activityLog, { timestamp: Date.now(), type: 'info', message }] }));
            progressMarkers[marker] = true;
          }
        });

      }, reportingInterval * 1000);
    }

    return () => { // Cleanup function for useEffect
      clearInterval(testIntervalId);
      // clearTimeout(phaseTimeoutId); // Already removed
      if (testData.testStatus === 'running' || testData.testStatus === 'starting') {
        setTestData(prev => ({ ...prev, testStatus: 'stopped_unexpectedly' }));
        updateUIState(prev => ({ ...prev, isLoading: false }));
      }
    };
  }, [testData.testStatus, testData.currentConfig, setTestData, updateUIState, uiState]); // Added uiState to dependencies for toast

  // Conceptual: Load history from Firestore on app startup
  useEffect(() => {
    if (FIRESTORE_ENABLED && currentUserId) {
      updateUIState(prev => ({ ...prev, isLoading: true }));
      firestoreService.loadTestHistory()
        .then(history => {
          // In a real app, you'd merge this with or set it as the historicalTests
          console.log("Firestore: Conceptually loaded history:", history);
          // setTestData(prevData => ({ ...prevData, historicalTests: history }));
          // For now, local history is primary for display.
          if (uiState.toast) uiState.toast({ title: "Firestore", description: "Conceptual history load attempted." });
        })
        .catch(error => {
          console.error("Firestore: Failed to load history", error);
          if (uiState.toast) uiState.toast({ title: "Firestore Error", description: "Could not load history from Firestore.", variant: "destructive" });
        })
        .finally(() => {
          updateUIState(prev => ({ ...prev, isLoading: false }));
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount. Add FIRESTORE_ENABLED and currentUserId if they could change and trigger re-fetch.


  // Placeholder for actual app structure
  return (
    <TestConfigurationContext.Provider value={{ testConfig, setTestConfig }}>
      <TestDataContext.Provider value={{ testData, setTestData }}>
        <UIStateContext.Provider value={{ uiState, updateUIState, toggleTheme }}>
          <div className={`min-h-screen font-sans ${uiState.theme === 'dark' ? 'text-slate-50' : 'text-slate-900'}`}>
            <div className="flex flex-col md:flex-row min-h-screen">
              {/* Sidebar Navigation */}
              <nav className="md:w-64 bg-gray-50 dark:bg-slate-800 p-4 border-r dark:border-slate-700 flex flex-col">
                <div>
                  <h1 className="text-2xl font-bold mb-2">UI Perf Tester</h1>
                  {FIRESTORE_ENABLED && currentUserId && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">User: <span className="font-mono">{currentUserId.substring(0,20)}...</span></p>
                  )}
                  <h2 className="text-lg font-semibold mb-4">Navigation</h2>
                  <div className="space-y-2">
                    <Button
                      variant={uiState.currentView === 'new_test' ? 'secondary' : 'ghost'}
                    className={`w-full justify-start ${uiState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !uiState.isLoading && updateUIState({ currentView: 'new_test' })}
                    disabled={uiState.isLoading}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> New Test
                  </Button>
                  <Button
                    variant={uiState.currentView === 'live_monitor' ? 'secondary' : 'ghost'}
                    className={`w-full justify-start ${uiState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !uiState.isLoading && updateUIState({ currentView: 'live_monitor' })}
                    disabled={uiState.isLoading}
                  >
                    <Zap className="mr-2 h-4 w-4" /> Live Monitor
                  </Button>
                  <Button
                    variant={uiState.currentView === 'test_history' ? 'secondary' : 'ghost'}
                    className={`w-full justify-start ${uiState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !uiState.isLoading && updateUIState({ currentView: 'test_history' })}
                    disabled={uiState.isLoading}
                  >
                    <History className="mr-2 h-4 w-4" /> Test History
                  </Button>
                </div>
                <div className="mt-auto pt-4"> {/* Theme toggle moved to bottom of nav */}
                  <Button
                    onClick={toggleTheme}
                    variant="outline"
                    className={`w-full justify-start ${uiState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={uiState.isLoading}
                  >
                    {uiState.theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                    {uiState.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </Button>
                </div>
              </nav>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col">
                <header className="p-4 border-b dark:border-slate-700 flex justify-between items-center md:hidden"> {/* Header for mobile, or if a global header is needed */}
                  <h1 className="text-xl font-bold">UI Performance Tester</h1>
                  {/* Mobile menu button could go here */}
                </header>

                <main className="flex-1 p-4 overflow-y-auto">
                  {uiState.currentView === 'new_test' && <NewTestView />}
                  {uiState.currentView === 'live_monitor' && <LiveMonitorView />}
                  {uiState.currentView === 'test_history' && <TestHistoryView />}
                  {/* ReportView might be a modal or a sub-view, TBD */}
                </main>
                <Toaster /> {/* For shadcn/ui toasts */}
              </div>
            </div>
          </div>
        </UIStateContext.Provider>
      </TestDataContext.Provider>
    </TestConfigurationContext.Provider>
  );
}


// --- View Components (Placeholders) ---
const NewTestView = () => {
  const { testConfig, setTestConfig } = useContext(TestConfigurationContext);
  const { testData, setTestData } = useContext(TestDataContext);
  const { uiState, updateUIState } = useContext(UIStateContext);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestConfig(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSliderChange = (name, value) => {
    setTestConfig(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleDateChange = (name, date) => {
    setTestConfig(prev => ({ ...prev, [name]: date }));
  };

  const handleSelectChange = (name, value) => {
    setTestConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name, checked) => {
    setTestConfig(prev => ({ ...prev, [name]: checked }));
  };

  const handleAddUrlPath = () => {
    setTestConfig(prev => ({ ...prev, urlPaths: prev.urlPaths + '\n' }));
  };

  const handleClearForm = () => {
    setTestConfig(initialTestConfigState); // Reset to initial state
    toast({ title: "Form Cleared", description: "All configuration fields have been reset." });
  };

  const handleStartTest = () => {
    // Basic Validation
    if (!testConfig.baseDomain || !testConfig.urlPaths) {
      toast({ title: "Validation Error", description: "Base Domain and URL Paths are required.", variant: "destructive" });
      return;
    }
    if (testConfig.testDurationValue <= 0) {
      toast({ title: "Validation Error", description: "Test Duration must be greater than 0.", variant: "destructive" });
      return;
    }
    // Add more validation as needed

    const newTestRunId = `test_${Date.now()}`;
    const activityLogEntry = { timestamp: Date.now(), type: 'info', message: `Test run ${newTestRunId} initiated.` };

    setTestData(prev => ({
      ...initialTestDataState, // Reset data from any previous run
      currentTestRunId: newTestRunId,
      testStatus: 'starting', // New status to trigger test setup in App component
      activityLog: [activityLogEntry],
      currentConfig: { ...testConfig } // Save a snapshot of the config for this run
    }));

    updateUIState({ currentView: 'live_monitor', isLoading: true });
    toast({ title: "Test Starting", description: `Test run ${newTestRunId} is initializing.` });
  };

  // Collapsible state for Ollama parameters
  const [isOllamaConfigOpen, setIsOllamaConfigOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Test Configuration</CardTitle>
          <CardDescription>Define parameters for a new performance test. All durations are in minutes unless specified.</CardDescription>
        </CardHeader>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="baseDomain">Base Domain</Label>
            <Input id="baseDomain" name="baseDomain" value={testConfig.baseDomain} onChange={handleInputChange} placeholder="e.g., https://www.example.com" />
          </div>
          <div>
            <Label htmlFor="urlPaths">URL Paths (one per line)</Label>
            <Textarea id="urlPaths" name="urlPaths" value={testConfig.urlPaths} onChange={handleInputChange} placeholder="/\n/products\n/about-us" rows={3} />
          </div>
          <div>
            <Label htmlFor="releaseTag">Release Tag/Version (Optional)</Label>
            <Input id="releaseTag" name="releaseTag" value={testConfig.releaseTag} onChange={handleInputChange} placeholder="e.g., v1.2.0, sprint-23" />
          </div>
        </CardContent>
      </Card>

      {/* Test Duration & Warm-up */}
      <Card>
        <CardHeader><CardTitle>Test Duration & Warm-up</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="testDurationValue">Duration Value</Label>
            <Input id="testDurationValue" name="testDurationValue" type="number" value={testConfig.testDurationValue} onChange={handleInputChange} min="1" />
          </div>
          <div>
            <Label htmlFor="testDurationUnit">Duration Unit</Label>
            <Select onValueChange={(value) => handleSelectChange('testDurationUnit', value)} value={testConfig.testDurationUnit}>
              <SelectTrigger id="testDurationUnit"><SelectValue placeholder="Select unit" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Minutes">Minutes</SelectItem>
                <SelectItem value="Hours">Hours</SelectItem>
                <SelectItem value="Days">Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="warmupPeriod">Warm-up Period (minutes)</Label>
            <Input id="warmupPeriod" name="warmupPeriod" type="number" value={testConfig.warmupPeriod} onChange={handleInputChange} min="0" />
          </div>
        </CardContent>
      </Card>

      {/* Scheduling & Recurrence */}
      <Card>
        <CardHeader><CardTitle>Scheduling & Recurrence</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time (Optional)</Label>
              <DatePicker id="startTime" date={testConfig.startTime} onDateChange={(date) => handleDateChange('startTime', date)} />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch id="enableRecurrence" name="enableRecurrence" checked={testConfig.enableRecurrence} onCheckedChange={(checked) => handleSwitchChange('enableRecurrence', checked)} />
              <Label htmlFor="enableRecurrence">Enable Recurrence</Label>
            </div>
          </div>
          {testConfig.enableRecurrence && (
            <div className="space-y-4 p-4 border dark:border-slate-700 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recurrenceType">Recurrence Type</Label>
                  <Select onValueChange={(value) => handleSelectChange('recurrenceType', value)} value={testConfig.recurrenceType}>
                    <SelectTrigger id="recurrenceType"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="recurrenceFrequency">Recurrence Frequency</Label>
                  <Input id="recurrenceFrequency" name="recurrenceFrequency" value={testConfig.recurrenceFrequency} onChange={handleInputChange} placeholder="e.g., every 2 days, Mon, 1st" />
                </div>
              </div>
              <div>
                <Label htmlFor="recurrenceEndDate">Recurrence End Date (Optional)</Label>
                <DatePicker id="recurrenceEndDate" date={testConfig.recurrenceEndDate} onDateChange={(date) => handleDateChange('recurrenceEndDate', date)} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Load Profile Simulation */}
      <Card>
        <CardHeader><CardTitle>Load Profile Simulation</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="concurrentUsers">Number of Concurrent Users</Label>
              <Input id="concurrentUsers" name="concurrentUsers" type="number" value={testConfig.concurrentUsers} onChange={handleInputChange} min="1" />
            </div>
            <div>
              <Label htmlFor="userPacing">User Pacing/Think Time (seconds)</Label>
              <Input id="userPacing" name="userPacing" type="number" value={testConfig.userPacing} onChange={handleInputChange} min="0" placeholder="e.g., 2-5 or 3" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rampUpPeriod">Ramp-up Period (minutes)</Label>
              <Input id="rampUpPeriod" name="rampUpPeriod" type="number" value={testConfig.rampUpPeriod} onChange={handleInputChange} min="0" />
            </div>
            <div>
              <Label htmlFor="peakLoadDuration">Peak Load Duration (minutes)</Label>
              <Input id="peakLoadDuration" name="peakLoadDuration" type="number" value={testConfig.peakLoadDuration} onChange={handleInputChange} min="1" />
            </div>
            <div>
              <Label htmlFor="rampDownPeriod">Ramp-down Period (minutes)</Label>
              <Input id="rampDownPeriod" name="rampDownPeriod" type="number" value={testConfig.rampDownPeriod} onChange={handleInputChange} min="0" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ollama & Headless Settings */}
      <Card>
        <CardHeader>
            <Collapsible open={isOllamaConfigOpen} onOpenChange={setIsOllamaConfigOpen}>
                <div className="flex items-center justify-between">
                    <CardTitle>Ollama & Simulation Settings</CardTitle>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                            {isOllamaConfigOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            <span className="sr-only">Toggle Ollama Config</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
            </Collapsible>
        </CardHeader>
        <CollapsibleContent>
            <CardContent className="space-y-4 pt-0">
            <div>
                <Label htmlFor="ollamaApiEndpoint">Ollama API Endpoint</Label>
                <Input id="ollamaApiEndpoint" name="ollamaApiEndpoint" value={testConfig.ollamaApiEndpoint} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <Label htmlFor="ollamaModel">Ollama Model</Label>
                <Input id="ollamaModel" name="ollamaModel" value={testConfig.ollamaModel} onChange={handleInputChange} placeholder="e.g., llama2, mistral" />
                </div>
                <div>
                <Label htmlFor="ollamaSeed">Ollama Seed (for reproducibility)</Label>
                <Input id="ollamaSeed" name="ollamaSeed" type="number" value={testConfig.ollamaSeed || ''} onChange={handleInputChange} placeholder="e.g., 42" />
                </div>
            </div>
            <div>
                <Label htmlFor="ollamaTemperature">Ollama Temperature: {testConfig.ollamaTemperature}</Label>
                <Slider id="ollamaTemperature" name="ollamaTemperature" min={0} max={2} step={0.1} value={[testConfig.ollamaTemperature]} onValueChange={(value) => handleSliderChange('ollamaTemperature', value)} />
            </div>
            <div>
                <Label htmlFor="ollamaTopP">Ollama Top P: {testConfig.ollamaTopP}</Label>
                <Slider id="ollamaTopP" name="ollamaTopP" min={0} max={1} step={0.05} value={[testConfig.ollamaTopP]} onValueChange={(value) => handleSliderChange('ollamaTopP', value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <Label htmlFor="ollamaNumCtx">Ollama Context Window (num_ctx)</Label>
                <Input id="ollamaNumCtx" name="ollamaNumCtx" type="number" value={testConfig.ollamaNumCtx} onChange={handleInputChange} />
                </div>
                <div>
                <Label htmlFor="ollamaStopSequences">Ollama Stop Sequences (comma-sep)</Label>
                <Input id="ollamaStopSequences" name="ollamaStopSequences" value={testConfig.ollamaStopSequences} onChange={handleInputChange} placeholder="e.g., \n,user:" />
                </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
                <Switch id="simulateHeadlessMode" name="simulateHeadlessMode" checked={testConfig.simulateHeadlessMode} onCheckedChange={(checked) => handleSwitchChange('simulateHeadlessMode', checked)} />
                <Label htmlFor="simulateHeadlessMode">Simulate Headless Mode (Ollama)</Label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                If "Simulate Headless Mode" is off and Ollama simulates a page failure, a text description or placeholder for a snapshot will be generated.
            </p>
            </CardContent>
        </CollapsibleContent>
      </Card>

      {/* Metric Thresholds for Alerting */}
      <Card>
        <CardHeader><CardTitle>Alerting Thresholds</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <Label htmlFor="thresholdLoadTime">Load Time (ms) &gt;</Label>
                <Input id="thresholdLoadTime" name="thresholdLoadTime" type="number" value={testConfig.thresholdLoadTime} onChange={handleInputChange} />
            </div>
            <div>
                <Label htmlFor="thresholdFCP">FCP (ms) &gt;</Label>
                <Input id="thresholdFCP" name="thresholdFCP" type="number" value={testConfig.thresholdFCP} onChange={handleInputChange} />
            </div>
            <div>
                <Label htmlFor="thresholdLCP">LCP (ms) &gt;</Label>
                <Input id="thresholdLCP" name="thresholdLCP" type="number" value={testConfig.thresholdLCP} onChange={handleInputChange} />
            </div>
            <div>
                <Label htmlFor="thresholdTPS">TPS &lt;</Label>
                <Input id="thresholdTPS" name="thresholdTPS" type="number" value={testConfig.thresholdTPS} onChange={handleInputChange} />
            </div>
            <div>
                <Label htmlFor="thresholdErrorRate">Error Rate (%) &gt;</Label>
                <Input id="thresholdErrorRate" name="thresholdErrorRate" type="number" value={testConfig.thresholdErrorRate} onChange={handleInputChange} min="0" max="100" />
            </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          onClick={handleClearForm}
          disabled={testData.testStatus === 'running' || testData.testStatus === 'starting' || testData.testStatus === 'resuming' || testData.testStatus === 'stopping_gracefully'}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Clear Form
        </Button>
        <Button
          onClick={handleStartTest}
          disabled={testData.testStatus === 'running' || testData.testStatus === 'starting' || testData.testStatus === 'resuming' || testData.testStatus === 'stopping_gracefully'}
        >
          {uiState.isLoading && (testData.testStatus === 'starting' || testData.testStatus === 'resuming') ? (
            <><IconMock name="Loader" className="mr-2 h-4 w-4 animate-spin" /> Starting...</>
          ) : (
            <><Play className="mr-2 h-4 w-4" /> Start Test</>
          )}
        </Button>
      </div>
    </div>
  );
};

const LiveMonitorView = () => {
  const { testData, setTestData } = useContext(TestDataContext);
  const { uiState, updateUIState } = useContext(UIStateContext);
  const { toast } = useToast();

  const { currentTestRunId, testStatus, liveMetrics, aggregatedMetrics, activityLog, currentConfig } = testData;
  const activityLogRef = React.useRef(null);

  useEffect(() => {
    if (activityLogRef.current) {
      activityLogRef.current.scrollTop = activityLogRef.current.scrollHeight;
    }
  }, [activityLog]);

  if (testStatus === 'idle' || !currentConfig) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Test Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No test is currently running. Configure and start a new test from the "New Test" page.</p>
        </CardContent>
      </Card>
    );
  }

  // Placeholder for actual time elapsed calculation based on test start time + current time.
  // For now, just an indicator.
  const [elapsedDisplayTime, setElapsedDisplayTime] = useState(testData.elapsedTestTime || 0);
  useEffect(() => {
    let timer;
    if (testStatus === 'running' || testStatus === 'resuming' || testStatus === 'stopping_gracefully') {
       // Use persisted elapsedTestTime from testData as the source of truth
       setElapsedDisplayTime(testData.elapsedTestTime || 0);
       timer = setInterval(() => {
         // This local timer is just for display updates between reporting intervals.
         // The main engine updates testData.elapsedTestTime authoritative.
         setElapsedDisplayTime(s => s + 1);
       }, 1000);
    } else {
      // When paused or completed, ensure display matches the final persisted elapsed time
      setElapsedDisplayTime(testData.elapsedTestTime || 0);
    }
    return () => clearInterval(timer);
  }, [testStatus, testData.elapsedTestTime]);


  // --- Action Button Handlers ---
  const handlePauseTest = () => {
    // Main test engine should eventually handle setting isLoading to false for 'paused' state
    setTestData(prev => ({ ...prev, testStatus: 'paused', activityLog: [...prev.activityLog, {timestamp: Date.now(), type: 'info', message: 'Test paused.'}] }));
    updateUIState(prev => ({ ...prev, isLoading: false }));
    toast({ title: "Test Paused", description: `Test run ${currentTestRunId} has been paused.` });
  };

  const handleResumeTest = () => {
    setTestData(prev => ({ ...prev, testStatus: 'resuming', activityLog: [...prev.activityLog, {timestamp: Date.now(), type: 'info', message: 'Test resuming...'}] })); // New state for engine to pick up
    updateUIState(prev => ({ ...prev, isLoading: true }));
    toast({ title: "Test Resuming", description: `Test run ${currentTestRunId} is resuming.` });
  };

  const handleStopTestGracefully = () => {
    setTestData(prev => ({ ...prev, testStatus: 'stopping_gracefully', activityLog: [...prev.activityLog, {timestamp: Date.now(), type: 'info', message: 'Test stopping gracefully...'}] }));
    updateUIState(prev => ({ ...prev, isLoading: true })); // Keep loading true as it's an active process
    toast({ title: "Test Stopping", description: `Test run ${currentTestRunId} is stopping gracefully.` });
  };

  const handleCancelTestImmediately = () => {
    // The test engine's cleanup for 'running' status will also trigger if current status is 'paused' or 'stopping_gracefully'
    // by directly setting it to 'completed'.
    setTestData(prev => ({
      ...prev,
      testStatus: 'completed', // This will trigger cleanup in the main useEffect
      activityLog: [...prev.activityLog, {timestamp: Date.now(), type: 'warning', message: `Test run ${currentTestRunId} cancelled immediately.`}]
    }));
    // updateUIState will be handled by the main loop's cleanup when it sees 'completed'
    toast({ title: "Test Cancelled", description: `Test run ${currentTestRunId} was cancelled.`, variant: "destructive" });
  };

  // --- Data Preparation for Charts/Tables ---
  const uniqueUrls = Object.keys(liveMetrics || {});

  // Example: Prepare data for a chart of average load time over time (overall)
  const overallLoadTimeData = Object.values(liveMetrics)
    .flat()
    .sort((a, b) => a.timestamp - b.timestamp) // Ensure chronological order
    .reduce((acc, curr) => {
      // Aggregate by time interval (e.g., every 5 seconds, matching reportingInterval)
      // This is a simplified aggregation for the chart.
      // A more robust approach would average values within the same timestamp bucket.
      const timeKey = new Date(curr.timestamp).toLocaleTimeString(); // Or format to nearest 5s interval
      const existingEntry = acc.find(entry => entry.time === timeKey);
      if (existingEntry) {
        existingEntry.LoadTime = (existingEntry.LoadTime * existingEntry.count + curr.loadTime) / (existingEntry.count + 1);
        existingEntry.count++;
      } else {
        acc.push({ time: timeKey, LoadTime: curr.loadTime, count: 1 });
      }
      return acc;
    }, [])
    .slice(-100); // Keep only last 100 points for chart performance

  // --- Render Logic ---
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Live Test Monitor: {currentTestRunId || "N/A"}</CardTitle>
            <CardDescription>
              Status: <span className={`font-semibold ${testStatus === 'running' || testStatus === 'resuming' ? 'text-green-500' : testStatus === 'paused' ? 'text-yellow-500' : testStatus === 'stopping_gracefully' ? 'text-orange-500' : 'text-red-500'}`}>{testStatus}</span>
              {testData.currentPhase && ` | Phase: ${testData.currentPhase}`}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handlePauseTest}
              variant="outline"
              disabled={testStatus !== 'running' || uiState.isLoading}
            >
              <Pause className="mr-2 h-4 w-4" />Pause
            </Button>
            <Button
              onClick={handleResumeTest}
              variant="outline"
              disabled={testStatus !== 'paused' || uiState.isLoading}
            >
              <Play className="mr-2 h-4 w-4" />Resume
            </Button>
            <Button
              onClick={handleStopTestGracefully}
              variant="outline"
              disabled={!(testStatus === 'running' || testStatus === 'paused') || testStatus === 'stopping_gracefully'}
            >
              {testStatus === 'stopping_gracefully' ? <IconMock name="Loader" className="mr-2 h-4 w-4 animate-spin" /> : <StopCircle className="mr-2 h-4 w-4" />}
              {testStatus === 'stopping_gracefully' ? 'Stopping...' : 'Stop Gracefully'}
            </Button>
            <Button
              onClick={handleCancelTestImmediately}
              variant="destructive"
              disabled={testStatus === 'completed' || testStatus === 'idle'}
            >
              <XCircle className="mr-2 h-4 w-4" />Cancel Immediately
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Aggregated Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Elapsed Time</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{new Date(elapsedDisplayTime * 1000).toISOString().substr(11, 8)}</p></CardContent>
        </Card>
        {/* Add more summary cards: Current Users, Overall Avg Load, Total Req, Errors etc. */}
        {/* These would come from better aggregated data in testData.aggregatedMetrics */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Simulated Users</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{testData.currentConfig?.concurrentUsers || 0} (Target)</p></CardContent>
        </Card>
         <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Total Requests (Recorded)</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{Object.values(aggregatedMetrics).reduce((sum, m) => sum + (m.totalRequests || 0), 0)}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Total Errors (Recorded)</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{Object.values(aggregatedMetrics).reduce((sum, m) => sum + (m.totalErrors || 0), 0)}</p></CardContent>
        </Card>
      </div>

      {/* Metrics Table per URL */}
      <Card>
        <CardHeader><CardTitle>Live Metrics per URL</CardTitle></CardHeader>
        <CardContent>
          {uniqueUrls.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead className="border-b dark:border-slate-700">
                  <tr className="text-left">
                    <th className="p-2 font-semibold">URL</th>
                    <th className="p-2 font-semibold">Last Load (ms)</th>
                    <th className="p-2 font-semibold">Avg Load (ms)</th>
                    <th className="p-2 font-semibold">FCP (ms)</th>
                    <th className="p-2 font-semibold">LCP (ms)</th>
                    <th className="p-2 font-semibold">CLS</th>
                    <th className="p-2 font-semibold">TPS</th>
                    <th className="p-2 font-semibold">Failures</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueUrls.map(url => {
                    const urlMetrics = liveMetrics[url] || [];
                    const lastMetric = urlMetrics[urlMetrics.length - 1];
                    const aggMetric = aggregatedMetrics[url];
                    if (!lastMetric) return null;
                    return (
                      <tr key={url} className="border-b dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="p-2 truncate max-w-xs" title={url}>{url}</td>
                        <td className="p-2">{lastMetric.loadTime.toFixed(0)}</td>
                        <td className="p-2">{aggMetric?.avgLoadTime?.toFixed(0) || 'N/A'}</td>
                        <td className="p-2">{lastMetric.fcp.toFixed(0)}</td>
                        <td className="p-2">{lastMetric.lcp.toFixed(0)}</td>
                        <td className="p-2">{lastMetric.cls.toFixed(3)}</td>
                        <td className="p-2">{lastMetric.tps.toFixed(1)}</td>
                        <td className="p-2">{aggMetric?.totalErrors || 0} / {aggMetric?.totalRequests || 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">Waiting for metric data...</p>
          )}
        </CardContent>
      </Card>

      {/* Real-time Charts */}
      <Card>
        <CardHeader><CardTitle>Performance Charts</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-64"> {/* Fixed height for chart containers */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overallLoadTimeData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="LoadTime" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">Overall Avg Load Time (Placeholder Data)</p>
          </div>
          {/* Add more charts here (TPS, Error Rate) */}
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <BarChartRecharts data={uniqueUrls.map(url => ({ name: new URL(url).pathname, "Avg Load Time": aggregatedMetrics[url]?.avgLoadTime || 0 }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Avg Load Time" fill="#82ca9d" />
                </BarChartRecharts>
             </ResponsiveContainer>
             <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">Avg Load Time per URL Path</p>
           </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card>
        <CardHeader><CardTitle>Activity Log</CardTitle></CardHeader>
        <CardContent ref={activityLogRef} className="max-h-64 overflow-y-auto space-y-2 text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded-md">
          {activityLog.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-4">No activity yet.</p>}
          {activityLog.map((log, index) => ( // Keep chronological order for auto-scroll
            <div
              key={index}
              className={`p-1.5 rounded ${
                log.type === 'error' ? 'bg-red-100 dark:bg-red-800/30 text-red-700 dark:text-red-300' :
                log.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-700/30 text-yellow-700 dark:text-yellow-300' :
                log.type === 'alert' ? 'bg-orange-100 dark:bg-orange-700/30 text-orange-700 dark:text-orange-300' :
                log.type === 'info' ? 'bg-blue-50 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300' :
                'bg-gray-100 dark:bg-slate-700/30 text-gray-600 dark:text-gray-300' // Debug or other types
              }`}
            >
              <span className="font-medium">{new Date(log.timestamp).toLocaleTimeString()}</span>
              <span className={`font-bold mx-1 ${
                  log.type === 'error' ? 'text-red-500' :
                  log.type === 'warning' ? 'text-yellow-500' :
                  log.type === 'alert' ? 'text-orange-500' :
                  log.type === 'info' ? 'text-blue-500' : 'text-gray-500'
              }`}>[{log.type.toUpperCase()}]:</span>
              <span>{log.message}</span>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
};

const TestHistoryView = () => {
  const { testData, setTestData } = useContext(TestDataContext);
  const { updateUIState } = useContext(UIStateContext); // To navigate to a detailed report view later
  const { toast } = useToast();
  const [selectedBaseline, setSelectedBaseline] = useState(null);
  const [selectedForComparison, setSelectedForComparison] = useState(new Set());

  const { historicalTests } = testData;

  const handleToggleCompareSelection = (testId) => {
    setSelectedForComparison(prev => {
      const newSet = new Set(prev);
      if (newSet.has(testId)) {
        newSet.delete(testId);
      } else {
        newSet.add(testId);
      }
      return newSet;
    });
  };

  const handleCompareSelected = () => {
    if (selectedForComparison.size < 2) {
      toast({ title: "Select Tests", description: "Please select at least two tests to compare.", variant: "default" });
      return;
    }
    const testsToCompare = historicalTests.filter(t => selectedForComparison.has(t.id));
    console.log("Comparing selected tests:", testsToCompare.map(t => ({id: t.id, tag: t.config.releaseTag, summary: t.summaryMetrics })));
    // For now, just log. A modal or new view would show detailed comparison.
    // Create a simple comparison string for an alert/toast
    let comparisonSummary = `Comparing ${testsToCompare.length} tests:\n`;
    testsToCompare.forEach(test => {
        comparisonSummary += `ID: ${test.id} (Tag: ${test.config.releaseTag || 'N/A'}) - Avg Load: ${test.summaryMetrics.overallAvgLoadTime?.toFixed(0)}ms, Errors: ${test.summaryMetrics.totalErrors}\n`;
    });
    alert(comparisonSummary); // Using alert for quick PoC, replace with shadcn dialog
    toast({ title: `Comparing ${testsToCompare.length} Tests`, description: "Comparison details logged to console. Basic summary in alert.", duration: 5000});
  };

  const generateReportHTML = (testResult) => {
    if (!testResult) return "";

    const { config, summaryMetrics, detailedMetricsByUrl, activityLog, startTime, endTime, durationSeconds, status, id } = testResult;

    // Basic inline CSS
    const styles = `
      body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; background-color: #f4f4f4; color: #333; }
      .container { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
      h1, h2, h3 { color: #333; }
      h1 { border-bottom: 2px solid #eee; padding-bottom: 10px; }
      h2 { border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px; }
      table { width: 100%; border-collapse: collapse; margin-top: 15px; }
      th, td { text-align: left; padding: 8px; border: 1px solid #ddd; }
      th { background-color: #f0f0f0; }
      .config-table td:first-child { font-weight: bold; width: 30%; }
      .log-entry { padding: 5px; border-bottom: 1px solid #eee; }
      .log-entry.error { background-color: #ffebee; color: #c62828; }
      .log-entry.alert { background-color: #fff3e0; color: #ef6c00; }
      .log-entry.info { background-color: #e3f2fd; }
      .snapshot { border: 1px dashed #ccc; padding: 10px; margin-top: 5px; background-color: #fafafa; }
      pre { background-color: #272822; color: #f8f8f2; padding: 1em; border-radius: 0.3em; overflow-x: auto; }
    `;

    let html = `<html><head><title>Performance Test Report: ${id}</title><style>${styles}</style></head><body><div class="container">`;
    html += `<h1>Performance Test Report</h1>`;
    html += `<p><strong>Test ID:</strong> ${id}</p>`;
    html += `<p><strong>Status:</strong> ${status}</p>`;
    html += `<p><strong>Start Time:</strong> ${new Date(startTime).toLocaleString()}</p>`;
    html += `<p><strong>End Time:</strong> ${new Date(endTime).toLocaleString()}</p>`;
    html += `<p><strong>Duration:</strong> ${new Date(durationSeconds * 1000).toISOString().substr(11, 8)}</p>`;

    // Test Configuration
    html += `<h2>Test Configuration</h2><table class="config-table">`;
    for (const key in config) {
      html += `<tr><td>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td><td>${typeof config[key] === 'object' ? JSON.stringify(config[key]) : config[key]}</td></tr>`;
    }
    html += `</table>`;

    // Summary Metrics
    html += `<h2>Summary Metrics</h2><table>`;
    html += `<tr><th>Metric</th><th>Value</th></tr>`;
    html += `<tr><td>Overall Average Load Time</td><td>${summaryMetrics.overallAvgLoadTime?.toFixed(0) || 'N/A'} ms</td></tr>`;
    html += `<tr><td>Total Requests</td><td>${summaryMetrics.totalRequests || 'N/A'}</td></tr>`;
    html += `<tr><td>Total Errors</td><td>${summaryMetrics.totalErrors || 'N/A'}</td></tr>`;
    // Add more summary metrics as available
    html += `</table>`;

    // Detailed Metrics per URL (simplified as table of last known values or aggregates)
    html += `<h2>Detailed Metrics per URL</h2>`;
    if (detailedMetricsByUrl && Object.keys(detailedMetricsByUrl).length > 0) {
        for (const url in detailedMetricsByUrl) {
            html += `<h3>URL: ${url}</h3>`;
            const metricsForUrl = detailedMetricsByUrl[url];
            if (metricsForUrl && metricsForUrl.length > 0) {
                // For simplicity, show table of all data points. Could be aggregated.
                html += `<table><tr><th>Timestamp</th><th>Load (ms)</th><th>FCP (ms)</th><th>LCP (ms)</th><th>TBT (ms)</th><th>CLS</th><th>TPS</th><th>Failed</th><th>Snapshot</th></tr>`;
                metricsForUrl.forEach(m => {
                    html += `<tr>
                        <td>${new Date(m.timestamp).toLocaleTimeString()}</td>
                        <td>${m.loadTime.toFixed(0)}</td>
                        <td>${m.fcp.toFixed(0)}</td>
                        <td>${m.lcp.toFixed(0)}</td>
                        <td>${m.tbt.toFixed(0)}</td>
                        <td>${m.cls.toFixed(3)}</td>
                        <td>${m.tps.toFixed(1)}</td>
                        <td>${m.failed ? 'Yes' : 'No'}</td>
                        <td>${m.failed && m.simulatedSnapshotDescription ? `<div class="snapshot">${m.simulatedSnapshotDescription}</div>` : 'N/A'}</td>
                    </tr>`;
                });
                html += `</table>`;
            } else {
                html += `<p>No detailed metrics recorded for this URL.</p>`;
            }
        }
    } else {
        html += `<p>No detailed URL metrics available.</p>`;
    }

    // Charts Placeholder (representing data as tables for now)
    html += `<h2>Performance Charts (Data Representation)</h2>`;
    html += `<p><em>Charts would be rendered here. Below is a tabular representation of some chart data.</em></p>`;
    // Example: Avg Load Time per URL (similar to what BarChart showed)
     if (detailedMetricsByUrl && Object.keys(detailedMetricsByUrl).length > 0) {
        html += `<h3>Average Load Time per URL Path</h3><table><tr><th>URL Path</th><th>Average Load Time (ms)</th></tr>`;
        for (const url in detailedMetricsByUrl) {
            const metrics = detailedMetricsByUrl[url] || [];
            const avgLoad = metrics.reduce((sum, m) => sum + m.loadTime, 0) / (metrics.length || 1);
            html += `<tr><td>${new URL(url).pathname}</td><td>${avgLoad.toFixed(0)}</td></tr>`;
        }
        html += `</table>`;
    }


    // Activity Log
    html += `<h2>Activity Log</h2><div>`;
    activityLog.forEach(log => {
      html += `<div class="log-entry ${log.type}"><strong>${new Date(log.timestamp).toLocaleTimeString()} [${log.type.toUpperCase()}]:</strong> ${log.message}</div>`;
    });
    html += `</div>`;

    html += `</div></body></html>`;
    return html;
  };

  const downloadHTMLReport = (htmlContent, filename = `performance-report-${Date.now()}.html`) => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const handleViewReport = (testId) => {
    const reportData = historicalTests.find(t => t.id === testId);
    if (reportData) {
      const reportHtml = generateReportHTML(reportData);
      downloadHTMLReport(reportHtml, `report-${testId}.html`);
      toast({ title: "Report Generated", description: `Report for ${testId} is downloading.` });
    } else {
      toast({ title: "Error", description: "Could not find report data.", variant: "destructive" });
    }
  };

  const handleSetBaseline = (testId) => {
    setSelectedBaseline(prev => prev === testId ? null : testId);
    toast({ title: "Baseline Selected", description: `Test ${testId} ${selectedBaseline === testId ? 'deselected' : 'selected'} as baseline.` });
  };

  const handleDeleteTest = (testId) => {
    // Basic confirmation before deleting
    if (confirm(`Are you sure you want to delete test run ${testId}? This action cannot be undone.`)) {
        setTestData(prev => ({
            ...prev,
            historicalTests: prev.historicalTests.filter(t => t.id !== testId)
        }));
        toast({ title: "Test Deleted", description: `Test run ${testId} has been removed from history.`, variant: "destructive" });
        if (selectedBaseline === testId) {
            setSelectedBaseline(null);
        }
    }
  };


  if (!historicalTests || historicalTests.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>Test History</CardTitle></CardHeader>
        <CardContent><p>No past test runs found. Complete a test to see its results here.</p></CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Test History</CardTitle>
                <CardDescription>Select tests to compare or view individual reports.</CardDescription>
            </div>
            <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => alert("Trend analysis feature coming soon!")} disabled={historicalTests.length < 2}>
                    <LucideLineChartIcon className="mr-2 h-4 w-4" /> Analyze Trends
                </Button>
                <Button variant="default" size="sm" onClick={handleCompareSelected} disabled={selectedForComparison.size < 2}>
                    <BarChart className="mr-2 h-4 w-4" /> Compare Selected ({selectedForComparison.size})
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm"> {/* shadcn like table */}
              <thead className="border-b dark:border-slate-700">
                <tr className="text-left">
                  <th className="p-2 font-semibold w-10">Select</th>
                  <th className="p-2 font-semibold">ID</th>
                  <th className="p-2 font-semibold">Release Tag</th>
                  <th className="p-2 font-semibold">Date</th>
                  <th className="p-2 font-semibold">Duration</th>
                  <th className="p-2 font-semibold">Status</th>
                  <th className="p-2 font-semibold">Avg. Load (ms)</th>
                  <th className="p-2 font-semibold">Requests</th>
                  <th className="p-2 font-semibold">Errors</th>
                  <th className="p-2 font-semibold text-center">Baseline</th>
                  <th className="p-2 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {historicalTests.slice().reverse().map(test => ( // Show newest first
                  <tr key={test.id} className={`border-b dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors ${selectedForComparison.has(test.id) ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}>
                    <td className="p-2 text-center">
                      <Checkbox // Using a simple input checkbox for mock
                        checked={selectedForComparison.has(test.id)}
                        onCheckedChange={() => handleToggleCompareSelection(test.id)}
                        id={`compare-${test.id}`}
                        aria-label={`Select test ${test.id} for comparison`}
                      />
                    </td>
                    <td className="p-2 truncate max-w-[100px]" title={test.id}>{test.id}</td>
                    <td className="p-2 truncate max-w-[100px]" title={test.config.releaseTag || 'N/A'}>{test.config.releaseTag || 'N/A'}</td>
                    <td className="p-2">{new Date(test.startTime).toLocaleString()}</td>
                    <td className="p-2">{new Date(test.durationSeconds * 1000).toISOString().substr(11, 8)}</td>
                    <td className="p-2">{test.status}</td>
                    <td className="p-2">{test.summaryMetrics?.overallAvgLoadTime?.toFixed(0) || 'N/A'}</td>
                    <td className="p-2">{test.summaryMetrics?.totalRequests || 'N/A'}</td>
                    <td className="p-2">{test.summaryMetrics?.totalErrors || 'N/A'}</td>
                    <td className="p-2 text-center">
                      <Switch
                          checked={selectedBaseline === test.id}
                          onCheckedChange={() => handleSetBaseline(test.id)}
                          id={`baseline-${test.id}`}
                          aria-label={`Set test ${test.id} as baseline`}
                      />
                    </td>
                    <td className="p-2 space-x-1 text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleViewReport(test.id)} title="View Report">
                        <FileText className="h-4 w-4" /> <span className="sr-only">View Report</span>
                      </Button>
                       <Button variant="ghost" size="icon" onClick={() => handleDeleteTest(test.id)} title="Delete Test" className="text-red-500 hover:text-red-700 dark:hover:text-red-400">
                          <Trash2 className="h-4 w-4" /> <span className="sr-only">Delete Test</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Simulated Ollama Service ---
const ollamaSimulator = {
  simulatePerformanceTest: (testConfigForUrl) => {
    return new Promise((resolve, reject) => {
      const {
        url, // Specific URL being tested
        concurrentUsers = 10,
        ollamaModel = 'llama2',
        simulateHeadlessMode = true,
        userPacing = 3, // seconds
      } = testConfigForUrl; // Should receive a subset of main testConfig relevant to a single URL + current load

      // Simulate network delay for the API call itself
      const apiCallDelay = 500 + Math.random() * 1000; // 0.5s to 1.5s

      setTimeout(() => {
        // Simulate overall success or failure of the "Ollama generation"
        if (Math.random() < 0.02) { // 2% chance of Ollama API error
          reject(new Error("Simulated Ollama API Error: Could not connect or internal server error."));
          return;
        }

        // Base metrics - these would be influenced by many factors in reality
        let baseLoadTime = 500 + Math.random() * 2000; // 0.5s to 2.5s
        let baseFcp = baseLoadTime * (0.2 + Math.random() * 0.3); // FCP is usually a fraction of LoadTime
        let baseLcp = baseLoadTime * (0.4 + Math.random() * 0.4); // LCP is also a fraction, often larger than FCP
        let baseTbt = 50 + Math.random() * 300; // Total Blocking Time
        let baseCls = Math.random() * 0.2; // Cumulative Layout Shift (0 to 0.2 is typical)

        // Influence by concurrent users
        const userLoadFactor = 1 + (concurrentUsers / 50); // Example: 50 users = 2x factor
        baseLoadTime *= userLoadFactor;
        baseFcp *= userLoadFactor;
        baseLcp *= userLoadFactor;
        baseTbt *= userLoadFactor;
        if (concurrentUsers > 30 && Math.random() < (concurrentUsers - 30) * 0.02) { // Higher chance of CLS issues with more users
            baseCls += Math.random() * 0.1 * userLoadFactor;
        }


        // Simulate page failure based on load or random chance
        let failed = false;
        // Higher load time increases failure chance, maxing out around 8-10s
        const failureChanceFromLoad = Math.max(0, (baseLoadTime - 3000) / 7000); // 0% at 3s, 100% at 10s
        if (Math.random() < (0.05 + failureChanceFromLoad * 0.5)) { // 5% base chance + load dependent chance
          failed = true;
        }

        let simulatedSnapshotDescription = null;
        if (failed && !simulateHeadlessMode) {
          simulatedSnapshotDescription = `Simulated snapshot for failed load of ${url} at ${new Date().toISOString()}. Conditions: ${concurrentUsers} users. Error: Load exceeded threshold or critical resource missing.`;
        }

        // If failed, metrics might be worse or partially missing (simplified here)
        if (failed) {
          baseLoadTime = Math.min(15000, baseLoadTime * (1.5 + Math.random())); // Much higher load time on failure
          baseFcp = simulateHeadlessMode ? baseLoadTime : baseFcp * (1.2 + Math.random()); // FCP might not be recorded if fully failed early
          baseLcp = simulateHeadlessMode ? baseLoadTime : baseLcp * (1.2 + Math.random());
          baseTbt = baseTbt * (1.5 + Math.random());
          baseCls = Math.min(1.0, baseCls + Math.random() * 0.3);
        }

        // TPS calculation is tricky for a single "page load" simulation.
        // Let's assume this represents the capacity observed during this "user's" interaction.
        // A more realistic TPS would come from an aggregation over time.
        // For now, simulate based on load time (inverse relationship, but capped)
        let tps = failed ? Math.random() * 10 : Math.max(5, 1000 / (baseLoadTime / concurrentUsers + userPacing * 1000) * concurrentUsers * (0.5 + Math.random()*0.5) );
        tps = Math.min(tps, 500 + Math.random() * concurrentUsers * 10); // Cap TPS somewhat

        const metrics = {
          url,
          timestamp: Date.now(),
          loadTime: parseFloat(baseLoadTime.toFixed(2)),
          fcp: parseFloat(baseFcp.toFixed(2)),
          lcp: parseFloat(baseLcp.toFixed(2)),
          tbt: parseFloat(baseTbt.toFixed(2)),
          cls: parseFloat(baseCls.toFixed(3)),
          tps: parseFloat(tps.toFixed(2)),
          // For min/max/avg time, these would typically be aggregated.
          // For a single data point, they are the same as loadTime.
          // In a real test, these would be calculated from multiple samples within an interval.
          // We will simulate this more realistically when aggregating.
          // For now, this is the "user's observed time".
          avgTime: parseFloat(baseLoadTime.toFixed(2)),
          minTime: parseFloat(baseLoadTime.toFixed(2)),
          maxTime: parseFloat(baseLoadTime.toFixed(2)),
          failed,
          simulatedSnapshotDescription,
          concurrentUsers // Record how many users were simulated for this data point
        };

        resolve(metrics);
      }, apiCallDelay);
    });
  }
};


// --- Tailwind CSS Configuration (Conceptual) ---
// In a real project, this would be in tailwind.config.js
// const tailwindConfig = {
//   darkMode: "class",
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter', 'sans-serif'],
//       },
//       colors: {
//         // ... shadcn/ui color palette would be defined here
//       },
//       keyframes: {
//          // ... shadcn/ui animations
//       },
//       animation: {
//          // ... shadcn/ui animations
//       }
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };

// --- Global CSS (Conceptual) ---
// In a real project, this would be in index.css or app.css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
//
// body {
//   font-family: 'Inter', sans-serif;
// }
//
// .dark body {
//    background-color: #0f172a; /* slate-900 */
//    color: #f8fafc; /* slate-50 */
// }

console.log("App.jsx loaded conceptually. Basic structure and mock imports are in place.");

// Helper function for class names, similar to clsx or tailwind-merge
// Moved to top for availability:
// const cn = (...classes) => classes.filter(Boolean).join(' ');
