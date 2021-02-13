enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FindAllParamsPatient {
  filter: string;
  sortOrder: SortOrder;
  pageNumber: number;
  pageSize: number;
}
