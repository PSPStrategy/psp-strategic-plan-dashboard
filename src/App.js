
 import React, { useState, useMemo } from 'react';
import { LayoutDashboard, CheckCircle2, AlertTriangle, XCircle, ClipboardList, Info, BarChart, PieChart, Users, Target, Calendar, Printer, FileText } from 'lucide-react';

// Consolidated Strategic Plan Data (remains outside for initial data definition)
const strategicPlan = [
  {
    priorityName: "People and Culture",
    strategicGoals: [
      {
        goalName: "Expand Workforce",
        initiatives: [
          {
            name: "Coordinate with City leadership to achieve workforce capacity required",
            timeline: "2025-2026",
            targets: "18 additional custodial and maintenance, engineering, and innovation technology staff hired and onboarded by end of FY2026",
          },
          {
            name: "Heighten awareness of aviation and increase local talent pool by co-creating Airport Operations and Management program (with internships) at College of the Desert and through Coachella Valley high schools",
            timeline: "2025-2026",
            targets: "5 College of the Desert graduates and 5 local high school graduates as Interns and full-time employees by 2026",
          },
        ]
      },
      {
        goalName: "Strengthen Work Culture and Employee Engagement",
        initiatives: [
          {
            name: "Develop and commit to annual staff work culture survey and post-results town hall style discussion",
            timeline: "2025-2029",
            targets: "Launch survey and town hall in 2025, 100% completion of survey by 2026, 85% staff satisfaction rating by 2027, 90% by 2028, 95% by 2029",
          },
          {
            name: "Organization-wide launch of employee feedback tools",
            timeline: "2025", // This should now represent Q1 2025
            targets: "Launch Q1 2025",
          },
          {
            name: "Town hall style Strategic Plan Launch to empower all employees to own the new vision, mission and values while protecting work-life balance",
            timeline: "2025-2026", // This should now represent 2025 to Q1 2026
            targets: "Year recap session Q4 2025, Q1 2026 review of Plan achievements",
          },
        ]
      },
      {
        goalName: "Increase Training and Development",
        initiatives: [
          {
            name: "Formalize and launch standardized career and development plan, and mentorship plan, for all employees",
            timeline: "2025-Q2 2026",
            targets: "Plan in place by Q2, 2026",
          },
          {
            name: "Expand Intro to Operations program for all program areas to engage employees in new learning opportunities",
            timeline: "2025-2029",
            targets: "Plan in place by Q3, 2025 with dedicated program support annually",
          },
          {
            name: "Expand airport-paid training opportunities and formalize applications through staff mentors",
            timeline: "2025-2029",
            targets: "Plan in place by Q2, 2025 with dedicated program support annually",
          },
        ]
      },
      {
        goalName: "Champion Diversity, Equity and Inclusion",
        initiatives: [
          {
            name: "Standardize DEI approach with City HR team to ensure PSP is attracting a fully diverse candidate range for job postings",
            timeline: "2025-2029",
            targets: "Approach standardized by Q2",
          },
          {
            name: "Identify barriers to success and pathways to encourage and support under-represented employees to train for and take on supervisory/management roles",
            timeline: "2025-2029",
            targets: "Plan in place by Q2, 2025 with dedicated program support annually",
          },
        ]
      },
    ]
  },
  {
    priorityName: "Operational Excellence",
    strategicGoals: [
      {
        goalName: "Ensure Safe and Effective Operations",
        initiatives: [
          {
            name: "Design and implement a comprehensive and integrated operational framework that holistically sets out effective and efÏcient processes, procedures and actions",
            timeline: "2025-2029",
            targets: "Framework developed and created by Q4, 2025. Annual assessments and refinements conducted by Q2 each year",
          },
          {
            name: "Develop Operational Readiness, Activation and Transition (ORAT) program to ensure construction of new infrastructure becomes an immediate asset and value-add to PSP operations",
            timeline: "2025-2029",
            targets: "Develop between 2025–2006 and implement by Q2, 2027",
          },
          {
            name: "Develop and launch a formal Safety Management System (SMS) program to ensure ongoing safety policies, procedures and actions remain embedded in all of PSP’s operations",
            timeline: "2025-Q2 2027",
            targets: "Create program for launch by Q3, 2025, with full implementation by Q2, 2026",
          },
          {
            name: "Complete general assessments of current operations and safety practices at PSP",
            timeline: "2025-Q2 2026",
            targets: "Assessment program completion by Q4, 2025. Launch implementation of recommendations by Q2, 2026",
          },
          {
            name: "Create and deploy standardized training and procedures for operations and safety programs at PSP",
            timeline: "2025-Q2 2026",
            targets: "Develop training modules and operational modules by Q2, 2025. Annual assessments and refinements conducted by Q2 each year",
          },
        ]
      },
      {
        goalName: "Deliver an Unforgettable Guest Experience",
        initiatives: [
          {
            name: "Develop and launch ongoing integrated consumer research and guest experience development programs at PSP",
            timeline: "2025-2029",
            targets: "Guest research and experience development programs designed and implemented by Q2, 2026. Annual assessments and refinements conducted by Q2 each year",
          },
          {
            name: "Design and implement guest experience consultations and co-ordinated and consistent end-to-end service practices and approaches with all airport campus partners",
            timeline: "2025-2029",
            targets: "Launch consultations with airport partners throughout 2025. Set up a multi-partner Team PSP Guest Experience Steering Group in Q1, 2026 to develop consistent and exceptional service standards and programs throughout all organizations. Annual assessments and refinements conducted in Q4 each year",
          },
          {
            name: "Plan, track, attain and maintain high levels of guest satisfaction and seamless wayfinding standards throughout airport construction program",
            timeline: "2025-2029",
            targets: "Design consistent high-impact storyboards on PSP’s future by Q2, 2025. Implement as required. Attain 85% satisfaction rates for guest experience and ease of wayfinding through regular guest surveys. Continue to address and continue to reduce the number of complaints received",
          },
        ]
      },
      {
        goalName: "Leverage Innovation and Technology",
        initiatives: [
          {
            name: "Incorporate newer established technology at parking lots, and passenger and employee checkpoints to increase efÏciency and throughput",
            timeline: "2025-2029",
            targets: "New checkpoint technology introduced by Q3, 2025, and fully integrated by Q1, 2026. Annual assessments and refinements by Q4 each year",
          },
          {
            name: "Develop and introduce digitization pilot programs (such as AI, Augmented Reality etc.) to assess impacts on guest experience and operational effectiveness",
            timeline: "2025-2029",
            targets: "Pilot program introduction by 2026, with annual assessment and refinements by Q4 each year.",
          },
          {
            name: "Introduce a new state-of-the-art security system (CCTV, intrusion detection, etc.) to maintain the integrity of airport facilities and operations",
            timeline: "2025-2029",
            targets: "New security system introduced by Q4, 2025, with full implementation by Q3, 2026. Annual assessments and refinements by Q4 each year.",
          },
        ]
      },
    ]
  },
  {
    priorityName: "Partnerships",
    strategicGoals: [
      {
        goalName: "Develop and Launch a Partnership Engagement Program",
        initiatives: [
          {
            name: "Organize quarterly meetings with each key airport partner group to discuss shared goals, challenges, and opportunities for improvement",
            timeline: "2025-2029",
            targets: "Launch cycle of structured and formalized airport partner meetings every quarter by Q2, 2025, and continue schedule through 2029",
          },
          {
            name: "Create and launch a digital platform where partners can access resources, operational updates, and tools for collaboration",
            timeline: "2025-2029",
            targets: "Digital web-page platform (ProgressPSP.com) designed and rolled-out by Q2, 2026, and is maintained and enhanced each year",
          },
          {
            name: "Implement feedback mechanisms, including bi-annual surveys and focus groups, to gather input and address partner needs proactively",
            timeline: "Q3 2025, Q3 2026",
            targets: "Program launch in Q3, 2025 and, repeated in 2027 and 2029",
          },
        ]
      },
      {
        goalName: "Create Revenue Diversification Through Strategic Partnerships",
        initiatives: [
          {
            name: "Develop comprehensive revenue-sharing agreements with concessionaires and service providers",
            timeline: "2025-2029",
            targets: "Convert most promising partnership engagement program outcomes into 3 pilot revenue-sharing agreements between 2025 and 2029",
          },
          {
            name: "Establish new business development opportunities through ongoing joint ventures",
            timeline: "2025-2029",
            targets: "Convert most promising partnership engagement program outcomes into 2 pilot joint venture agreements between 2025 and 2029",
          },
          {
            name: "Create innovative sponsorship and advertising programs",
            timeline: "2025-2028",
            targets: "Design multi-year sponsorship and advertising packages by Q1, 2026 and assess ROI through 2027 and 2028",
          },
        ]
      },
      {
        goalName: "Formalize Collaboration with Local Government and Community Groups",
        initiatives: [
          {
            name: "Develop an annual report highlighting PSP’s contributions to the local economy, job creation, and tourism, and share it with community stakeholders",
            timeline: "2025-2029",
            targets: "Report broadcast by Q1 each year, with reviews and refinements annually",
          },
          {
            name: "Encourage local and small business entities to participate in PSP’s operations, by conducting semi-annual outreach, particularly in concessions, events, and sustainability initiatives",
            timeline: "2025-2029",
            targets: "Design and launch community outreach program in 2025, and expand program each year",
          },
          {
            name: "Host annual roundtable events for local government and community representatives to discuss shared goals, such as community economic development, tourism promotion and infrastructure projects.",
            timeline: "2025-2029",
            targets: "Design and implement annual roundtable events by Q4, 2025 and commit to annual frequency through to 2029",
          },
        ]
      },
    ]
  },
  {
    priorityName: "Infrastructure",
    strategicGoals: [
      {
        goalName: "Implement a Strategic Capital Improvement Planning (CIP) Framework",
        initiatives: [
          {
            name: "Develop a 5-year capital budget that forecasts funding needs and allocates resources based on project urgency, ROI, and alignment with strategic priorities",
            timeline: "2025-2029",
            targets: "5-year capital budget delivered by Q2, 2025. Annual assessment and refinements conducted by Q2 of each subsequent year",
          },
          {
            name: "Design and Implement an infrastructure scoring system to evaluate projects based on factors such as impact on passenger throughput and guest experience, regulatory compliance, and long-term operational benefits",
            timeline: "2025-2029",
            targets: "Infrastructure scoring system and evaluation process developed and launched by Q3, 2025. Annual review and refinements conducted by Q2 of each subsequent year",
          },
          {
            name: "Regularly assess progress on infrastructure planning and make necessary adjustments based on evolving priorities or unexpected changes",
            timeline: "2025-2029",
            targets: "Comprehensive quarterly assessment program established by Q3, 2025. Annual program review and refinements conducted by Q2 of each subsequent year",
          },
        ]
      },
      {
        goalName: "Enable New Air Services and Other Key Business Development Opportunities",
        initiatives: [
          {
            name: "Enable expanded international air service development by establishing Federal Inspection Services facilities and Customs and Border Protection personnel at PSP",
            timeline: "2025-2029",
            targets: "FIS facilities and CBP presence established by Q1, 2027 Year-round non-stop service to Chicago, Atlanta or New York by Q1, 2027 Expand international service to secondary Canadian non-preclearance cities and establish 1 new route to a Mexican destination by Q1, 2028 3% annual passenger growth and establish infrastructure strategy for cargo growth by Q1, 2027",
          },
          {
            name: "Pursue and maximize air service development opportunities for PSP in passenger and cargo markets (routes, route capacity, frequency, competition/customer choice)",
            timeline: "2025-Q1 2027",
            targets: "Business plan developed and implemented by Q4, 2025 Facility plan developed and implemented by Q4, 2025",
          },
          {
            name: "Maximize non-aeronautical revenue opportunities for the community’s asset through an aligned airport-wide business plan and facility development plan (e.g. for Parking, Consolidated Rent-A-Car facility, Concessions and Other Services)",
            timeline: "2025-Q4 2025",
            targets: "Business plan developed and implemented by Q4, 2025",
          },
        ]
      },
      {
        goalName: "Effective and EfÏcient Program Delivery",
        initiatives: [
          {
            name: "Build and implement program for the successful management and maintenance of facilities throughout facility expansion and construction phasing",
            timeline: "2025-Q4 2025",
            targets: "Program built and launched by Q3, 2025",
          },
          {
            name: "Secure and deploy executive management consultant to support the implementation of the: capital program; expansion and construction sequencing; and the organizational strategy",
            timeline: "2025-2029",
            targets: "Executive management consultant retained by Q1, 2025. Overarching program plan developed and launched by Q3, 2025. Annual review and refinements conducted by Q2 of each subsequent year",
          },
        ]
      },
    ]
  },
  {
    priorityName: "Sustainability",
    strategicGoals: [
      {
        goalName: "Establish a PSP Sustainability & Resiliency OfÏce",
        initiatives: [
          {
            name: "Hire and onboard a PSP Sustainability Specialist",
            timeline: "Q2 2025",
            targets: "Sustainability Specialist onboard by Q2, 2025",
          },
          {
            name: "Conduct a detailed assessment of all current organizational and airport management activities and, create a holistic action plan to adopt sustainable operating practices",
            timeline: "2025-Q1 2026",
            targets: "Sustainability action plan launched Q1, 2026",
          },
          {
            name: "Create a comprehensive recycling program throughout PSP",
            timeline: "2025 - Q1 2026",
            targets: "Phase 1 of airport recycling program launched by Q3, 2025 Phase 2 of airport recycling program launched by Q1, 2026",
          },
          {
            name: "Transition to renewable energy sources in alignment with City, state and federal climate goals",
            timeline: "2025-Q1 2029",
            targets: "Ensure complete alignment with established local, state and federal renewable energy targets by Q1, 2029",
          },
          {
            name: "Establish Airport Council International –North America’s Carbon Reduction Accreditation Program at PSP",
            timeline: "2025-2029",
            targets: "Achieve Level 1 Program status by 2026 and Level 2 Program status by 2029",
          },
        ]
      },
      {
        goalName: "Develop a Net Zero Emissions Strategy",
        initiatives: [
          {
            name: "Establish and implement net-zero carbon, energy and waste frameworks within organization",
            timeline: "2025-Q1 2027",
            targets: "Net-zero carbon, energy and waste frameworks completed by Q1, 2026 Program implemented by Q2, 2026 Program assessed, enhanced and fully embedded annually by Q1, 2027",
          },
          {
            name: "Identify and implement joint or supportive net-zero emissions strategies with key PSP stakeholder groups",
            timeline: "2025-2029",
            targets: "PSP & Stakeholder Co-operative Net Zero Emissions Strategy Assessment completed by Q3, 2026 Program implemented by Q1, 2027 and assessed and refined annually",
          },
          {
            name: "Develop and implement lease and use agreements that jointly reduce climate impacts and improve climate action goals",
            timeline: "2025-2029",
            targets: "New lease and use agreements developed by Q4, 2025 Program implemented by Q1, 2026 and assessed and refined annually",
          },
        ]
      },
      {
        goalName: "Strengthen Financial Sustainability",
        initiatives: [
          {
            name: "Conduct and communicate an annual financial assessment of market conditions and related sustainability implications",
            timeline: "2025-2029",
            targets: "First financial assessment report developed and broadcast by Q2, 2025. Report reviewed and refined annually",
          },
          {
            name: "Develop policies and programs for fiscal management that track and report on both climate and operating impacts",
            timeline: "2025-2029",
            targets: "Introduce policy and program refinements to fiscal management area by Q2, 2026. Review and refine annually",
          },
        ]
      },
    ]
  },
];

