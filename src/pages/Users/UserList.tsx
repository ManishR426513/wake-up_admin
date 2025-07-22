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

interface UserDataInterface {
  _id: string;
  fullname: string;
  username: string;
  phoneno: string;
  countryCode: string;
  email: string;
  profilePic: string;
  interest: string[];
  subscriptions: Array<{
    planId: {
      planType: string;
    };
  }>;
  role: string;
  createdAt: string;
  isActive?: boolean;
}

const UserList: React.FC = () => {
  const { setloading } = useAllContext();
  

  const [users, setUsers] = useState<UserDataInterface[]>([]);

  const getUsers = async (): Promise<void> => {
    setloading(true);
    try {
      const response = await authAxios().get("/auth/all-users");
      setUsers(response.data.data.allUsers);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setloading(false);
    }
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
              {users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell className="px-4 py-3 font-medium">{index + 1} </TableCell>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Main>
    </div>
  );
};

export default UserList;