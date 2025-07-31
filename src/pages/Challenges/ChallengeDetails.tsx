import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {  useParams } from 'react-router-dom';
//import DeleteConfirmationModal from '@/common/Modal/DeleteConfirmationModal';
import { Main } from '@/components/main';
import { authAxios } from '@/config/config';
import { toast } from 'sonner';
import { handleThumbnail } from '@/helper/helper';
import { MediaViewer } from '@/common/MediaViewer';

interface ParticipantInterface {
    _id: string;
    userId: {
        _id: string;
        fullname: string;
        username: string;
        email: string;
        profilePic: string;
    };
    challengeId: string;
    transactionId: string;
    isActive: boolean;
    feedId: {
        _id: string;
        userId: string;
        title: string;
        media: Array<{
            url: string;
            mediaType: string;
            mimetype: string;
            _id: string;
        }>;
        thumbnail: string;
        feedType: string;
        category: string;
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
        views: number;
        isActive: boolean;
        challengeId: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        challengeParticipantId: string;
    };
    createdBy: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ChallengeDetailsInterface {
    _id: string;
    category: {
        _id: string;
        name: string;
    };
    duration: string;
    title: string;
    description: string;
    price: number;
    userId: {
        _id: string;
        fullname: string;
        username: string;
        email: string;
        profilePic: string;
    };
    status: string;
    type: string;
    winners: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const ChallengeDetails = () => {
    // const [modalState, setModalState] = useState<{
    //     isOpen: boolean;
    //     isEditMode: boolean;
    //     isDeleteMode: boolean;
    //     currentParticipant: ParticipantInterface | null;
    // }>({
    //     isOpen: false,
    //     isDeleteMode: false,
    //     isEditMode: false,
    //     currentParticipant: null,
    // });

    const [challengeData, setChallengeData] = useState<ChallengeDetailsInterface | null>(null);
    const [participants, setParticipants] = useState<ParticipantInterface[]>([]);
    const [analytics, setAnalytics] = useState<{
        participantsCount: number;
        totalLikes: number;
        totalViews: number;
        totalComments: number;
    } | null>(null);
    const [revenue, setRevenue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const { id } = useParams()
    const [viewMedia, setviewMedia] = useState<{
        open: boolean;
        media: any[]; // Replace `any` with a proper media type if available
    }>({
        open: false,
        media: [],
    });

    // const handleOpenDeleteModal = (item: ParticipantInterface): void => {
    //     setModalState({
    //         isOpen: false,
    //         isEditMode: false,
    //         isDeleteMode: true,
    //         currentParticipant: item,
    //     });
    // };

    // const handleCloseModal = (): void => {
    //     setModalState({
    //         isOpen: false,
    //         isEditMode: false,
    //         isDeleteMode: false,
    //         currentParticipant: null,
    //     });
    // };

    // const handleDelete = async (): Promise<void> => {
    //     try {
    //         setModalState({
    //             isOpen: false,
    //             isEditMode: false,
    //             isDeleteMode: false,
    //             currentParticipant: null,
    //         })
    //         // Uncomment and implement the delete API call
    //         // const response = await authAxios().delete(
    //         //     `/participant/${modalState?.currentParticipant?._id}`
    //         // );
    //         // await getAllChallenges();
    //         // toast.success(response.data.message);

    //         // For now, just close the modal
    //        // handleCloseModal();
    //         toast.success("Participant deleted successfully");
    //     } catch (error) {
    //         console.error("Error deleting participant:", error);
    //         toast.error("Failed to delete participant");
    //     }
    // };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    useEffect(() => {
        getAllChallenges();
    }, []);

    const getAllChallenges = async () => {
        if (!id) {
            toast.error("Challenge ID is required");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await authAxios().get(`/challenge/${id}`);
            console.log("Fetched challenge data:", response.data);

            if (response.data.success && response.data.data) {
                setChallengeData(response.data.data.challenge);
                setParticipants(response.data.data.participants || []);
                setAnalytics(response.data.data.analytics || null);
                setRevenue(response.data.data.revenue || 0);
            } else {
                toast.error("No challenge data found in response.");
            }
        } catch (error: any) {
            console.error("Error fetching challenge:", error);
            toast.error(error?.response?.data?.message || "Failed to fetch challenge details.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteChallenge = async () => {
        try {
          
          const response = await authAxios().delete(`/challenge/${id}`);
            
            toast.success(response.data.message);
        } catch (error: any) {
            console.error("Error deleting challenge:", error);
            toast.error(error?.response?.data?.message || "Failed to delete challenge.");
        }
    };

    const handleForceCompleteChallenge = async () => {
        try {
            const response = await authAxios().post(`/challenge/${id}/force-complete`);
            console.log("rea",response)
           toast.success(response.data.message);
        } catch (error: any) {
            console.error("Error completing challenge:", error);
            toast.error(error?.response?.data?.message || "Failed to complete challenge.");
        }
    }

    if (loading) {
        return (
            <div>
                <Main>
                    <div className="flex items-center justify-center h-64">
                        <p>Loading challenge details...</p>
                    </div>
                </Main>
            </div>
        );
    }

    return (
        <div>
            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Challenge Participants</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of participants for this challenge
                        </p>
                    </div>
                </div>

                <div className="mb-6 flex flex-col md:flex-row items-center gap-6 bg-muted/40 rounded-lg p-5 shadow border border-border">
                    <img
                        src='https://plus.unsplash.com/premium_photo-1752624906994-d94727d34c9b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        // src={!challengeData?.userId?.profilePic 
                        //     ? `https://your-base-url/${challengeData.userId.profilePic}` 
                        //     : 'https://plus.unsplash.com/premium_photo-1752155109947-539988d49e5d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        // }
                        alt="Challenge Thumbnail"
                        className="h-24 w-24 rounded-lg object-cover border"
                    />
                    <div className="flex-1 w-full">
                        <h2 className="text-xl font-semibold text-foreground mb-1">
                            {challengeData?.title || "Challenge Title"}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-1">
                            {challengeData?.description || "No description available."}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                            <span>Category: {challengeData?.category?.name}</span>
                            <span>Price: ${challengeData?.price}</span>
                            <span>Status: {challengeData?.status}</span>
                            <span>Type: {challengeData?.type}</span>
                        </div>
                        {analytics && (
                            <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                <span>Participants: {analytics.participantsCount}</span>
                                <span>Total Likes: {analytics.totalLikes}</span>
                                <span>Total Views: {analytics.totalViews}</span>
                                <span>Revenue: ${revenue}</span>
                            </div>
                        )}
                    </div>
                     <div className="mt-4 md:mt-0 md:ml-auto">
                        <Button className='bg-green-800 text-white' onClick={handleForceCompleteChallenge}>
                             Complete  Challenge
                        </Button>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-auto">
                        <Button variant="destructive" onClick={handleDeleteChallenge}>
                            Delete Challenge
                        </Button>
                    </div>
                </div>

                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <Table className="w-full border-collapse text-sm">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Sno</TableHead>
                                <TableHead>Participant</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Media</TableHead>
                                <TableHead>Likes</TableHead>
                                <TableHead>Views</TableHead>
                                <TableHead>Comments</TableHead>
                                <TableHead>Created Date</TableHead>
                                {/* <TableHead className="text-right">Actions</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {participants && participants.length > 0 ? (
                                participants.map((item, index) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="px-4 py-3 font-medium">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{item.userId.fullname}</TableCell>
                                        <TableCell>{item.userId.username}</TableCell>
                                        <TableCell>{item.userId.email}</TableCell>
                                        {/* <TableCell>{item.feedId.title}</TableCell> */}
                                        <TableCell
                                            onClick={() =>
                                                setviewMedia((prev) => ({
                                                    ...prev,
                                                    media: item?.feedId.media,
                                                    open: !viewMedia.open,
                                                }))
                                            }
                                        >
                                            <img
                                                src={handleThumbnail(item?.feedId?.thumbnail)}
                                                width={50}
                                                height={50}
                                            />{" "}
                                        </TableCell>
                                        <TableCell>{item?.feedId?.likesCount}</TableCell>
                                        <TableCell>{item?.feedId?.views}</TableCell>
                                        <TableCell>{item?.feedId?.commentsCount}</TableCell>
                                        <TableCell>{formatDate(item.createdAt)}</TableCell>
                                        {/* <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        onClick={() =>
                                                            setModalState((prev) => ({
                                                                ...prev,
                                                                currentParticipant: item,
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
                                                            onClick={() => navigation(`/feed/${item.feedId._id}`)}
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                            <span>View Feed</span>
                                                        </button>
                                                        <button
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                            onClick={() => handleOpenDeleteModal(item)}
                                                        >
                                                            <Trash className="h-3.5 w-3.5" />
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell> */}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        className="px-4 py-3 text-center text-gray-500"
                                    >
                                        No Results
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {viewMedia.open && (
                    <MediaViewer viewMedia={viewMedia} setviewMedia={setviewMedia} />
                )}

                {/* {modalState.isDeleteMode && (
                    <DeleteConfirmationModal
                      //  isOpen={modalState.isDeleteMode}
                       // onClose={handleCloseModal}
                        //onConfirm={handleDelete}
                        title="Remove Participant"
                        description={`Are you sure you want to remove "${modalState.currentParticipant?.userId.fullname}" from this challenge? This action cannot be undone.`}
                    />
                )} */}
            </Main>
        </div>
    )
}

export default ChallengeDetails