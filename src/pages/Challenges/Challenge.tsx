import React, { useState } from 'react'
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '@/common/Modal/DeleteConfirmationModal';
interface ChallengeInterface {
    id: number;
    title: string;
    description: string;
    endDate: string;
    participants: number;
    price: string;
    category: string;
}
const Challenge = () => {
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        isEditMode: boolean;
        isDeleteMode: boolean;
        currentChallenege: ChallengeInterface | null;
    }>({
        isOpen: false,
        isDeleteMode: false,
        isEditMode: false,
        currentChallenege: null,
    });
    const [challenges] = useState([
        {
            id: 1,
            title: "React Component Challenge",
            description: "Build a responsive dashboard component using React and modern CSS",
            endDate: "2025-08-15",
            participants: 45,
            price: "$100",
            category: "Frontend",
        },
        {
            id: 2,
            title: "Algorithm Optimization",
            description: "Optimize sorting algorithms for large datasets and improve performance",
            endDate: "2025-08-22",
            participants: 32,
            price: "$150",
            category: "Algorithms",
        },
        {
            id: 3,
            title: "UI/UX Design Sprint",
            description: "Create an intuitive user interface for a mobile banking application",
            endDate: "2025-08-28",
            participants: 28,
            price: "$120",
            category: "Design",
        },
        {
            id: 4,
            title: "Database Schema Design",
            description: "Design efficient database schema for an e-commerce platform",
            endDate: "2025-09-05",
            participants: 19,
            price: "$130",
            category: "Backend",
        },
        {
            id: 5,
            title: "API Integration Challenge",
            description: "Integrate multiple third-party APIs and handle error scenarios",
            endDate: "2025-09-12",
            participants: 37,
            price: "$140",
            category: "Integration",
        },
        {
            id: 6,
            title: "Machine Learning Model",
            description: "Develop a predictive model for customer behavior analysis",
            endDate: "2025-09-18",
            participants: 24,
            price: "$200",
            category: "Machine Learning",
        },
    ]);

    const navigation = useNavigate()


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const handleOpenDeleteModal = (item: ChallengeInterface): void => {
        setModalState({
            isOpen: false,
            isEditMode: false,
            isDeleteMode: true,
            currentChallenege: item,
        });
    };
    const handleCloseModal = (): void => {
        setModalState({
            isOpen: false,
            isEditMode: false,
            isDeleteMode: false,
            currentChallenege: null,
        });
    };
    const handleDelete = async (): Promise<void> => {
        handleCloseModal();
        // try {
        //   const response = await authAxios(token).delete(
        //     `/category/${modalState?.currentCategory?._id}`
        //   );
        //   await getCategories();
        //   handleCloseModal();

        //   toast.success(response.data.message);
        // } catch (error) {
        //   console.error("Error deleting category:", error);
        // }
    };

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
                            <th className="font-semibold text-left px-4 py-3">Category</th>
                            {/* <th className="font-semibold text-left px-4 py-3">Description</th> */}
                            <th className="font-semibold text-left px-4 py-3">Price</th>

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
                                <td className="font-medium px-4 py-3">
                                    {challenge.category}
                                </td>
                                <td className="font-medium px-4 py-3">
                                    {challenge.price || 0}$
                                </td>
                                {/* <td className="max-w-xs px-4 py-3">
                                    <div className="truncate" title={challenge.description}>
                                        {challenge.description}
                                    </div>
                                </td> */}
                                <td className="px-4 py-3">
                                    {formatDate(challenge.endDate)}
                                </td>
                                <td className="text-center px-4 py-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium">
                                        {challenge.participants}
                                    </span>
                                </td>
                                <td className="text-center px-4 py-3">
                                    {/* <div className="flex justify-center">
                                        <button
                                            onClick={() => alert(`Viewing details for: ${challenge.title}`)}
                                            className="p-2 hover:bg-muted rounded-full transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div> */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                // onClick={() =>
                                                //   setModalState((prev) => ({
                                                //     ...prev,
                                                //     currentCategory: item,
                                                //   }))
                                                // }
                                                variant="ghost"
                                                className="h-7 w-7 p-0 hover:bg-muted"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            side="left"
                                            className="w-28 p-1 bg-popover border border-border shadow-md"
                                        >
                                            <div className="flex flex-col space-y-1">
                                                <button
                                                    onClick={() => navigation(`/challenge/${challenge.id}`)}
                                                    className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    <span>View</span>
                                                </button>
                                                <button
                                                    onClick={() => handleOpenDeleteModal(challenge)}
                                                    className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                //onClick={() => handleOpenDeleteModal(item)}
                                                >
                                                    <Trash className="h-3.5 w-3.5" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalState.isDeleteMode && (
                <DeleteConfirmationModal
                    isOpen={modalState.isDeleteMode}
                    onClose={handleCloseModal}
                    onConfirm={handleDelete}
                    title="Delete Category"
                    description={`Are you sure you want to delete "${modalState.currentChallenege?.title}"? This action cannot be undone.`}
                />
            )}


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
