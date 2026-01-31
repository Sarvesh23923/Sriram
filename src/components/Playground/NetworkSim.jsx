import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FaServer, FaLaptop, FaCloud, FaPlay, FaRedo, FaShieldAlt,
  FaNetworkWired, FaDatabase, FaGlobe, FaLock, FaExchangeAlt,
  FaCog, FaInfoCircle, FaCheckCircle, FaTimesCircle, 
  FaExclamationTriangle, FaWifi, FaClock, FaTachometerAlt
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { MdRouter } from 'react-icons/md';
import './NetworkSim.css';

const NetworkSim = () => {
  const [packets, setPackets] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState('http');
  const [stats, setStats] = useState({
    packetsSent: 0,
    packetsReceived: 0,
    packetsDropped: 0,
    latency: 0,
    bandwidth: 0
  });
  const [showNodeInfo, setShowNodeInfo] = useState(false);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState(null);
  const [activeConnections, setActiveConnections] = useState([]);
  const canvasRef = useRef(null);

  // Network topology nodes - using percentages for responsive layout
  const nodes = [
    { 
      id: 'client', 
      type: 'laptop', 
      x: 10, 
      y: 50, 
      label: 'Client',
      ip: '192.168.1.10',
      mac: 'AA:BB:CC:DD:EE:01',
      status: 'active',
      description: 'End-user device initiating network requests',
      protocols: ['HTTP', 'HTTPS', 'DNS', 'TCP/IP']
    },
    { 
      id: 'router', 
      type: 'router', 
      x: 30, 
      y: 50, 
      label: 'Router',
      ip: '192.168.1.1',
      mac: 'AA:BB:CC:DD:EE:02',
      status: 'active',
      description: 'Network gateway handling traffic routing',
      protocols: ['NAT', 'DHCP', 'RIP', 'OSPF']
    },
    { 
      id: 'firewall', 
      type: 'firewall', 
      x: 50, 
      y: 50, 
      label: 'Firewall',
      ip: '10.0.0.1',
      mac: 'AA:BB:CC:DD:EE:03',
      status: 'active',
      description: 'Security appliance filtering network traffic',
      protocols: ['ACL', 'IDS/IPS', 'VPN', 'SSL']
    },
    { 
      id: 'server', 
      type: 'server', 
      x: 70, 
      y: 50, 
      label: 'Web Server',
      ip: '10.0.0.50',
      mac: 'AA:BB:CC:DD:EE:04',
      status: 'active',
      description: 'Application server processing requests',
      protocols: ['HTTP/2', 'TLS 1.3', 'WebSocket']
    },
    { 
      id: 'database', 
      type: 'database', 
      x: 70, 
      y: 85, 
      label: 'Database',
      ip: '10.0.0.100',
      mac: 'AA:BB:CC:DD:EE:05',
      status: 'active',
      description: 'Data storage and retrieval system',
      protocols: ['MySQL', 'PostgreSQL', 'Redis']
    },
    { 
      id: 'cloud', 
      type: 'cloud', 
      x: 90, 
      y: 50, 
      label: 'Cloud CDN',
      ip: 'CDN Edge',
      mac: 'Distributed',
      status: 'active',
      description: 'Content delivery network for static assets',
      protocols: ['HTTP/3', 'QUIC', 'Edge Caching']
    },
  ];

  // Connection paths between nodes
  const connections = [
    { from: 'client', to: 'router', type: 'ethernet' },
    { from: 'router', to: 'firewall', type: 'fiber' },
    { from: 'firewall', to: 'server', type: 'fiber' },
    { from: 'server', to: 'database', type: 'internal' },
    { from: 'server', to: 'cloud', type: 'wan' },
  ];

  // Simulation scenarios
  const scenarios = {
    http: {
      name: 'HTTP Request',
      icon: <FaGlobe />,
      color: '#00ff41',
      description: 'Standard web request flow',
      steps: [
        { from: 'client', to: 'router', message: 'HTTP GET request initiated', status: 'sending', protocol: 'HTTP' },
        { from: 'router', to: 'firewall', message: 'Packet routed to firewall', status: 'routing', protocol: 'TCP' },
        { from: 'firewall', to: 'server', message: 'Firewall approved - forwarding', status: 'approved', protocol: 'HTTPS' },
        { from: 'server', to: 'database', message: 'Querying database', status: 'processing', protocol: 'SQL' },
        { from: 'database', to: 'server', message: 'Data retrieved successfully', status: 'success', protocol: 'SQL' },
        { from: 'server', to: 'firewall', message: 'Response prepared', status: 'responding', protocol: 'HTTPS' },
        { from: 'firewall', to: 'router', message: 'Response cleared', status: 'approved', protocol: 'TCP' },
        { from: 'router', to: 'client', message: 'HTTP 200 OK received', status: 'complete', protocol: 'HTTP' },
      ]
    },
    dns: {
      name: 'DNS Lookup',
      icon: <FaNetworkWired />,
      color: '#00d4ff',
      description: 'Domain name resolution process',
      steps: [
        { from: 'client', to: 'router', message: 'DNS query: example.com', status: 'query', protocol: 'DNS' },
        { from: 'router', to: 'firewall', message: 'DNS request forwarded', status: 'routing', protocol: 'UDP' },
        { from: 'firewall', to: 'cloud', message: 'Querying DNS server', status: 'lookup', protocol: 'DNS' },
        { from: 'cloud', to: 'firewall', message: 'DNS response: 93.184.216.34', status: 'resolved', protocol: 'DNS' },
        { from: 'firewall', to: 'router', message: 'Response validated', status: 'approved', protocol: 'UDP' },
        { from: 'router', to: 'client', message: 'IP address cached', status: 'complete', protocol: 'DNS' },
      ]
    },
    ssl: {
      name: 'SSL Handshake',
      icon: <FaLock />,
      color: '#a855f7',
      description: 'Secure connection establishment',
      steps: [
        { from: 'client', to: 'router', message: 'ClientHello sent', status: 'handshake', protocol: 'TLS' },
        { from: 'router', to: 'firewall', message: 'TLS packet forwarded', status: 'routing', protocol: 'TCP' },
        { from: 'firewall', to: 'server', message: 'Handshake initiated', status: 'processing', protocol: 'TLS' },
        { from: 'server', to: 'firewall', message: 'ServerHello + Certificate', status: 'certificate', protocol: 'TLS' },
        { from: 'firewall', to: 'router', message: 'Certificate validated', status: 'approved', protocol: 'TCP' },
        { from: 'router', to: 'client', message: 'Key exchange complete', status: 'encrypted', protocol: 'TLS' },
      ]
    },
    attack: {
      name: 'Attack Blocked',
      icon: <FaShieldAlt />,
      color: '#ff6b6b',
      description: 'Malicious traffic detection',
      steps: [
        { from: 'cloud', to: 'server', message: 'Incoming suspicious packet', status: 'warning', protocol: 'TCP' },
        { from: 'server', to: 'firewall', message: 'Forwarding for inspection', status: 'analyzing', protocol: 'IDS' },
        { from: 'firewall', to: 'firewall', message: 'SQL injection detected!', status: 'threat', protocol: 'WAF' },
        { from: 'firewall', to: 'cloud', message: 'Connection blocked - IP banned', status: 'blocked', protocol: 'ACL' },
      ]
    },
    ping: {
      name: 'ICMP Ping',
      icon: <FaWifi />,
      color: '#ffd93d',
      description: 'Network connectivity test',
      steps: [
        { from: 'client', to: 'router', message: 'ICMP Echo Request', status: 'ping', protocol: 'ICMP' },
        { from: 'router', to: 'firewall', message: 'Ping forwarded', status: 'routing', protocol: 'ICMP' },
        { from: 'firewall', to: 'server', message: 'ICMP allowed', status: 'approved', protocol: 'ICMP' },
        { from: 'server', to: 'firewall', message: 'Echo Reply', status: 'pong', protocol: 'ICMP' },
        { from: 'firewall', to: 'router', message: 'Reply forwarded', status: 'routing', protocol: 'ICMP' },
        { from: 'router', to: 'client', message: 'Ping: 24ms TTL=64', status: 'complete', protocol: 'ICMP' },
      ]
    }
  };

  const getNodeIcon = (type) => {
    const icons = {
      laptop: <FaLaptop />,
      router: <MdRouter />,
      firewall: <FaShieldAlt />,
      server: <FaServer />,
      database: <FaDatabase />,
      cloud: <FaCloud />
    };
    return icons[type] || <FaServer />;
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'complete':
      case 'success':
      case 'approved':
      case 'resolved':
        return <FaCheckCircle className="status-icon success" />;
      case 'blocked':
      case 'threat':
        return <FaTimesCircle className="status-icon error" />;
      case 'warning':
      case 'analyzing':
        return <FaExclamationTriangle className="status-icon warning" />;
      default:
        return <HiLightningBolt className="status-icon info" />;
    }
  };

  const addLog = (message, type = 'info', protocol = '') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    });
    setLogs(prev => [
      { id: Date.now(), time: timestamp, message, type, protocol }, 
      ...prev
    ].slice(0, 8));
  };

  const updateStats = (type) => {
    setStats(prev => {
      const newStats = { ...prev };
      switch(type) {
        case 'sent':
          newStats.packetsSent++;
          newStats.bandwidth = Math.floor(Math.random() * 50) + 50;
          break;
        case 'received':
          newStats.packetsReceived++;
          newStats.latency = Math.floor(Math.random() * 30) + 10;
          break;
        case 'dropped':
          newStats.packetsDropped++;
          break;
        default:
          break;
      }
      return newStats;
    });
  };

  const runSimulation = useCallback(() => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    setPackets([]);
    setActiveConnections([]);
    
    const scenario = scenarios[selectedScenario];
    const steps = scenario.steps;
    let currentStep = 0;
    
    addLog(`Starting ${scenario.name} simulation...`, 'system');
    
    const runStep = () => {
      if (currentStep >= steps.length) {
        setIsSimulating(false);
        setActiveNode(null);
        setActiveConnections([]);
        addLog(`${scenario.name} completed successfully.`, 'success');
        updateStats('received');
        return;
      }

      const step = steps[currentStep];
      const startNode = nodes.find(n => n.id === step.from);
      const endNode = nodes.find(n => n.id === step.to);

      if (!startNode || !endNode) {
        currentStep++;
        runStep();
        return;
      }

      setActiveNode(step.to);
      setActiveConnections([`${step.from}-${step.to}`]);
      updateStats('sent');

      const newPacket = {
        id: Date.now(),
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        status: step.status,
        color: scenario.color,
        protocol: step.protocol
      };

      setPackets([newPacket]);
      addLog(step.message, step.status, step.protocol);

      const duration = 1200 / simulationSpeed;
      
      setTimeout(() => {
        setPackets([]);
        currentStep++;
        runStep();
      }, duration);
    };

    setTimeout(runStep, 300);
  }, [isSimulating, selectedScenario, simulationSpeed, nodes]);

  const resetSimulation = () => {
    setPackets([]);
    setLogs([]);
    setIsSimulating(false);
    setActiveNode(null);
    setActiveConnections([]);
    setStats({
      packetsSent: 0,
      packetsReceived: 0,
      packetsDropped: 0,
      latency: 0,
      bandwidth: 0
    });
  };

  const handleNodeClick = (node) => {
    setSelectedNodeInfo(node);
    setShowNodeInfo(true);
  };

  // Generate background particles
  const bgParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`
  }));

  return (
    <section className="section network-sim" id="network-lab">
      {/* Background Effects */}
      <div className="sim-bg-effects">
        <div className="cyber-grid"></div>
        <div className="floating-particles">
          {bgParticles.map(p => (
            <div 
              key={p.id} 
              className="bg-particle"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="header-content">
            <span className="section-badge">
              <FaNetworkWired /> Interactive Demo
            </span>
            <h2 className="section-title glow-text">
              Network Simulation Lab
            </h2>
            <div className="title-decoration">
              <span className="decoration-line"></span>
              <span className="decoration-icon"><HiSparkles /></span>
              <span className="decoration-line"></span>
            </div>
            <p className="section-subtitle">
              Visualize real-time network traffic flow and security protocols in action
            </p>
          </div>
        </div>

        {/* Scenario Selector */}
        <div className="scenario-selector">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <button
              key={key}
              className={`scenario-btn ${selectedScenario === key ? 'active' : ''}`}
              onClick={() => !isSimulating && setSelectedScenario(key)}
              disabled={isSimulating}
              style={{ '--scenario-color': scenario.color }}
            >
              <span className="scenario-icon">{scenario.icon}</span>
              <span className="scenario-name">{scenario.name}</span>
            </button>
          ))}
        </div>

        {/* Main Simulation Container */}
        <div className="sim-container">
          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <FaExchangeAlt className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">{stats.packetsSent}</span>
                <span className="stat-label">Sent</span>
              </div>
            </div>
            <div className="stat-item">
              <FaCheckCircle className="stat-icon success" />
              <div className="stat-info">
                <span className="stat-value">{stats.packetsReceived}</span>
                <span className="stat-label">Received</span>
              </div>
            </div>
            <div className="stat-item">
              <FaTimesCircle className="stat-icon error" />
              <div className="stat-info">
                <span className="stat-value">{stats.packetsDropped}</span>
                <span className="stat-label">Dropped</span>
              </div>
            </div>
            <div className="stat-item">
              <FaClock className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">{stats.latency}ms</span>
                <span className="stat-label">Latency</span>
              </div>
            </div>
            <div className="stat-item">
              <FaTachometerAlt className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">{stats.bandwidth}</span>
                <span className="stat-label">Mbps</span>
              </div>
            </div>
          </div>

          {/* Network Canvas */}
          <div className="sim-canvas" ref={canvasRef}>
            {/* Connection Lines */}
            <svg className="sim-connections">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 255, 65, 0.3)" />
                  <stop offset="50%" stopColor="rgba(0, 255, 65, 0.6)" />
                  <stop offset="100%" stopColor="rgba(0, 255, 65, 0.3)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {connections.map((conn, idx) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                
                const isActive = activeConnections.includes(`${conn.from}-${conn.to}`) ||
                                 activeConnections.includes(`${conn.to}-${conn.from}`);
                
                // Calculate if this is a vertical connection
                const isVertical = Math.abs(fromNode.y - toNode.y) > 20;
                
                return (
                  <g key={idx}>
                    {/* Background line */}
                    <line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      className="connection-bg"
                    />
                    {/* Main line */}
                    <line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      className={`connection-line ${conn.type} ${isActive ? 'active' : ''}`}
                      style={isActive ? { stroke: scenarios[selectedScenario].color } : {}}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Network Nodes */}
            {nodes.map(node => (
              <div 
                key={node.id}
                className={`sim-node ${node.type} ${activeNode === node.id ? 'active' : ''} ${hoveredNode === node.id ? 'hovered' : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="node-pulse"></div>
                <div className="node-icon">
                  {getNodeIcon(node.type)}
                </div>
                <div className={`node-status-dot ${node.status}`}></div>
                <span className="node-label">{node.label}</span>
                
                {/* Tooltip */}
                <div className="node-tooltip">
                  <div className="tooltip-header">
                    <span className="tooltip-title">{node.label}</span>
                    <span className={`tooltip-status ${node.status}`}>{node.status}</span>
                  </div>
                  <div className="tooltip-body">
                    <div className="tooltip-row">
                      <span className="tooltip-key">IP:</span>
                      <span className="tooltip-value">{node.ip}</span>
                    </div>
                    <div className="tooltip-row">
                      <span className="tooltip-key">MAC:</span>
                      <span className="tooltip-value">{node.mac}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Animated Packets */}
            {packets.map(packet => (
              <div
                key={packet.id}
                className={`sim-packet ${packet.status}`}
                style={{
                  '--start-x': `${packet.startX}%`,
                  '--start-y': `${packet.startY}%`,
                  '--end-x': `${packet.endX}%`,
                  '--end-y': `${packet.endY}%`,
                  '--packet-color': packet.color,
                  '--duration': `${1 / simulationSpeed}s`
                }}
              >
                <span className="packet-label">{packet.protocol}</span>
              </div>
            ))}

            {/* Canvas Legend */}
            <div className="canvas-legend">
              <div className="legend-item">
                <span className="legend-dot active"></span>
                <span>Active</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot idle"></span>
                <span>Idle</span>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="sim-controls">
            {/* Logs Panel */}
            <div className="sim-logs">
              <div className="log-header">
                <FaNetworkWired className="log-icon" />
                <span>Network Activity Log</span>
                <span className="log-count">{logs.length}</span>
              </div>
              <div className="log-content">
                {logs.length === 0 ? (
                  <div className="log-placeholder">
                    <FaInfoCircle />
                    <span>Select a scenario and start simulation...</span>
                  </div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className={`log-entry ${log.type}`}>
                      <span className="log-time">{log.time}</span>
                      {log.protocol && (
                        <span className="log-protocol">[{log.protocol}]</span>
                      )}
                      <span className="log-message">{log.message}</span>
                      {getStatusIcon(log.type)}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Control Panel */}
            <div className="control-panel">
              {/* Speed Control */}
              <div className="speed-control">
                <label className="control-label">
                  <FaTachometerAlt /> Simulation Speed
                </label>
                <div className="speed-slider-wrapper">
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.5"
                    value={simulationSpeed}
                    onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                    className="speed-slider"
                    disabled={isSimulating}
                  />
                  <span className="speed-value">{simulationSpeed}x</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="control-buttons">
                <button 
                  className={`btn btn-primary ${isSimulating ? 'simulating' : ''}`}
                  onClick={runSimulation}
                  disabled={isSimulating}
                >
                  {isSimulating ? (
                    <>
                      <span className="btn-spinner"></span>
                      <span>Simulating...</span>
                    </>
                  ) : (
                    <>
                      <FaPlay />
                      <span>Start Simulation</span>
                    </>
                  )}
                </button>
                
                <button 
                  className="btn btn-secondary"
                  onClick={resetSimulation}
                  disabled={isSimulating}
                >
                  <FaRedo />
                  <span>Reset</span>
                </button>
              </div>

              {/* Current Scenario */}
              <div className="current-scenario">
                <div 
                  className="scenario-badge"
                  style={{ '--scenario-color': scenarios[selectedScenario].color }}
                >
                  <span className="scenario-badge-icon">{scenarios[selectedScenario].icon}</span>
                  <div className="scenario-badge-info">
                    <span className="scenario-badge-name">{scenarios[selectedScenario].name}</span>
                    <span className="scenario-badge-desc">{scenarios[selectedScenario].description}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Reference */}
        <div className="protocol-reference">
          <h3 className="reference-title">
            <FaInfoCircle /> Network Protocols Reference
          </h3>
          <div className="protocol-grid">
            {[
              { name: 'TCP/IP', desc: 'Transmission Control Protocol', layer: 'Transport', color: '#00ff41' },
              { name: 'HTTP/S', desc: 'Hypertext Transfer Protocol', layer: 'Application', color: '#00d4ff' },
              { name: 'DNS', desc: 'Domain Name System', layer: 'Application', color: '#a855f7' },
              { name: 'TLS', desc: 'Transport Layer Security', layer: 'Transport', color: '#ffd93d' },
              { name: 'ICMP', desc: 'Internet Control Message', layer: 'Network', color: '#ff6b6b' },
              { name: 'UDP', desc: 'User Datagram Protocol', layer: 'Transport', color: '#4ecdc4' },
            ].map((protocol, idx) => (
              <div 
                key={idx} 
                className="protocol-card"
                style={{ '--protocol-color': protocol.color }}
              >
                <span className="protocol-name">{protocol.name}</span>
                <span className="protocol-desc">{protocol.desc}</span>
                <span className="protocol-layer">{protocol.layer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Node Info Modal */}
      {showNodeInfo && selectedNodeInfo && (
        <div className="node-modal-overlay" onClick={() => setShowNodeInfo(false)}>
          <div className="node-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowNodeInfo(false)}>
              <FaTimesCircle />
            </button>
            
            <div className="modal-header">
              <div className="modal-icon">
                {getNodeIcon(selectedNodeInfo.type)}
              </div>
              <div className="modal-title-group">
                <h3 className="modal-title">{selectedNodeInfo.label}</h3>
                <span className={`modal-status ${selectedNodeInfo.status}`}>
                  {selectedNodeInfo.status}
                </span>
              </div>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedNodeInfo.description}</p>
              
              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <span className="info-label">IP Address</span>
                  <span className="info-value">{selectedNodeInfo.ip}</span>
                </div>
                <div className="modal-info-item">
                  <span className="info-label">MAC Address</span>
                  <span className="info-value">{selectedNodeInfo.mac}</span>
                </div>
              </div>

              <div className="modal-protocols">
                <span className="protocols-label">Supported Protocols</span>
                <div className="protocols-list">
                  {selectedNodeInfo.protocols.map((proto, idx) => (
                    <span key={idx} className="protocol-tag">{proto}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NetworkSim;