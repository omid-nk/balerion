export function buildCommentTree(comments) {
  const map = new Map();
  const roots = [];

  comments.forEach((comment) => {
    map.set(comment.id, {
      ...comment,
      replies: [],
    });
  });

  comments.forEach((comment) => {
    const current = map.get(comment.id);

    if (!comment.parent_id) {
      roots.push(current);
      return;
    }

    const parent = map.get(comment.parent_id);

    if (parent) {
      parent.replies.push(current);
    }
  });

  return roots;
}
