import { MatPaginatorIntl } from '@angular/material/paginator';

const matRangeLabelIntl = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return '/';
  }

  length = Math.max(length, 0);
  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?  Math.min(startIndex + pageSize, length) : startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} / ${length}`;
};

export function AppPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Sivun koko';
  paginatorIntl.nextPageLabel = 'Seuraava sivu';
  paginatorIntl.previousPageLabel = 'Edellinen sivu';
  paginatorIntl.getRangeLabel = matRangeLabelIntl;

  return paginatorIntl;
}