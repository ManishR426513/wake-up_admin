import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Main } from "@/components/main";
import { authAxios } from "@/config/config";
import { useAllContext } from "@/context/AllContext";

import { toast } from "sonner";
import { handleProfileImage } from "@/helper/helper";
import PaginationComponent from "@/common/PaginationComponent";
import { paginationInterface, userDataInterface } from "@/common/allInterface";





const UserList: React.FC = () => {
  const { setloading } = useAllContext();

  const [users, setUsers] = useState<userDataInterface[]>([]);
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

  const getUsers = async (page: number = 1, limit: number = 10): Promise<void> => {
    setloading(true);
    try {
      const response = await authAxios().get(`/auth/all-users?page=${page}&limit=${limit}`);
      const data = response.data.data;

      console.log("re", response)
      setUsers(data.docs);
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
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setloading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    getUsers(newPage, pagination.limit);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Users</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your Wakeup Users
            </p>
          </div>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <Table className="w-full border-collapse text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-3 text-left">S.No</TableHead>
                <TableHead className="px-4 py-3 text-left">Image</TableHead>
                <TableHead className="px-4 py-3 text-left">Name</TableHead>
                <TableHead className="px-4 py-3 text-left">Email</TableHead>
                <TableHead className="px-4 py-3 text-left">Phone</TableHead>
                <TableHead className="px-4 py-3 text-left">Interests</TableHead>
                <TableHead className="px-4 py-3 text-left">Subscriptions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users && users.length > 0 ? (
                users.map((user, index) => {
                  // Calculate the actual serial number based on pagination
                  const serialNumber = (pagination.page - 1) * pagination.limit + index + 1;

                  return (
                    <TableRow key={user._id}>
                      <TableCell className="px-4 py-3 font-medium">
                        {serialNumber}
                      </TableCell>
                      <TableCell>
                        <img
                          src={handleProfileImage(user.profilePic)}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium capitalize">{user.fullname}</div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                        </div>
                      </TableCell>
                      <TableCell className="lowercase">{user.email}</TableCell>
                      <TableCell>
                        +{user.countryCode} {user.phoneno}
                      </TableCell>
                      <TableCell>
                        {user.interest.length > 0
                          ? user.interest.join(", ")
                          : "No interests"}
                      </TableCell>
                      <TableCell>
                        {user.subscriptions.length > 0 ? (
                          user.subscriptions.map((subscription, idx) => (
                            <div key={idx}>
                              {subscription?.planId?.planType}
                            </div>
                          ))
                        ) : (
                          <span className="text-muted-foreground">Basic</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>

          {/* Pagination Component */}

        </div>
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

export default UserList;