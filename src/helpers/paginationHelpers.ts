type TOptions = {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
};

type TOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePagination = (options: TOptions): TOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (Number(page) - 1) * limit;

  const sortArray = ["species", "breed", "size"];
  let sortBy: string;
  if (options.sortBy && sortArray.includes(options.sortBy)) {
    sortBy = options.sortBy;
  } else {
    sortBy = "createdAt";
  }

  let sortOrder: string;
  if (options.sortOrder && ["asc", "desc"].includes(options.sortOrder)) {
    sortOrder = options.sortOrder;
  } else {
    sortOrder = "asc";
  }

  //   const sortOrder: string = options.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
