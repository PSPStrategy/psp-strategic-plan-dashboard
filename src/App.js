import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LayoutDashboard, CheckCircle2, AlertTriangle, XCircle, ClipboardList, Info, BarChart, PieChart, Users, Target, Calendar, Printer, FileText } from 'lucide-react';

// --- Configuration for Google Sheets API ---
// Your Google Sheet ID is pre-filled here.
const SPREADSHEET_ID = '1Ei9pG3fdEjL2-2dD2LC6ywpvqS0yeZvHEMK2_ybRKDw';

// IMPORTANT: Service Account Credentials are loaded securely from Vercel Environment Variables.
// The environment variable name is GOOGLE_SERVICE_ACCOUNT_CREDENTIALS.
// It must contain the full JSON key string.
const SERVICE_ACCOUNT_CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);
// --- END Configuration ---

// List of owners provided by the user, sorted alphabetically, including TBD
const owners = [
  "Christina", "Daniel", "Ed", "Harman", "Harry", "Jacob", "Jason", "Jeremy",
  "Josue", "Nikki", "Ramon", "Ryan", "TBD", "Victoria", "Yaslin"
].sort();

// Helper function to parse Google Sheet data into the desired initiative structure
const parseSheetData = (values) => {
  if (!values || values.length < 2) {
    console.warn("No data or only header row found in Google Sheet.");
    return [];
  }

  const initiatives = [];

  // Skip header row (values[0]) and start from the first data row (values[1])
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const initiative = {};

    // Map sheet columns to initiative properties based on the CSV structure
    // Ensure these indices match your Google Sheet's column order
    initiative.priority = row[0] || 'N/A'; // Column A
    initiative.strategicGoal = row[1] || 'N/A'; // Column B
    initiative.name = row[2] || 'N/A'; // Column C
    initiative.timeline = row[3] || 'N/A'; // Column D
    initiative.fullTargets = row[4] || 'N/A'; // Column E (Full Targets)
    initiative.owner = row[5] || 'TBD'; // Column F
    initiative.status = row[6] || 'On Track'; // Column G

    // Parse Progress Updates (stored as JSON string in the sheet)
    try {
      // Ensure row[7] exists before attempting to parse
      initiative.progressUpdates = row[7] ? JSON.parse(row[7]) : []; // Column H
    } catch (e) {
      console.error("Error parsing progressUpdates JSON for row", i, ":", row[7], e);
      initiative.progressUpdates = []; // Default to empty array on error
    }

    // Simulate progress for milestones (this will still be random, as sheet doesn't provide it)
    const simulatedProgress = Math.floor(Math.random() * 90) + 10; // Random progress between 10% and 99%
    initiative.milestones = [
      `Progress: ${simulatedProgress}% Complete`,
      `Key Target: ${initiative.fullTargets.length > 80 ? initiative.fullTargets.substring(0, 80) + '...' : initiative.fullTargets}`,
    ];

    initiative.id = i; // Use row index as a simple ID for React keys
    initiatives.push(initiative);
  }
  return initiatives;
};

