import { useEffect, useState } from 'react'
import {  MoreHorizontal, Filter, Trash2, EyeIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/Button';

import { Main } from '@/components/main';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleLink, handleThumbnail, setReportFormatDate } from '@/helper/helper';
import { authAxios } from '@/config/config';
import { modalInterface, paginationInterface, sportInterface, } from '@/common/allInterface';
import { useAllContext } from '@/context/AllContext';
import { toast } from 'sonner';
import PaginationComponent from '@/common/PaginationComponent';
import { MediaViewer } from '@/common/MediaViewer';
import DeleteConfirmationModal from '@/common/Modal/DeleteConfirmationModal';




const Sport = () => {
  const { setloading } = useAllContext();

  const [modalState, setmodalState] = useState<
    // {
    //   isOpen: boolean;
    //   isDeleteMode: boolean;
    //   data: feedInterface | null;
    // }
    modalInterface
  >({
    isOpen: false,
    isDeleteMode: false,
    data: null,
  });


  const [filterStatus, setFilterStatus] = useState<string>('');
  // const [filterType, setFilterType] = useState<string>('ALL');
  // const [filterDirection, setFilterDirection] = useState<string>('ALL');
  const [viewMedia, setviewMedia] = useState<{
    open: boolean;
    media: any[]; // Replace `any` with a proper media type if available
  }>({
    open: false,
    media: [],
  });


  const [sports, setSports] = useState<sportInterface[]>([

  ]);

  const handleCloseModal = () => {
    setmodalState((prev) => ({
      ...prev,
      isDeleteMode: false,
      data: null
    }))
  }

  const [pagination, setPagination] = useState<paginationInterface>({
    totalDocs: 0,
    limit: 10,
    totalPages: 0,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  });


  const getAllSports = async (page: number = 1, limit: number = 10): Promise<void> => {
    setloading(true);
    try {
      const response = await authAxios().get(`/sport`, {
        params: {
          isDeleted:filterStatus,
          page: page,
          limit: limit
        }
      });
      const data = response.data.data;
      console.log(" Sports data", data)

      console.log("fvddaa", data)
      setSports(data.docs)


      setPagination({
        totalDocs: data.totalDocs,
        limit: data.limit,
        totalPages: data.totalPages,
        page: data.page,
        pagingCounter: data.pagingCounter,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setloading(false);
    }
  }
  console.log("modal", modalState)

  const handleDelete = async (): Promise<void> => {
    try {
      const response = await authAxios().put(`/sport/${modalState?.data?._id}`, { isDeleted: !modalState?.data?.isDeleted, });

      await getAllSports()
      handleCloseModal();

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
  const handlePageChange = (newPage: number) => {
    getAllSports(newPage, pagination.limit);
  };

  useEffect(() => {
    getAllSports()
  }, [filterStatus])


  return (
    <div >
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Sport</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your all  Sports
            </p>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filters</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                <label className="text-sm font-medium text-muted-foreground sm:sr-only" htmlFor="statusFilter">
                  Status
                </label>
                <select
                  id="statusFilter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                >
                  <option value="">All</option>
                  <option value="false">Active</option>
                  <option value="true">Not Active</option>
                </select>
              </div>

              {/* <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                <label className="text-sm font-medium text-muted-foreground sm:sr-only" htmlFor="typeFilter">
                  Type
                </label>
                <select
                  id="typeFilter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                >
                  <option value="ALL">All Types</option>
                  <option value="SUBSCRIPTION">Subscription</option>
                  <option value="CHALLENGE">Challenge</option>
                  <option value="MASTER_CLASS">Master Class</option>
                  <option value="WITHDRAWAL">Withdrawal</option>
                  <option value="SHOP">Shop</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                <label className="text-sm font-medium text-muted-foreground sm:sr-only" htmlFor="directionFilter">
                  Direction
                </label>
                <select
                  id="directionFilter"
                  value={filterDirection}
                  onChange={(e) => setFilterDirection(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                >
                  <option value="ALL">All Directions</option>
                  <option value="INCOMING">Incoming</option>
                  <option value="OUTGOING">Outgoing</option>
                </select>
              </div> */}
            </div>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <Table className="w-full border-collapse text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sno</TableHead>

                <TableHead>Title</TableHead>
                <TableHead> Description</TableHead>
                <TableHead>link</TableHead>

                <TableHead> Media</TableHead>
                {/* <TableHead> Active</TableHead> */}
                <TableHead> Date</TableHead>

                <TableHead className="text-right"> Actions</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {sports && sports.length > 0 ? (
                sports.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className="px-4 py-3 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell>  {item?.sport?.title}</TableCell>
                    <TableCell>  {item?.sport?.description}</TableCell>
                    <TableCell onClick={() => window.open(handleLink(item?.sport?.link), '_blank')}>
                      <EyeIcon />
                    </TableCell>

                    <TableCell
                      onClick={() => setviewMedia((prev) => ({
                        ...prev,
                        media: item.media,
                        open: !viewMedia.open
                      }))}
                    ><img src={handleThumbnail(item?.thumbnail)} width={50} height={50} />   </TableCell>
                    {/* <TableCell>  {item.isActive ? 'True' : 'False'}</TableCell> */}
                    <TableCell>  {setReportFormatDate(item?.createdAt)}</TableCell>



                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button

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
                          {/* <div className="flex flex-col space-y-1">
                            <button
                              // onClick={() => navigation(`/challenge/${item.id}`)}
                              className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View</span>
                            </button>

                          </div> */}
                          <div className="flex flex-col space-y-1">
                            {item.isDeleted ? (
                              <button
                                onClick={() =>
                                  setmodalState((prev: any) => ({
                                    ...prev,
                                    isDeleteMode: true,
                                    data: item,
                                  }))
                                }
                                className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Recover</span>
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  setmodalState((prev: any) => ({
                                    ...prev,
                                    isDeleteMode: true,
                                    data: item,
                                  }))
                                }
                                className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Delete</span>
                              </button>
                            )}

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
                    No Results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {
          viewMedia.open && <MediaViewer viewMedia={viewMedia} setviewMedia={setviewMedia} />
        }
        <PaginationComponent
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
          onPageChange={handlePageChange}
          totalDocs={pagination.totalDocs}
          limit={pagination.limit}
        />
        {modalState.isDeleteMode && (
          <DeleteConfirmationModal

            isOpen={modalState.isDeleteMode}
            onClose={handleCloseModal}
            onConfirm={handleDelete}
            title={`${modalState?.data?.isDeleted ? "Recover" : "Delete"} Sport`}

            description={`Are you sure you want to delete ${modalState.data?.sport?.title}? `}
            recover={modalState?.data?.isDeleted}
          />
        )}
      </Main>

    </div>
  );
};

export default Sport;