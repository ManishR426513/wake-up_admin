import { useEffect, useState } from "react";
import { Main } from "@/components/main";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleThumbnail, setReportFormatDate } from "@/helper/helper";
import { authAxios } from "@/config/config";
import {
  paginationInterface,
  masterClassInterface,
} from "@/common/allInterface";
import { useAllContext } from "@/context/AllContext";
import { toast } from "sonner";
import PaginationComponent from "@/common/PaginationComponent";
import { MediaViewer } from "@/common/MediaViewer";
import { Star } from 'lucide-react'

const MasterClass = () => {
  const { setloading } = useAllContext();

  const [viewMedia, setviewMedia] = useState<{
    open: boolean;
    media: any[];
  }>({
    open: false,
    media: [],
  });

  const [masterClass, setmasterClass] = useState<masterClassInterface[]>([]);

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

  const getAllmasterClasss = async (
    page: number = 1,
    limit: number = 10
  ): Promise<void> => {
    setloading(true);
    try {
      const response = await authAxios().get(`/master-class`, {
        params: {
          page: page,
          limit: limit,
        },
      });
      const data = response.data.data;
      setmasterClass(data.docs);

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
  };

  const handlePageChange = (newPage: number) => {
    getAllmasterClasss(newPage, pagination.limit);
  };

  useEffect(() => {
    getAllmasterClasss();
  }, []);

  return (
    <div>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Master Classs</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your all masterClasss
            </p>
          </div>
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <Table className="w-full border-collapse text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sno</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Media</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {masterClass && masterClass.length > 0 ? (
                masterClass.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className="px-4 py-3 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item?.title}</TableCell>
                    <TableCell>{item?.masterClass?.description}</TableCell>
                    <TableCell>{item?.masterClass?.duration} minutes</TableCell>
                    <TableCell
                      onClick={() =>
                        setviewMedia((prev) => ({
                          ...prev,
                          media: item.media,
                          open: !viewMedia.open,
                        }))
                      }
                    >
                      <img
                        src={handleThumbnail(item?.thumbnail)}
                        width={50}
                        height={50}
                      />
                    </TableCell>
                    <TableCell>
                      {setReportFormatDate(item?.masterClass?.dateTime)}
                    </TableCell>
                    <TableCell>{item?.masterClass?.status}</TableCell>
                    <TableCell>{item?.masterClass?.price}</TableCell>
                    <TableCell>
  {item?.masterClass?.averageRating > 0 ? (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      {item.masterClass.averageRating}
      <Star className="h-4 w-4 " />
    </span>
  ) : (
    '-'
  )}
</TableCell>


                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
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

        <PaginationComponent
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
          onPageChange={handlePageChange}
          totalDocs={pagination.totalDocs}
          limit={pagination.limit}
        />
      </Main>
    </div>
  );
};

export default MasterClass;
