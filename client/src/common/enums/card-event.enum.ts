const CardEvent = {
  CREATE: 'card:create',
  REORDER: 'card:reorder',
  RENAME: 'card:rename',
  DELETE: 'card:delete',
  DUPLICATE: 'card:duplicate',
  CHANGE_DESCRIPTION: 'card:change-description',
} as const;

export default CardEvent;
