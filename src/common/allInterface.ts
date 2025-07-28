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
  createdAt?:string
}

export interface withdrawalInterface{
  _id: string;
  paymentMethod: {
    type: "PAYPAL" | "BANK_ACCOUNT" | string;
    details:any,
  };
  fees: {
    netAmount: number;
    processingFee: number;
    platformFee: number;
    totalFees: number;
  };
  processing: {
    attempts: number;
  };
  userId: {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    profilePic: string;
  };
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | string;
  requestedAt: string; // ISO date string
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
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

export interface shopInterface{
   _id: string;
  userId: {
    _id: string;
    username: string;
    profilePic: string;
  };
 media: any[];

  thumbnail: string;
  feedType: "SHOP";
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  views: number;
  isActive: boolean;
  shop: {
    _id: string;
    title: string;
    userId: string;
    description: string;
    link: string;
    price: number | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  isDeleted: boolean;
}
export interface mediaItem {
  url: string;
  mediaType: "IMAGE" | "VIDEO";
  mimetype: string;
  _id: string;
}

export interface mediaViewerProps {
  viewMedia: {
    open: boolean;
    media: mediaItem[];
  };
  setviewMedia: (state: { open: boolean; media: mediaItem[] }) => void;
}

export interface feedInterface{
 _id: string;
  userId: {
    _id: string;
    username: string;
    profilePic: string;
  };
  title: string;
  media: {
    url: string;
    mediaType: "IMAGE" | "VIDEO";
    mimetype: string;
    _id: string;
  }[];
  thumbnail: string;
  feedType: "FEED" | string; // You can replace string with other types like "STORY", "AD", etc. if known
  category: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  views: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface modalInterface {
    isOpen: boolean;           // true when modal is open
    isDeleteMode?: boolean;    // optional delete mode
    isEditMode?: boolean;      // optional edit mode
    data?: any;                // holds the data for modal
    type?: string | null;      // APPROVE | REJECT | etc.
}

