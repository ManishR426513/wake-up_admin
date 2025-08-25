import { useEffect, useState } from 'react'
import { MoreHorizontal, Filter, Trash2, EyeIcon, Plus } from 'lucide-react'
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
import { handleThumbnail, setReportFormatDate } from '@/helper/helper';
import { authAxios } from '@/config/config';
import { modalInterface, paginationInterface } from '@/common/allInterface';

interface MasterClassItem {
    _id: string;
    userId: string;
    title: string;
    description: string;
    dateTime: string;
    duration: number;
    price: number;
    minUsers: number;
    status: string;
    zegoRoomId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    link?: string;
    thumbnail?: string;
}

interface MasterClassInterface {
    boostDetails: null;
    category: string;
    commentsCount: number;
    contentType: string;
    createdAt: string;
    feedType: string;
    id: string;
    isActive: boolean;
    isBoosted: boolean;
    isDeleted: boolean;
    likesCount: number;
    updatedAt: string;
    __v: number;
    masterClass: MasterClassItem;
}
import { useAllContext } from '@/context/AllContext';
import { toast } from 'sonner';
import PaginationComponent from '@/common/PaginationComponent';
import { MediaViewer } from '@/common/MediaViewer';
import DeleteConfirmationModal from '@/common/Modal/DeleteConfirmationModal';
import { useNavigate } from 'react-router-dom';

const MasterClass = () => {
  const { setloading } = useAllContext();
  const navigate = useNavigate();

  const [modalState, setModalState] = useState<modalInterface>({
    isOpen: false,
    isDeleteMode: false,
    data: null,
  });

  const [filterStatus, setFilterStatus] = useState<string>('');
  const [viewMedia, setViewMedia] = useState<{
    open: boolean;
    media: Array<{
      url: string;
      mediaType: 'IMAGE' | 'VIDEO';
      mimetype: string;
      _id: string;
    }>;
  }>({
    open: false,
    media: [],
  });

  const [masterClasses, setMasterClasses] = useState<MasterClassItem[]>([]);
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

  const getAllMasterClasses = async (page: number = 1, limit: number = 10): Promise<void> => {
    setloading(true);
    try {
      const response = await authAxios().get(`/master-class`, {
        params: {
          isDeleted: filterStatus,
          page: page,
          limit: limit
        }
      });
      const items = response.data.data.docs as MasterClassInterface[];
      console.log("items===>", items)
      const masterClassItems = items.map(item => item.masterClass);
      setMasterClasses(masterClassItems);
      setPagination({
        totalDocs: response.data.data.totalDocs,
        limit: response.data.data.limit,
        totalPages: response.data.data.totalPages,
        page: response.data.data.page,
        pagingCounter: response.data.data.pagingCounter,
        hasPrevPage: response.data.data.hasPrevPage,
        hasNextPage: response.data.data.hasNextPage,
        prevPage: response.data.data.prevPage,
        nextPage: response.data.data.nextPage,
      });
    } catch (error) {
      console.error('Error fetching master classes:', error);
      toast.error('Failed to fetch master classes');
    } finally {
      setloading(false);
    }
  };

  console.log("masterClasses==>", masterClasses);

  const handleDeleteMasterClass = async (id: string) => {
    setloading(true);
    try {
      await authAxios().delete(`/master-class/${id}`);
      toast.success('Master class deleted successfully');
      getAllMasterClasses(pagination.page, pagination.limit);
      setModalState(prev => ({ ...prev, isOpen: false, isDeleteMode: false, data: null }));
    } catch (error) {
      console.error('Error deleting master class:', error);
      toast.error('Failed to delete master class');
    } finally {
      setloading(false);
    }
  };

  const handlePageChange = (page: number) => {
    getAllMasterClasses(page, pagination.limit);
  };

  useEffect(() => {
    getAllMasterClasses();
  }, [filterStatus]);

  return (
    <Main>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Master Classes</h1>
        <Button onClick={() => navigate('/master-class/add')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Master Class
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="false">Active</option>
                <option value="true">Inactive</option>
              </select>
              <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead>Thumbnail</TableHead> */}
                <TableHead>S.No.</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Link</TableHead>
                {/* <TableHead>Duration</TableHead> */}
                <TableHead>Media</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {masterClasses.length > 0 ? (
                masterClasses.map((item,index) => (
                  <TableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.link}</TableCell>
                    <TableCell>
                      {item.thumbnail ? (
                        <div className="w-16 h-16 rounded-md overflow-hidden">
                          <img
                            src={handleThumbnail(item.thumbnail)}
                            alt={item.title || 'Master class thumbnail'}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() =>
                              setViewMedia({
                                open: true,
                                media: [{
                                  url: handleThumbnail(item.thumbnail || ''),
                                  mediaType: 'IMAGE',
                                  mimetype: 'image/jpeg',
                                  _id: item._id
                                }],
                              })
                            }
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{item.createdAt ? setReportFormatDate(item.createdAt) : 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(`/master-class/edit/${item._id}`)
                          }
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-2">
                            <div className="flex flex-col">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start"
                                onClick={() =>
                                  setModalState({
                                    isOpen: true,
                                    isDeleteMode: true,
                                    data: item,
                                  })
                                }
                              >
                                <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                Delete
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No master classes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t">
            <PaginationComponent
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
            />
          </div>
        )}
      </div>

      <MediaViewer
        viewMedia={viewMedia}
        setviewMedia={setViewMedia}
      />

      {modalState.isOpen && modalState.isDeleteMode && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() =>
            setModalState({
              isOpen: false,
              isDeleteMode: false,
              data: null,
            })
          }
          onConfirm={() => {
            if (modalState.data) {
              handleDeleteMasterClass(modalState.data._id);
            }
          }}
          title="Delete Master Class"
          description="Are you sure you want to delete this master class? This action cannot be undone."
        />
      )}
    </Main>
  );
};

export default MasterClass;