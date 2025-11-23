'use client';

import { useEffect, useState, Fragment } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { UserCircleIcon, CheckCircleIcon, NoSymbolIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'; // CheckCircleIcon, NoSymbolIcon added/verified
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';

// --- Interfaces ---
interface BasicUser {
    _id: string;
    fullName: string;
    email: string;
}
interface UserReport {
    _id: string; // Report's own ID
    reporter: BasicUser;
    reportedAt: string; // Assuming date comes as string
}
// Updated AdminUser interface to match aggregate query
interface AdminUserSummary extends BasicUser {
    isSuspended?: boolean;
    isAdmin?: boolean;
    reportsCount?: number;
    blockedUsersCount?: number;
    createdAt?: string;
}
// Interface for detailed view
interface AdminUserDetails extends AdminUserSummary {
    reports?: UserReport[];
    blockedUsers?: BasicUser[];
    year?: string;
    sex?: string;
    // Add other fields from User model if needed
}
interface UserDetailsData {
    userDetails: AdminUserDetails;
    blockedBy: BasicUser[];
}

// Assume User type is defined/imported from AuthContext
// If not, define it here:
// interface User { _id: string; fullName: string; email: string; isAdmin?: boolean; profilePicture?: string; }


// --- Component ---
export default function AdminPage() {
    const { user: adminUser, loading, isAuthenticated } = useAuth(); // Renamed 'user' to avoid conflict
    const router = useRouter();
    const [users, setUsers] = useState<AdminUserSummary[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- State for Details Modal ---
    const [selectedUser, setSelectedUser] = useState<UserDetailsData | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    // --- Fetch Users List ---
    useEffect(() => {
        const fetchUsers = async () => {
             setIsLoadingUsers(true);
             setError(null);
             try {
                 const res = await api.get('/admin/users');
                 setUsers(res.data);
             } catch (err: unknown) {
                 console.error("Failed to fetch users:", err);
                 let message = 'Failed to load users.';
                  if (axios.isAxiosError(err) && err.response) {
                     message = err.response.data?.message || message;
                     if (err.response.status === 403) {
                          message = "Access Denied. Admins only.";
                     }
                  } else if (err instanceof Error) {
                     message = err.message;
                  }
                 setError(message);
                 toast.error(message);
             } finally {
                 setIsLoadingUsers(false);
             }
        };

        if (!loading) {
            if (!isAuthenticated) {
                router.replace('/login');
            } else if (!adminUser?.isAdmin) {
                toast.error("Access Denied: Admins only.");
                router.replace('/chat'); // Redirect non-admins
            } else {
                fetchUsers(); // Fetch users only if authenticated and admin
            }
        }
    }, [adminUser, loading, isAuthenticated, router]);

    // --- Modal Open/Close ---
    const openUserDetailsModal = async (userId: string) => {
      console.log(`Opening user details modal for user ID: ${userId}`); 
        setIsDetailsModalOpen(true);
        setIsLoadingDetails(true);
        setSelectedUser(null); // Clear previous data
        try {
            const res = await api.get<UserDetailsData>(`/admin/users/${userId}/details`);
            setSelectedUser(res.data);
        } catch (err: unknown) {
             let message = 'Failed to load user details.';
             if (axios.isAxiosError(err) && err.response) {
                  message = err.response.data?.message || message;
             } else if (err instanceof Error) {
                  message = err.message;
             }
             toast.error(message);
             setIsDetailsModalOpen(false); // Close modal on error
        } finally {
            setIsLoadingDetails(false);
        }
    };
    const closeUserDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedUser(null);
    };

    // --- Action Handlers ---
    const handleUnsuspend = async (userId: string) => {
        const toastId = toast.loading('Unsuspending user...');
        try {
            const res = await api.put<{ message: string, reportsCount: number, isSuspended: boolean }>(`/admin/users/${userId}/unsuspend`);
            // Update main user list
            setUsers(prevUsers =>
                prevUsers.map(u => (u._id === userId ? { ...u, isSuspended: false, reportsCount: 0 } : u))
            );
            // Update details modal if open
            if (selectedUser && selectedUser.userDetails._id === userId) {
                 setSelectedUser(prev => prev ? { ...prev, userDetails: { ...prev.userDetails, isSuspended: false, reports: [] } } : null);
            }
            toast.success(res.data.message || 'User unsuspended!', { id: toastId });
        } catch (err: unknown) {
            let message = 'Failed to unsuspend user.';
             if (axios.isAxiosError(err) && err.response) {
                 message = err.response.data?.message || message;
             } else if (err instanceof Error) {
                 message = err.message;
             }
             toast.error(message, { id: toastId });
        }
    };

    const handleClearBlocks = async (userId: string) => {
         const toastId = toast.loading('Clearing blocks...');
         try {
            const res = await api.put<{ message: string, blockedUsersCount: number }>(`/admin/users/${userId}/clear-blocks`);
             // Update main user list
            setUsers(prevUsers =>
                prevUsers.map(u => (u._id === userId ? { ...u, blockedUsersCount: 0 } : u))
            );
             // Update details modal if open
            if (selectedUser && selectedUser.userDetails._id === userId) {
                 setSelectedUser(prev => prev ? { ...prev, userDetails: { ...prev.userDetails, blockedUsers: [] } } : null);
            }
            toast.success(res.data.message || 'Blocks cleared!', { id: toastId });
        } catch (err: unknown) {
            let message = 'Failed to clear blocks.';
            if (axios.isAxiosError(err) && err.response) {
                message = err.response.data?.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            toast.error(message, { id: toastId });
         }
    };

    const handleRemoveReport = async (userId: string, reportId: string) => {
         const toastId = toast.loading('Removing report...');
         try {
            const res = await api.delete<{ message: string, reportsCount: number, isSuspended: boolean }>(`/admin/users/${userId}/reports/${reportId}`);
             // Update details modal (most important)
            if (selectedUser && selectedUser.userDetails._id === userId) {
                 setSelectedUser(prev => prev ? {
                     ...prev,
                     userDetails: {
                         ...prev.userDetails,
                         reports: prev.userDetails.reports?.filter(r => r._id !== reportId) || [],
                         isSuspended: res.data.isSuspended // Update suspension status based on response
                     }
                 } : null);
            }
             // Update main user list count
            setUsers(prevUsers =>
                prevUsers.map(u => (u._id === userId ? { ...u, reportsCount: res.data.reportsCount, isSuspended: res.data.isSuspended } : u))
            );
            toast.success(res.data.message || 'Report removed!', { id: toastId });
        } catch (err: unknown) {
             let message = 'Failed to remove report.';
             if (axios.isAxiosError(err) && err.response) {
                 message = err.response.data?.message || message;
             } else if (err instanceof Error) {
                 message = err.message;
             }
             toast.error(message, { id: toastId });
         }
    };


    // --- Render Logic ---
    if (loading || (!isAuthenticated && !loading) || (isAuthenticated && !adminUser?.isAdmin && !loading)) {
        return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading Admin Panel...</div>;
    }

    return (
        <>
            {/* Main Page Content */}
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 p-4 md:p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Admin Dashboard
                </h1>

                {isLoadingUsers ? (
                    <p className="text-center text-gray-400">Loading users...</p>
                ) : error ? (
                    <p className="text-center text-red-400">{error}</p>
                ) : (
                    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                        <table className="min-w-full divide-y divide-gray-700">
                            {/* --- Table Head --- */}
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider" title="Reports Received">Reports</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider" title="Users Blocked by this User">Blocks</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            {/* --- Table Body --- */}
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-gray-700/50 transition-colors">
                                        {/* User Info */}
                                        <td className="px-4 py-3 whitespace-nowrap">
                                             <div className="flex items-center gap-2">
                                                 <UserCircleIcon className={`h-6 w-6 flex-shrink-0 ${u.isAdmin ? 'text-yellow-400' : 'text-gray-400'}`} title={u.isAdmin ? 'Admin' : 'User'}/>
                                                 <div>
                                                     <div className="text-sm font-medium text-gray-100">{u.fullName}</div>
                                                     <div className="text-xs text-gray-400">{u.email}</div>
                                                 </div>
                                             </div>
                                        </td>
                                        {/* Status - CORRECTED BLOCK */}
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            {u.isSuspended ? (
                                                <span className="flex items-center gap-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900 text-red-300">
                                                    <NoSymbolIcon className="h-3 w-3"/> Suspended
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                                                   <CheckCircleIcon className="h-3 w-3"/> Active
                                                </span>
                                            )}
                                        </td>
                                        {/* Counts */}
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400 text-center">{u.reportsCount ?? '?'}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400 text-center">{u.blockedUsersCount ?? '?'}</td>
                                        {/* Actions */}
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                                             <button
                                                onClick={() => openUserDetailsModal(u._id)}
                                                className="px-2 py-1 text-xs text-blue-300 bg-blue-800 hover:bg-blue-700 rounded transition-colors"
                                                title="View Details"
                                            >
                                                Details
                                            </button>
                                            {u.isSuspended && (
                                                <button
                                                    onClick={() => handleUnsuspend(u._id)}
                                                    className="px-2 py-1 text-xs text-green-300 bg-green-800 hover:bg-green-700 rounded transition-colors"
                                                    title="Unsuspend User"
                                                > Unsuspend </button>
                                            )}
                                            {(u.blockedUsersCount ?? 0) > 0 && (
                                                 <button
                                                    onClick={() => handleClearBlocks(u._id)}
                                                    className="px-2 py-1 text-xs text-yellow-300 bg-yellow-800 hover:bg-yellow-700 rounded transition-colors"
                                                    title="Clear All Blocks Made By This User"
                                                > Clear Blocks </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && <p className="text-center p-4 text-gray-500">No users found.</p>}
                    </div>
                )}
            </div>

             {/* --- User Details Modal --- */}
            <Transition appear show={isDetailsModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeUserDetailsModal}>
                    {/* Backdrop */}
                     <Transition.Child
                         as={Fragment}
                         enter="ease-out duration-300"
                         enterFrom="opacity-0"
                         enterTo="opacity-100"
                         leave="ease-in duration-200"
                         leaveFrom="opacity-100"
                         leaveTo="opacity-0"
                      >
                          <div className="fixed inset-0 bg-black bg-opacity-60" />
                     </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                             {/* Panel */}
                             <Transition.Child
                                 as={Fragment}
                                 enter="ease-out duration-300"
                                 enterFrom="opacity-0 scale-95"
                                 enterTo="opacity-100 scale-100"
                                 leave="ease-in duration-200"
                                 leaveFrom="opacity-100 scale-100"
                                 leaveTo="opacity-0 scale-95"
                              >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-gray-800 border border-gray-700 p-6 text-left align-middle shadow-xl transition-all text-gray-200">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100 border-b border-gray-700 pb-2 mb-4 flex justify-between items-center">
                                         User Details
                                         <button onClick={closeUserDetailsModal} className="text-gray-400 hover:text-gray-200 p-1 rounded-full hover:bg-gray-700"> <XMarkIcon className="h-5 w-5"/> </button>
                                    </Dialog.Title>

                                    {isLoadingDetails ? (
                                        <p className="text-center p-4">Loading details...</p>
                                    ) : selectedUser ? (
                                        <div className="mt-2 text-sm space-y-4">
                                            {/* Basic Info */}
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                <p><strong className="text-gray-400">Name:</strong> {selectedUser.userDetails.fullName}</p>
                                                <p><strong className="text-gray-400">Email:</strong> {selectedUser.userDetails.email}</p>
                                                <p><strong className="text-gray-400">Status:</strong> {selectedUser.userDetails.isSuspended ? <span className="text-red-400">Suspended</span> : <span className="text-green-400">Active</span>}</p>
                                                 {selectedUser.userDetails.year && <p><strong className="text-gray-400">Year:</strong> {selectedUser.userDetails.year}</p>}
                                                 {selectedUser.userDetails.sex && <p><strong className="text-gray-400">Gender:</strong> {selectedUser.userDetails.sex}</p>}
                                                <p><strong className="text-gray-400">Admin:</strong> {selectedUser.userDetails.isAdmin ? 'Yes' : 'No'}</p>
                                            </div>


                                            {/* Reports Received */}
                                            <div className="pt-3 border-t border-gray-700">
                                                <h4 className="font-semibold mb-1 text-gray-300">Reports Received ({selectedUser.userDetails.reports?.length || 0}):</h4>
                                                {selectedUser.userDetails.reports && selectedUser.userDetails.reports.length > 0 ? (
                                                    <ul className="list-none max-h-32 overflow-y-auto bg-gray-700/50 p-2 rounded border border-gray-600 space-y-1">
                                                        {selectedUser.userDetails.reports.map(report => (
                                                            <li key={report._id} className="text-xs text-gray-300 flex justify-between items-center bg-gray-700 p-1 rounded">
                                                                <div>
                                                                    <span>By: {report.reporter?.fullName || 'N/A'}</span>
                                                                    <span className="text-gray-400 ml-2">({report.reporter?.email || 'N/A'})</span>
                                                                    <span className="text-gray-500 ml-2">[{new Date(report.reportedAt).toLocaleDateString()}]</span>
                                                                </div>
                                                                 <button
                                                                    onClick={() => handleRemoveReport(selectedUser.userDetails._id, report._id)}
                                                                    className="ml-2 px-1.5 py-0.5 text-xs text-red-300 bg-red-800 hover:bg-red-700 rounded flex-shrink-0"
                                                                    title="Remove this report"
                                                                >
                                                                    X
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : <p className="text-xs text-gray-400 italic">No reports received.</p>}
                                            </div>

                                            {/* Users Blocked By This User */}
                                            <div className="pt-3 border-t border-gray-700">
                                                 <h4 className="font-semibold mb-1 text-gray-300">Users Blocked ({selectedUser.userDetails.blockedUsers?.length || 0}):</h4>
                                                  {selectedUser.userDetails.blockedUsers && selectedUser.userDetails.blockedUsers.length > 0 ? (
                                                    <ul className="list-disc list-inside max-h-32 overflow-y-auto bg-gray-700/50 p-2 rounded border border-gray-600 text-xs text-gray-300 space-y-1">
                                                         {selectedUser.userDetails.blockedUsers.map(bu => <li key={bu._id} className="ml-4">{bu.fullName} ({bu.email})</li>)}
                                                    </ul>
                                                ) : <p className="text-xs text-gray-400 italic">Has not blocked anyone.</p>}
                                            </div>

                                            {/* Users Who Blocked This User */}
                                            <div className="pt-3 border-t border-gray-700">
                                                 <h4 className="font-semibold mb-1 text-gray-300">Blocked By ({selectedUser.blockedBy.length || 0}):</h4>
                                                   {selectedUser.blockedBy && selectedUser.blockedBy.length > 0 ? (
                                                    <ul className="list-disc list-inside max-h-32 overflow-y-auto bg-gray-700/50 p-2 rounded border border-gray-600 text-xs text-gray-300 space-y-1">
                                                         {selectedUser.blockedBy.map(bb => <li key={bb._id} className="ml-4">{bb.fullName} ({bb.email})</li>)}
                                                    </ul>
                                                ) : <p className="text-xs text-gray-400 italic">Not blocked by anyone.</p>}
                                            </div>

                                            {/* Admin Actions in Modal */}
                                            <div className="mt-4 pt-4 border-t border-gray-700 space-x-2">
                                                {selectedUser.userDetails.isSuspended && (
                                                     <button onClick={() => handleUnsuspend(selectedUser.userDetails._id)} className="px-3 py-1 text-sm text-green-300 bg-green-800 hover:bg-green-700 rounded transition-colors"> Unsuspend </button>
                                                )}
                                                {(selectedUser.userDetails.blockedUsers?.length || 0) > 0 && (
                                                     <button onClick={() => handleClearBlocks(selectedUser.userDetails._id)} className="px-3 py-1 text-sm text-yellow-300 bg-yellow-800 hover:bg-yellow-700 rounded transition-colors"> Clear Blocks Made By User </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-red-400 text-center p-4">Could not load user details.</p>
                                    )}

                                    {/* Close Button Footer */}
                                    <div className="mt-5 text-right border-t border-gray-700 pt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                            onClick={closeUserDetailsModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

// Define User interface if not imported from AuthContext
// interface User { _id: string; fullName: string; email: string; isAdmin?: boolean; profilePicture?: string; }