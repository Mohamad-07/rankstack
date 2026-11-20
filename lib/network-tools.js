export const NETWORK_TOOLS = [
  {
    label: 'IP Checker',
    shortLabel: 'IP Checker',
    href: '/free-tools/ipchecker',
    description: 'See your public IP, network details, and approximate location.',
  },
  {
    label: 'Proxy & Location Detector',
    shortLabel: 'Proxy Detector',
    href: '/free-tools/proxy-detector',
    description: 'Score proxy headers, timezone, language, WebRTC, and GPS consistency.',
  },
  {
    label: 'Privacy Exposure Audit',
    shortLabel: 'Privacy Audit',
    href: '/free-tools/privacy-audit',
    description: 'See what your browser reveals automatically versus after permission.',
  },
  {
    label: 'Browser & User-Agent Inspector',
    shortLabel: 'UA Inspector',
    href: '/free-tools/user-agent-inspector',
    description: 'Break down your user-agent, browser, OS, device, and crawler signals.',
  },
];

export const NETWORK_TOOL_PATHS = NETWORK_TOOLS.map((tool) => tool.href);

export const DIAGNOSTIC_TOOLS = NETWORK_TOOLS.filter(
  (tool) => tool.href !== '/free-tools/ipchecker'
);
