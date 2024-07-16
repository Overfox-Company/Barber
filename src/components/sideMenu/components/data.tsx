'use client'
import AddServiceIcon from '@/icons/AddServicesIcon'
import HistoryIcon from '@/icons/HistoryIcon'
import MetricsIcon from '@/icons/MetricsIcon'
import UserIcon from '@/icons/UserIcon'
import WorkersIcon from '@/icons/WorkersIcon'


const sizeIcons = 25
export const buttons = [
    {
        label: 'Add service',
        icon: <AddServiceIcon size={sizeIcons} />
    }, {
        label: 'Barbers',
        icon: <WorkersIcon size={sizeIcons} />
    }, {
        label: 'Customers',
        icon: <UserIcon size={sizeIcons} />
    }, {
        label: 'History',
        icon: <HistoryIcon size={sizeIcons} />
    }, {
        label: 'Reports',
        icon: <MetricsIcon size={sizeIcons} />
    },
]