// List of owners provided by the user, sorted alphabetically, including TBD
const owners = [
  "Christina", "Daniel", "Ed", "Harman", "Harry", "Jacob", "Jason", "Jeremy",
  "Josue", "Nikki", "Ramon", "Ryan", "TBD", "Victoria", "Yaslin"
].sort();


// Helper function to flatten the strategic plan into the initiative structure
const flattenStrategicPlan = (plan) => {
  const initiatives = [];
  let idCounter = 1;
  const statuses = ['On Track', 'At Risk', 'Complete'];

  plan.forEach(priority => {
    priority.strategicGoals.forEach(goal => {
      goal.initiatives.forEach(initiative => {
        // Simulate progress for milestones
        const simulatedProgress = Math.floor(Math.random() * 90) + 10; // Random progress between 10% and 99%

        initiatives.push({
          id: idCounter++,
          name: initiative.name,
          owner: "TBD", // Assign "TBD" as the default owner for all initiatives
          priority: priority.priorityName,
          timeline: initiative.timeline,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          // Refined milestones for the table view
          milestones: [
            `Progress: ${simulatedProgress}% Complete`,
            `Key Target: ${initiative.targets.length > 80 ? initiative.targets.substring(0, 80) + '...' : initiative.targets}`,
          ],
          strategicGoal: goal.goalName,
          fullTargets: initiative.targets, // Store full targets for detailed view in modal
          updates: [], // Initialize an empty array for updates
        });
      });
    });
  });
  return initiatives;
};

