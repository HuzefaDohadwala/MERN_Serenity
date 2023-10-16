import React from 'react';
import SideBar from './SideBar';
import MemExplore from './pages/MemExplore';
import { useState } from 'react';
import MemMemes from './pages/MemMemes';
import MemTherapists from './pages/MemTherapists';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const displayComponent = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className="flex">
      {/* First Column (1/4) */}
      <div className="w-1/4">
        {/* Pass the displayComponent function to SideBar as a prop */}
        <SideBar displayComponent={displayComponent} />
      </div>

      {/* Second Column (3/4) */}
      <div className="w-3/4 bg-indigo-500" style={{ height: "100vh", overflowY: "auto" }}>
        {/* Content for the second column */}
        {selectedComponent === 'chat' && <MemMemes/>}
        {selectedComponent === 'therapist' && <MemTherapists/>}
        {selectedComponent === 'explore' && <MemExplore />}
        {selectedComponent === 'meme' && <MemMemes/>}
      </div>
    </div>
  );
};

export default Dashboard;
