enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FindAllParamsUser {
  filter: string;
  sortOrder: SortOrder;
  pageNumber: number;
  pageSize: number;
}
