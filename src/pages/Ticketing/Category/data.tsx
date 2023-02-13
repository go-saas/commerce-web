import { Ticketingapicategoryv1Category, TicketingCategoryServiceApi } from '@gosaas/commerce-api';
export type CategoryWithChildren = {
  children?: CategoryWithChildren[];
} & Ticketingapicategoryv1Category;

export async function getAllData() {
  const resp = await new TicketingCategoryServiceApi().ticketingCategoryServiceListCategory2({
    body: { pageOffset: 0, pageSize: -1 },
  });
  return resp.data?.items ?? [];
}

export function transformAsTree(all: Array<Ticketingapicategoryv1Category>) {
  const findChildren = (parent = '') => {
    const children = all
      .filter((p) => p.parent === parent)
      .sort((a, b) => (a.key! > b.key! ? 1 : -1));
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

export async function getTreeData(): Promise<CategoryWithChildren[]> {
  const all = await getAllData();
  return transformAsTree(all);
}

export function transformAsTreeSelect(all: Array<Ticketingapicategoryv1Category>) {
  const tree = transformAsTree(all);
  const transform = (menus: CategoryWithChildren[]) => {
    return menus.map((p): any => {
      return {
        title: p.name + '(' + p.key + ')',
        value: p.key!,
        children: p.children ? transform(p.children) : undefined,
      };
    });
  };
  return transform(tree);
}

export async function getTreeSelectData() {
  const all = await getAllData();
  return transformAsTreeSelect(all);
}
