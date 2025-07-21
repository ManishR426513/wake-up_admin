import  { useState } from 'react'
import {  Eye, MoreHorizontal, Trash } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/Button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '@/common/Modal/DeleteConfirmationModal';
import { Main } from '@/components/main';
interface ChallengeInterface {
    id: number;
    title: string;
    description: string;
    endDate: string;
    participants: number;
    price: string;
    category: string;
}
const ChallengeDetails = () => {
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
        <div >
            <Main>

                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Challenges</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of your Wakeup Challneges
                        </p>
                    </div>
                </div>
                <div className="mb-6 flex flex-col md:flex-row items-center gap-6 bg-muted/40 rounded-lg p-5 shadow border border-border">
                    <img
                       // src={handleThumbnail('https://plus.unsplash.com/premium_photo-1752155109947-539988d49e5d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')}
                        src='https://plus.unsplash.com/premium_photo-1752155109947-539988d49e5d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt="Feed Thumbnail"
                        className="h-24 w-24 rounded-lg object-cover border"
                    />
                    <div className="flex-1 w-full">
                        <h2 className="text-xl font-semibold text-foreground mb-1">
                            {/* {feedDetails?.title || "Feed Title"} */}
                            {challenges[0]?.title}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-1">
                            {challenges[0]?.description || "No description available."}
                        </p>
                        
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-auto">

                        <Button variant="destructive">
                            Delete 
                        </Button>

                    </div>
                </div>

                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <Table className="w-full border-collapse text-sm">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Sno</TableHead>
                                <TableHead>Title</TableHead>

                                <TableHead>Category</TableHead>
                                <TableHead> Price</TableHead>
                                <TableHead>End Date</TableHead>

                                <TableHead> Participants</TableHead>

                                <TableHead className="text-right"> Actions</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {challenges.length > 0 ? (
                                challenges.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="px-4 py-3 font-medium">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell> {item.title}</TableCell>
                                        <TableCell>  {item.category}</TableCell>
                                        <TableCell>  {item.price}</TableCell>
                                        <TableCell>  {item.endDate}</TableCell>
                                        <TableCell>  {item.participants}</TableCell>


                                        {/* <TableCell>{setReportFormatDate(item.category)}</TableCell> */}
                                        <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        onClick={() =>
                                                            setModalState((prev) => ({
                                                                ...prev,
                                                                currentCategory: item,
                                                            }))
                                                        }
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
                                                            onClick={() => navigation(`/challenge/${item.id}`)}
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                            <span>View</span>
                                                        </button>
                                                        <button
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                            onClick={() => handleOpenDeleteModal(item)}
                                                        >
                                                            <Trash className="h-3.5 w-3.5" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="px-4 py-3 text-center text-gray-500"
                                    >
                                        No Challenges found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
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

            </Main>
        </div>
    )
}

export default ChallengeDetails
