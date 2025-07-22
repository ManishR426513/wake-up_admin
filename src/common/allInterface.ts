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

export interface transactionInterface {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    profilePic: string;
  };
  paymentDetails: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    metadata: { challengeId: string; userId: string };
    client_secret?: string;
    payment_method_types?: string[];
  };
  paymentIntentId: string;
  amount: number;
  currency: string;
  direction: "INCOMING" | "OUTGOING";
  transactionType: string;
  provider: string;
  status: string;
  __v: number;
}