// Initialize initiatives with updates array
const initialInitiativesWithUpdates = flattenStrategicPlan(strategicPlan);


// Modal component for detailed initiative view
// Added onSaveUpdate prop to allow passing updates back to parent
const InitiativeDetailModal = ({ initiative, onClose, onSaveUpdate }) => {
  // Use local state for the initiative being edited within the modal
  const [currentInitiativeData, setCurrentInitiativeData] = useState(initiative);
  const [newUpdateText, setNewUpdateText] = useState('');

  // Handle adding a new update
  const handleAddUpdate = () => {
    if (newUpdateText.trim()) {
      const timestamp = new Date().toLocaleString(); // Get current date and time
      setCurrentInitiativeData(prevData => ({
        ...prevData,
        updates: [...prevData.updates, { text: newUpdateText.trim(), timestamp: timestamp }]
      }));
      setNewUpdateText(''); // Clear the input field after adding
    }
  };

  // Override onClose to save updates before closing
  const handleClose = () => {
    onSaveUpdate(currentInitiativeData); // Pass the updated initiative data back
    onClose(); // Then close the modal
  };

  if (!currentInitiativeData) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4"
         onClick={handleClose}> {/* Close modal on overlay click */}
      <div
        className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent clicks on modal content from closing
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Info className="mr-2" />Initiative Details
        </h3>
        <p className="mb-2"><strong className="text-gray-700">Name:</strong> {currentInitiativeData.name}</p>
        <p className="mb-2"><strong className="text-gray-700">Priority:</strong> {currentInitiativeData.priority}</p>
        <p className="mb-2"><strong className="text-gray-700">Strategic Goal:</strong> {currentInitiativeData.strategicGoal}</p>
        <p className="mb-2"><strong className="text-gray-700">Owner:</strong> {currentInitiativeData.owner}</p>
        {currentInitiativeData.department && <p className="mb-2"><strong className="text-gray-700">Department:</strong> {currentInitiativeData.department}</p>}
        <p className="mb-2"><strong className="text-gray-700">Timeline:</strong> {currentInitiativeData.timeline}</p>
        <p className="mb-2"><strong className="text-gray-700">Status:</strong> <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
          currentInitiativeData.status === 'On Track' ? 'bg-green-100 text-green-800' :
          currentInitiativeData.status === 'At Risk' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>{currentInitiativeData.status}</span></p>
        <div className="mb-2">
          <strong className="text-gray-700 block mb-1">Major Milestones (Summary):</strong>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {currentInitiativeData.milestones.map((m, idx) => <li key={idx}>{m}</li>)}
          </ul>
        </div>
        <div className="mb-4">
          <strong className="text-gray-700 block mb-1">Full Targets:</strong>
          <p className="text-gray-700 whitespace-pre-wrap">{currentInitiativeData.fullTargets}</p>
        </div>

        {/* NEW: Updates Section */}
        <div className="mb-4 border-t pt-4 mt-4">
          <strong className="text-gray-700 block mb-2">Updates:</strong>
          {currentInitiativeData.updates.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
              {currentInitiativeData.updates.map((update, idx) => (
                <li key={idx} className="bg-gray-50 p-2 rounded-md">
                  <span className="font-semibold text-gray-600 mr-2">[{update.timestamp}]</span>
                  {update.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No updates yet.</p>
          )}

          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows="3"
              placeholder="Add a new update..."
              value={newUpdateText}
              onChange={(e) => setNewUpdateText(e.target.value)}
            ></textarea>
            <button
              onClick={handleAddUpdate}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out text-sm"
            >
              Add Update
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


function App() {
  // Initialize initiatives state using a functional update to ensure it's only set once
  const [initiatives, setInitiatives] = useState(() => initialInitiativesWithUpdates);
  const [selectedOwner, setSelectedOwner] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentInitiative, setCurrentInitiative] = useState(null);

  // Derive totalInitiatives and totalPriorities using useMemo inside the component
  // This ensures they are always calculated based on the current state of 'initiatives'
  const totalInitiatives = useMemo(() => initiatives.length, [initiatives]);
  const totalPriorities = useMemo(() => strategicPlan.length, [strategicPlan]); // strategicPlan is a constant, but good practice to memoize if it were to change

  // DEBUGGING: Add a console log to confirm totalInitiatives is defined here
  console.log("App component rendering. totalInitiatives:", totalInitiatives);


  const uniqueOwners = useMemo(() => ['All', ...owners], []);
  const uniqueStatuses = useMemo(() => ['All', ...new Set(initialInitiativesWithUpdates.map(i => i.status))], []);
  const uniquePriorities = useMemo(() => ['All', ...new Set(strategicPlan.map(p => p.priorityName))], []);

  // Function to handle saving updates from the modal back to the main state
  const handleSaveInitiativeUpdate = (updatedInitiative) => {
    setInitiatives(prevInitiatives =>
      prevInitiatives.map(init =>
        init.id === updatedInitiative.id ? updatedInitiative : init
      )
    );
  };

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
    return { onTrackCount, atRiskCount, completeCount };
  }, [initiatives]);

  const priorityCardData = useMemo(() => {
    const data = {};
    strategicPlan.forEach(priority => {
      const initiativesInPriority = initiatives.filter(i => i.priority === priority.priorityName);
      const total = initiativesInPriority.length;
      const onTrack = initiativesInPriority.filter(i => i.status === 'On Track').length;
      const atRisk = initiativesInPriority.filter(i => i.status === 'At Risk').length;
      const complete = initiativesInPriority.filter(i => i.status === 'Complete').length;
      data[priority.priorityName] = { total, onTrack, atRisk, complete };
    });
    return data;
  }, [initiatives]);

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

  const handleRowClick = (initiative) => {
    console.log("Row clicked. Opening modal for:", initiative.name);
    setCurrentInitiative(initiative);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    console.log("handleCloseModal called. Setting showDetailModal to false and clearing current initiative.");
    setShowDetailModal(false);
    setCurrentInitiative(null);
  };

  const handlePriorityCardClick = (priorityName) => {
    setSelectedPriority(priorityName);
    setSelectedOwner('All');
    setSelectedStatus('All');
  };

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
      "Updates" // Added Updates header for CSV
    ];

    const csvRows = [];
    csvRows.push(headers.map(escapeCsvField).join(','));

    filteredInitiatives.forEach(initiative => {
      const row = [
        initiative.priority,
        initiative.strategicGoal,
        initiative.name,
        initiative.owner,
        initiative.timeline,
        initiative.status,
        initiative.fullTargets,
        initiative.updates.map(u => `[${u.timestamp}] ${u.text}`).join(' | ') // Join updates for CSV
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
          {/* DEBUGGING TAG: This will confirm if the latest code is deployed */}
          <span className="ml-4 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">-- DEBUG VERSION --</span>
        </div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          {/* QR Code section updated with actual QR code image and Microsoft Forms URL */}
          <div className="relative flex flex-col items-center">
            <a href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=r5uQzsNHhUKxGbME-yzjx_gdsBmdLhdKtbocasoI3XBUMDk1SVhYVDJHSjYwTzM2S1QyQUg1VTRXVi4u" target="_blank" rel="noopener noreferrer">
              <img
                src="/QRCode for PSP Flight Path Updates.jpg" // Path to the uploaded QR code image
                alt="QR Code for PSP Flight Path Updates"
                className="rounded-lg shadow-md hover:opacity-80 transition-opacity duration-200"
              />
            </a>
            <p className="text-xs text-center mt-1 opacity-80">Scan for Flight Path Updates</p>
          </div>
          {/* Print Button */}
          <button
            onClick={() => {
              console.log("Print button clicked!");
              window.print();
            }}
            className="no-print bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-150 ease-in-out flex items-center"
          >
            <Printer className="mr-2" size={20} /> Print Snapshot
          </button>
        </div>
      </header>

      {/* Global KPI Summary Section */}
      <section id="kpi-summary-section" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Initiatives</h3>
            <p className="text-4xl font-bold text-gray-900">{totalInitiatives}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-5 gap-6">
          {strategicPlan.map((priority, index) => (
            <div
              key={priority.priorityName}
              className={`bg-white p-6 rounded-xl shadow-md border-t-4
                ${index === 0 ? 'border-purple-500' :
                  index === 1 ? 'border-sky-500' :
                  index === 2 ? 'border-orange-500' :
                  index === 3 ? 'border-emerald-500' :
                  'border-rose-500'}
                hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer`}
              onClick={() => handlePriorityCardClick(priority.priorityName)}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{priority.priorityName}</h3>
              <p className="text-sm text-gray-600 mb-3">Total Initiatives: <span className="font-semibold ml-1">{priorityCardData[priority.priorityName]?.total || 0}</span></p>
              <div className="space-y-1">
                <p className="text-sm text-gray-700 flex items-center">
                  <CheckCircle2 className="text-green-500 mr-2" size={18} />
                  On Track: <span className="font-semibold ml-1">{priorityCardData[priority.priorityName]?.onTrack || 0}</span>
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                  <AlertTriangle className="text-yellow-500 mr-2" size={18} />
                  At Risk: <span className="font-semibold ml-1">{priorityCardData[priority.priorityName]?.atRisk || 0}</span>
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                  <XCircle className="text-blue-500 mr-2" size={18} />
                  Complete: <span className="font-semibold ml-1">{priorityCardData[priority.priorityName]?.complete || 0}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters and Initiatives Table */}
      <section id="filters-and-table-section" className="grid grid-cols-1 lg:grid-cols-4 xl:col-span-5 gap-6 mb-8">
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

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Palm Springs International Airport. All rights reserved.</p>
      </footer>

      {/* Initiative Detail Modal */}
      {showDetailModal && <InitiativeDetailModal initiative={currentInitiative} onClose={handleCloseModal} onSaveUpdate={handleSaveInitiativeUpdate} />}
    </div>
  );
}

export default App;