// Modal component for detailed initiative view (remains the same)
const InitiativeDetailModal = ({ initiative, onClose }) => {
  if (!initiative) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4"
         onClick={() => onClose()}>
      <div
        className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Info className="mr-2" />Initiative Details
        </h3>
        <p className="mb-2"><strong className="text-gray-700">Name:</strong> {initiative.name}</p>
        <p className="mb-2"><strong className="text-gray-700">Priority:</strong> {initiative.priority}</p>
        <p className="mb-2"><strong className="text-gray-700">Strategic Goal:</strong> {initiative.strategicGoal}</p>
        <p className="mb-2"><strong className="text-gray-700">Owner:</strong> {initiative.owner}</p>
        {initiative.department && <p className="mb-2"><strong className="text-gray-700">Department:</strong> {initiative.department}</p>}
        <p className="mb-2"><strong className="text-gray-700">Timeline:</strong> {initiative.timeline}</p>
        <p className="mb-2"><strong className="text-gray-700">Status:</strong> <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
          initiative.status === 'On Track' ? 'bg-green-100 text-green-800' :
          initiative.status === 'At Risk' ? 'bg-yellow-100 text-yellow-800' :
          initiative.status === 'Complete' ? 'bg-blue-100 text-blue-800' : // Assuming 'Complete' is blue
          'bg-gray-100 text-gray-800' // Default if status is unexpected
        }`}>{initiative.status}</span></p>
        <div className="mb-2">
          <strong className="text-gray-700 block mb-1">Major Milestones (Summary):</strong>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {initiative.milestones.map((m, idx) => <li key={idx}>{m}</li>)}
          </ul>
        </div>
        <div className="mb-4">
          <strong className="text-gray-700 block mb-1">Full Targets:</strong>
          <p className="text-gray-700 whitespace-pre-wrap">{initiative.fullTargets}</p>
        </div>

        {/* Progress Log - This section will only appear if progressUpdates is NOT empty */}
        {initiative.progressUpdates && initiative.progressUpdates.length > 0 && (
          <div className="mb-4 mt-6 border-t pt-4 border-gray-200">
            <strong className="text-gray-700 block mb-2 text-lg">Progress Log:</strong>
            <div className="space-y-3">
              {initiative.progressUpdates
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, newest first
                .map((update, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg shadow-sm text-sm text-gray-800">
                    <p className="font-semibold text-gray-600 mb-1">{update.date}:</p>
                    <p>{update.text}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={() => onClose()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// TimelineBar component (remains the same)
const parsePointInTime = (partStr) => {
  const match = partStr.match(/(\d{4})(?:-Q([1-4]))?/);
  if (match) {
    const year = parseInt(match[1], 10);
    const quarter = match[2] ? parseInt(match[2], 10) : null;
    return year + (quarter ? (quarter - 1) / 4 : 0);
  }
  return null;
};

const getExclusiveEndTime = (partStr) => {
  const match = partStr.match(/(\d{4})(?:-Q([1-4]))?/);
  if (match) {
    const year = parseInt(match[1], 10);
    const quarter = match[2] ? parseInt(match[2], 10) : null;
    if (quarter) {
      return year + quarter / 4;
    } else {
      return year + 1;
    }
  }
  return null;
};

const TimelineBar = ({ timeline }) => {
  const globalStartYear = 2025;
  const globalEndYear = 2029;
  const years = Array.from({ length: globalEndYear - globalStartYear + 1 }, (_, i) => globalStartYear + i);

  const parseTimelineRange = (timelineStr) => {
    const parts = timelineStr.split('-').map(p => p.trim());
    let startFloat, endFloat;

    if (parts.length === 1) {
      const initialParseTime = parsePointInTime(parts[0]);
      if (initialParseTime !== null) {
        startFloat = initialParseTime;
        if (!parts[0].includes('Q')) {
          endFloat = initialParseTime + 1/4;
        } else {
          endFloat = initialParseTime + 1/4;
        }
      } else {
        console.error("Invalid timeline string:", timelineStr);
        return { start: globalStartYear, end: globalStartYear + 1 };
      }
    } else {
      startFloat = parsePointInTime(parts[0]);
      endFloat = getExclusiveEndTime(parts[1]);

      if (startFloat === null || endFloat === null) {
        console.error("Invalid timeline string in range format:", timelineStr);
        return { start: globalStartYear, end: globalStartYear + 1 };
      }

      if (!parts[1].includes('Q')) {
          const endYearMatch = parts[1].match(/(\d{4})/);
          if (endYearMatch) {
              endFloat = parseInt(endYearMatch[1]) + 1/4;
          }
      }
    }

    return { start: startFloat, end: endFloat };
  };

  const { start: initiativeStart, end: initiativeEnd } = parseTimelineRange(timeline);

  return (
    <div className="flex items-center w-full max-w-sm h-9 bg-gray-100 rounded-md overflow-hidden border border-gray-300">
      {years.map(year => {
        const yearSegmentStart = year;
        const yearSegmentEnd = year + 1;

        const overlapStart = Math.max(initiativeStart, yearSegmentStart);
        const overlapEnd = Math.min(initiativeEnd, yearSegmentEnd);

        let fillWidthPercentage = 0;
        if (overlapEnd > overlapStart) {
          fillWidthPercentage = ((overlapEnd - overlapStart) / (yearSegmentEnd - yearSegmentStart)) * 100;
        }

        fillWidthPercentage = Math.max(0, Math.min(100, fillWidthPercentage));

        return (
          <div
            key={year}
            className="relative h-full flex-1 border-r border-gray-300 last:border-r-0 flex items-center justify-center"
            title={`${timeline}`}
          >
            <div
              className="absolute h-full bg-green-300 transition-all duration-300 ease-out"
              style={{ width: `${fillWidthPercentage}%`, left: '0', borderRadius: '2px' }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};


function App() {
  const [initiatives, setInitiatives] = useState([]); // Initialize as empty, data will be fetched
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOwner, setSelectedOwner] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentInitiative, setCurrentInitiative] = useState(null);

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Dynamically import google-auth-library to avoid issues with Vercel build
        // This is a common pattern for server-side dependencies in client-side apps
        // that are built by tools like Vercel.
        const { GoogleAuth } = await import('google-auth-library');
        const { google } = await import('googleapis');

        const auth = new GoogleAuth({
          credentials: SERVICE_ACCOUNT_CREDENTIALS,
          scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'], // Read-only scope
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Sheet1!A:H', // Adjust range if your data is in a different sheet/columns
        });

        const parsedData = parseSheetData(response.data.values);
        setInitiatives(parsedData);
      } catch (err) {
        console.error("Failed to fetch or parse Google Sheet data:", err);
        setError("Failed to load data from Google Sheet. Please check configuration and sheet access.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Optional: Set up an interval for automatic refresh (e.g., every 5 minutes)
    // const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    // return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Empty dependency array means this runs once on mount

  // Memoized values based on fetched initiatives
  const uniqueOwners = useMemo(() => ['All', ...new Set(owners)], []); // Use the pre-defined owners list
  const uniqueStatuses = useMemo(() => ['All', ...new Set(initiatives.map(i => i.status))], [initiatives]);
  const uniquePriorities = useMemo(() => ['All', ...new Set(initiatives.map(i => i.priority))], [initiatives]);

  const filteredInitiatives = useMemo(() => {
    return initiatives.filter(initiative => {
      const ownerMatch = selectedOwner === 'All' || initiative.owner === selectedOwner;
      const statusMatch = selectedStatus === 'All' || initiative.status === selectedStatus;
      const priorityMatch = selectedPriority === 'All' || initiative.priority === selectedPriority;
      return ownerMatch && statusMatch && priorityMatch;
    });
  }, [initiatives, selectedOwner, selectedStatus, selectedPriority]);

  const kpiData = useMemo(() => {
    const onTrackCount = initiatives.filter(i => i.status === 'On Track').length;
    const atRiskCount = initiatives.filter(i => i.status === 'At Risk').length;
    const completeCount = initiatives.filter(i => i.status === 'Complete').length;
    const totalInitiatives = initiatives.length; // Use length of all initiatives
    return { onTrackCount, atRiskCount, completeCount, totalInitiatives };
  }, [initiatives]);

  const priorityCardData = useMemo(() => {
    const data = {};
    uniquePriorities.filter(p => p !== 'All').forEach(priorityName => {
      const initiativesInPriority = initiatives.filter(i => i.priority === priorityName);
      const total = initiativesInPriority.length;
      const onTrack = initiativesInPriority.filter(i => i.status === 'On Track').length;
      const atRisk = initiativesInPriority.filter(i => i.status === 'At Risk').length;
      const complete = initiativesInPriority.filter(i => i.status === 'Complete').length;
      data[priorityName] = { total, onTrack, atRisk, complete };
    });
    return data;
  }, [initiatives, uniquePriorities]);


  const getStatusDisplay = (status) => {
    switch (status) {
      case 'On Track':
        return <CheckCircle2 className="text-green-500 inline-block mr-1" size={16} />;
      case 'At Risk':
        return <AlertTriangle className="text-yellow-500 inline-block mr-1" size={16} />;
      case 'Complete':
        return <XCircle className="text-blue-500 inline-block mr-1" size={16} />;
      default:
        return null;
    }
  };

  const handleRowClick = useCallback((initiative) => {
    setCurrentInitiative(initiative);
    setShowDetailModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowDetailModal(false);
    setCurrentInitiative(null);
  }, []);

  const handlePriorityCardClick = useCallback((priorityName) => {
    setSelectedPriority(priorityName);
    setSelectedOwner('All');
    setSelectedStatus('All');
  }, []);

  const timelineYears = Array.from({ length: 2029 - 2025 + 1 }, (_, i) => (2025 + i).toString().slice(-2));

  const escapeCsvField = (field) => {
    if (typeof field !== 'string') {
      field = String(field);
    }
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const exportToCsv = () => {
    const headers = [
      "Priority",
      "Strategic Goal",
      "Initiative",
      "Owner",
      "Timeline",
      "Status",
      "Full Targets",
      "Progress Updates"
    ];

    const csvRows = [];
    csvRows.push(headers.map(escapeCsvField).join(','));

    filteredInitiatives.forEach(initiative => {
      const progressUpdatesText = initiative.progressUpdates
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(update => `${update.date}: ${update.text}`)
        .join(' | ');

      const row = [
        initiative.priority,
        initiative.strategicGoal,
        initiative.name,
        initiative.owner,
        initiative.timeline,
        initiative.status,
        initiative.fullTargets,
        progressUpdatesText
      ].map(escapeCsvField);
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'strategic_initiatives_dashboard.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 md:p-8">
      {/* Print-specific styles */}
      <style>
        {`
        @media print {
          /* Hide elements not needed in print snapshot */
          #filters-section,
          #initiatives-table-section,
          .no-print {
            display: none !important;
          }
          /* Adjust header for print */
          header {
            padding: 1rem !important;
            margin-bottom: 1rem !important;
          }
          header h1 {
            font-size: 1.5rem !important;
          }
          /* Ensure other sections are visible and layout correctly */
          #kpi-summary-section,
          #priority-cards-section {
            display: block !important;
            page-break-after: auto;
          }
          #priority-cards-section .grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
            gap: 1rem !important;
          }
          /* Adjust card content for readability on print */
          #priority-cards-section h3 {
            font-size: 1rem !important;
          }
          #priority-cards-section p {
            font-size: 0.75rem !important;
          }
        }
        `}
      </style>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg mb-8 flex items-center justify-between flex-wrap relative">
        <div className="flex items-center">
          <LayoutDashboard className="w-10 h-10 mr-4" />
          <h1 className="text-3xl sm:text-4xl font-bold">
            Palm Springs International Airport
            <span className="block text-xl sm:text-2xl font-semibold mt-1">2025-2029 Strategic Plan</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          {/* QR Code section updated with the new image file name and Microsoft Forms URL */}
          <div className="relative flex flex-col items-center">
            <a href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=r5uQzsNHhUKxGbME-yzjx_gdsBmdLhdKtbocasoI3XBUMDk1SVhYVDJHSjYwTzM2S1QyQUg1VTRXVi4u" target="_blank" rel="noopener noreferrer">
              <img
                src="/QRCode for PSP Flight Path Updates Small.jpeg" // Path to the uploaded QR code image
                alt="QR Code for PSP Flight Path Updates"
                className="rounded-lg shadow-md hover:opacity-80 transition-opacity duration-200 w-16 h-16" // Added w-16 h-16 for smaller size
              />
            </a>
            <p className="text-xs text-center mt-1 opacity-80">Scan for Flight Path Updates</p>
          </div>
          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="no-print bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-150 ease-in-out flex items-center"
          >
            <Printer className="mr-2" size={20} /> Print Snapshot
          </button>
        </div>
      </header>

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center p-8 text-lg font-semibold text-blue-600">
          Loading strategic plan data...
        </div>
      )}
      {error && (
        <div className="text-center p-8 text-lg font-semibold text-red-600">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Global KPI Summary Section */}
          <section id="kpi-summary-section" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Total Initiatives</h3>
                <p className="text-4xl font-bold text-gray-900">{kpiData.totalInitiatives}</p>
              </div>
              <LayoutDashboard className="text-blue-500 opacity-50 w-12 h-12" />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">On Track</h3>
                <p className="text-4xl font-bold text-green-600">{kpiData.onTrackCount}</p>
              </div>
              <CheckCircle2 className="text-green-500 opacity-50 w-12 h-12" />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">At Risk</h3>
                <p className="text-4xl font-bold text-yellow-600">{kpiData.atRiskCount}</p>
              </div>
              <AlertTriangle className="text-yellow-500 opacity-50 w-12 h-12" />
            </div>
          </section>

          {/* Prioritized Card View Section (New Main Summary) */}
          <section id="priority-cards-section" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"><Target className="mr-2" />Strategic Priorities at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {uniquePriorities.filter(p => p !== 'All').map((priorityName, index) => (
                <div
                  key={priorityName}
                  className={`bg-white p-6 rounded-xl shadow-md border-t-4
                    ${index === 0 ? 'border-purple-500' :
                      index === 1 ? 'border-sky-500' :
                      index === 2 ? 'border-orange-500' :
                      index === 3 ? 'border-emerald-500' :
                      'border-rose-500'}
                    hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer`}
                  onClick={() => handlePriorityCardClick(priorityName)}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{priorityName}</h3>
                  <p className="text-sm text-gray-600 mb-3">Total Initiatives: <span className="font-semibold ml-1">{priorityCardData[priorityName]?.total || 0}</span></p>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700 flex items-center">
                      <CheckCircle2 className="text-green-500 mr-2" size={18} />
                      On Track: <span className="font-semibold ml-1">{priorityCardData[priorityName]?.onTrack || 0}</span>
                    </p>
                    <p className="text-sm text-gray-700 flex items-center">
                      <AlertTriangle className="text-yellow-500 mr-2" size={18} />
                      At Risk: <span className="font-semibold ml-1">{priorityCardData[priorityName]?.atRisk || 0}</span>
                    </p>
                    <p className="text-sm text-gray-700 flex items-center">
                      <XCircle className="text-blue-500 mr-2" size={18} />
                      Complete: <span className="font-semibold ml-1">{priorityCardData[priorityName]?.complete || 0}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Filters and Initiatives Table */}
          <section id="filters-and-table-section" className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {/* Filters Card */}
            <div id="filters-section" className="bg-white p-6 rounded-xl shadow-md lg:col-span-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"><ClipboardList className="mr-2" />Filter Initiatives</h2>
              <div className="mb-4">
                <label htmlFor="priorityFilter" className="block text-gray-700 text-sm font-medium mb-2">Filter by Priority:</label>
                <select
                  id="priorityFilter"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  {uniquePriorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="ownerFilter" className="block text-gray-700 text-sm font-medium mb-2">Filter by Owner:</label>
                <select
                  id="ownerFilter"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                >
                  {uniqueOwners.map(owner => (
                    <option key={owner} value={owner}>{owner}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="statusFilter" className="block text-gray-700 text-sm font-medium mb-2">Filter by Status:</label>
                <select
                  id="statusFilter"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Initiatives Table */}
            <div id="initiatives-table-section" className="lg:col-span-3 xl:col-span-4 bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center"><Calendar className="mr-2" />Initiatives Overview</h2>
                <button
                  onClick={exportToCsv}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-150 ease-in-out flex items-center text-sm no-print"
                >
                  <FileText className="mr-2" size={18} /> Export to Excel
                </button>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strategic Goal</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initiative</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                        Timeline
                        <div className="flex justify-between mt-1 px-1 text-[0.6rem] font-bold text-gray-600">
                          {timelineYears.map(year => <span key={year}>'{year}</span>)}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInitiatives.length > 0 ? (
                      filteredInitiatives.map((initiative) => (
                        <tr key={initiative.id} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer" onClick={() => handleRowClick(initiative)}>
                          <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                            {initiative.priority}
                          </td>
                          <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                            {initiative.strategicGoal}
                          </td>
                          <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
                            {initiative.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {initiative.owner}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <TimelineBar timeline={initiative.timeline} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                              {getStatusDisplay(initiative.status)} {initiative.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          No initiatives match the selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Palm Springs International Airport. All rights reserved.</p>
      </footer>

      {/* Initiative Detail Modal */}
      {showDetailModal && <InitiativeDetailModal initiative={currentInitiative} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;