'use client';

import { useState, useEffect } from 'react';

export default function NetworkDiagram() {
  const [crmLabel, setCrmLabel] = useState('HubSpot');

  useEffect(() => {
    const interval = setInterval(() => {
      setCrmLabel(prev => prev === 'HubSpot' ? 'Salesforce' : 'HubSpot');
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto" aria-hidden="true">
      <svg
        className="w-full h-auto"
        viewBox="0 0 560 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Edges - slightly darker for better contrast */}
        <g stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round">
          {/* User -> Agent */}
          <path id="e-user-agent" d="M100 280 C 160 260, 210 250, 260 250" />
          {/* Email -> Agent */}
          <path id="e-email-agent" d="M120 150 C 190 170, 230 200, 260 250" />
          {/* Slack -> Agent */}
          <path id="e-slack-agent" d="M120 410 C 190 380, 230 320, 260 250" />
          {/* Agent -> CRM */}
          <path id="e-agent-crm" d="M300 250 C 360 230, 410 220, 460 240" />
          {/* Agent -> Jira */}
          <path id="e-agent-jira" d="M300 250 C 360 260, 410 300, 460 320" />
          {/* Agent -> DB */}
          <path id="e-agent-db" d="M300 250 C 360 200, 420 170, 460 160" />
        </g>

        {/* Nodes */}
        {/* Left column */}
        <g className="node group" transform="translate(90,280)">
          <circle r="20" fill="#111827"></circle>
          <text textAnchor="middle" y="5" fontSize="11" fill="white">User</text>
        </g>
        <g className="node group" transform="translate(120,150)">
          <rect x="-24" y="-16" width="48" height="32" rx="6" fill="#111827"></rect>
          <text textAnchor="middle" y="4" fontSize="11" fill="white">Email</text>
        </g>
        <g className="node group" transform="translate(120,410)">
          <rect x="-24" y="-16" width="48" height="32" rx="6" fill="#111827"></rect>
          <text textAnchor="middle" y="4" fontSize="11" fill="white">Slack</text>
        </g>

        {/* Center (Agent) - with glow effect */}
        <g className="node group" transform="translate(280,250)">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle r="26" fill="#1D4ED8" filter="url(#glow)"></circle>
          <circle r="26" fill="none" stroke="#60A5FA" strokeWidth="2"></circle>
          <text textAnchor="middle" y="4" fontSize="12" fill="white" fontWeight="600">Agent</text>
        </g>

        {/* Right column */}
        <g className="node group" transform="translate(470,240)">
          <rect x="-32" y="-14" width="64" height="28" rx="6" fill="#111827"></rect>
          <text textAnchor="middle" y="4" fontSize="10" fill="white" className="transition-opacity duration-500">
            {crmLabel}
          </text>
        </g>
        <g className="node group" transform="translate(470,320)">
          <rect x="-20" y="-14" width="40" height="28" rx="6" fill="#111827"></rect>
          <text textAnchor="middle" y="4" fontSize="11" fill="white">Jira</text>
        </g>
        <g className="node group" transform="translate(470,160)">
          <circle r="18" fill="#111827"></circle>
          <text textAnchor="middle" y="4" fontSize="11" fill="white">DB</text>
        </g>

        {/* Animated pulses - light blue for inbound, blue for outbound */}
        {/* Inbound to Agent (light blue) */}
        <circle r="4" fill="#60A5FA">
          <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1"
            calcMode="linear">
            <mpath xlinkHref="#e-user-agent" />
          </animateMotion>
        </circle>
        <circle r="4" fill="#60A5FA">
          <animateMotion dur="5s" begin="1s" repeatCount="indefinite">
            <mpath xlinkHref="#e-email-agent" />
          </animateMotion>
        </circle>
        <circle r="4" fill="#60A5FA">
          <animateMotion dur="5.5s" begin="2s" repeatCount="indefinite">
            <mpath xlinkHref="#e-slack-agent" />
          </animateMotion>
        </circle>

        {/* Outbound from Agent (dark blue) */}
        <circle r="4" fill="#1D4ED8">
          <animateMotion dur="4.5s" begin="0.5s" repeatCount="indefinite">
            <mpath xlinkHref="#e-agent-crm" />
          </animateMotion>
        </circle>
        <circle r="4" fill="#1D4ED8">
          <animateMotion dur="6s" begin="1.2s" repeatCount="indefinite">
            <mpath xlinkHref="#e-agent-jira" />
          </animateMotion>
        </circle>
        <circle r="4" fill="#1D4ED8">
          <animateMotion dur="5.2s" begin="1.8s" repeatCount="indefinite">
            <mpath xlinkHref="#e-agent-db" />
          </animateMotion>
        </circle>

        {/* Hover highlight styles */}
        <style>{`
          .node:hover + .hint { opacity: 1 }
          path:hover { stroke: #60A5FA; stroke-width: 2.5 }
          @media (prefers-reduced-motion: reduce) {
            animateMotion { display: none }
            circle[fill="#60A5FA"], circle[fill="#1D4ED8"] { opacity: 0.3 }
          }
        `}</style>
      </svg>

      {/* Trust strip - visible on mobile */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-gray-600 md:hidden">
        <div>
          <div className="font-semibold text-gray-900">90-day</div>
          <div>ROI guarantee</div>
        </div>
        <div>
          <div className="font-semibold text-gray-900">50+</div>
          <div>deployments</div>
        </div>
        <div>
          <div className="font-semibold text-gray-900">End-to-end</div>
          <div>implementation</div>
        </div>
      </div>
    </div>
  );
}
