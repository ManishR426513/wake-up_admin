export interface challengeInterface {
    _id: string;
    title: string;
    description: string;
    duration: string;
    price: number;
    category: {
        _id: string;
        name: string;
    };
    userId: {
        _id: string;
        fullname: string;
        username: string;
        email: string;
        profilePic: string;
    };
    status: 'RUNNING' | 'COMPLETED' | 'CANCELLED';
    type: 'PUBLIC' | 'PRIVATE';
    winners: any[];
    createdAt: string;
    updatedAt: string;
    stats: {
        participantsCount: number;
        totalRevenue: number;
    };
}

export interface paginationInterface {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface userDataInterface {
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
