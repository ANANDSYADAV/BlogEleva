import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../assets/components/DashSidebar';
import DashProfile from '../assets/components/DashProfile';

function Dashboard() {
  const location = useLocation('');
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const currentTab = urlParams.get('tab');
    if (currentTab) {
      setTab(currentTab);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* SideBar */}
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === 'profile' && <DashProfile />}
    </div>
  )
}

export default Dashboard