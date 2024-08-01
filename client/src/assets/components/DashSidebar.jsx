import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function DashSidebar() {
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
        <Sidebar className='w-full'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' className="text-xl font-mono font-semibold">
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer text-xl font-mono font-semibold'>
                        Log Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar