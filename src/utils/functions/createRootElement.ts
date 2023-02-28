export const createRootElement = (id: string) => {
  const rootEl = document.getElementById(id);
  if (rootEl) {
    return rootEl;
  }
  const root = document.createElement('div');
  root.id = id;
  document.body.appendChild(root);
  return root;
};
