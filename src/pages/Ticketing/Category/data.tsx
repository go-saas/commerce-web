
import { Ticketingapicategoryv1Category,TicketingCategoryServiceApi } from '@gosaas/commerce-api';
export type CategoryWithChildren = {
  children?: CategoryWithChildren[];
} & Ticketingapicategoryv1Category;

export async function getTreeData(): Promise<CategoryWithChildren[]> {
  const resp = await new TicketingCategoryServiceApi().ticketingCategoryServiceListCategory2({
    body: { pageOffset: 0, pageSize: -1 },
  });
  const all = resp.data?.items ?? [];
  //get children
  const findChildren = (parent = '') => {
    const children = all
      .filter((p) => p.parent === parent)
      .sort((a, b) => a.key!> b.key! ? 1:-1 );
    for (const c of children) {
      (c as CategoryWithChildren).children = findChildren(c.key ?? '');
    }
    if (children.length === 0) {
      return undefined;
    }
    return children;
  };
  const tree = findChildren('') ?? [];
  return tree;
}
