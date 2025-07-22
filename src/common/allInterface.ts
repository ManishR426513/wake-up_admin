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
  status: string
  type: string
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
  direction: string;
  transactionType: string;
  provider: string;
  status: string;
  __v: number;
}

export interface reportInterface {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profilePic: string;
  };
  reportType: string;
  status:   string;
  // feedId: {
  //   _id: string;
  //   userId: string;
  //   title: string;
  //   media: {
  //     url: string;
  //     mediaType: "IMAGE" | "VIDEO";
  //     mimetype: string;
  //     _id: string;
  //   }[];
  //   thumbnail: string;
  //   feedType: "FEED" | string;
  //   category: string;
  //   likesCount: number;
  //   commentsCount: number;
  //   sharesCount: number;
  //   views: number;
  //   isActive: boolean;
  //   createdAt: string;
  //   updatedAt: string;
  //   __v: number;
  // };
  feedId: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
