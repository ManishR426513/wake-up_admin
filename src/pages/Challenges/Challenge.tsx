import React, { useState } from 'react'
import { Eye } from 'lucide-react'

const Challenge = () => {
    const [challenges] = useState([
        {
            id: 1,
            title: "React Component Challenge",
            description: "Build a responsive dashboard component using React and modern CSS",
            endDate: "2025-08-15",
            participants: 45,
        },
        {
            id: 2,
            title: "Algorithm Optimization",
            description: "Optimize sorting algorithms for large datasets and improve performance",
            endDate: "2025-08-22",
            participants: 32,
        },
        {
            id: 3,
            title: "UI/UX Design Sprint",
            description: "Create an intuitive user interface for a mobile banking application",
            endDate: "2025-08-28",
            participants: 28,
        },
        {
            id: 4,
            title: "Database Schema Design",
            description: "Design efficient database schema for an e-commerce platform",
            endDate: "2025-09-05",
            participants: 19,
        },
        {
            id: 5,
            title: "API Integration Challenge",
            description: "Integrate multiple third-party APIs and handle error scenarios",
            endDate: "2025-09-12",
            participants: 37,
        },
        {
            id: 6,
            title: "Machine Learning Model",
            description: "Develop a predictive model for customer behavior analysis",
            endDate: "2025-09-18",
            participants: 24,
        },
    ])

    const formatDate = (dateString:string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Challenge Dashboard</h1>
                <p>Manage and track all your challenges</p>
            </div>

            <div className="border rounded-lg overflow-hidden shadow-sm">
                <table className="w-full">
                    <caption className="py-4 text-sm">
                        A comprehensive list of all active challenges
                    </caption>
                    <thead>
                        <tr className="bg-muted">
                            <th className="w-16 font-semibold text-left px-4 py-3">S.No</th>
                            <th className="font-semibold text-left px-4 py-3">Title</th>
                            <th className="font-semibold text-left px-4 py-3">Description</th>
                            <th className="font-semibold text-left px-4 py-3">End Date</th>
                            <th className="font-semibold text-center px-4 py-3">Participants</th>
                            <th className="font-semibold text-center px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {challenges.map((challenge, index) => (
                            <tr key={challenge.id} className="border-b">
                                <td className="font-medium px-4 py-3">
                                    {index + 1}
                                </td>
                                <td className="font-medium px-4 py-3">
                                    {challenge.title}
                                </td>
                                <td className="max-w-xs px-4 py-3">
                                    <div className="truncate" title={challenge.description}>
                                        {challenge.description}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {formatDate(challenge.endDate)}
                                </td>
                                <td className="text-center px-4 py-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium">
                                        {challenge.participants}
                                    </span>
                                </td>
                                <td className="text-center px-4 py-3">
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => alert(`Viewing details for: ${challenge.title}`)}
                                            className="p-2 hover:bg-muted rounded-full transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-between items-center text-sm">
                <div>
                    Showing {challenges.length} challenges
                </div>
                <div>
                    Total Participants: {challenges.reduce((sum, challenge) => sum + challenge.participants, 0)}
                </div>
            </div>
        </div>
    )
}

export default Challenge
