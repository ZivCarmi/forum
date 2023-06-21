type Forum = {
  id: string;
  categoryId: string;
  title: string;
  description?: string;
  subForums?: string[];
  topics?: string[];
};

export default Forum;
