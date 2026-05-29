/** 範例用介面 */
export interface ISample {
  id: number;
  name: string;
  description?: string; // Optional property
  createdAt: Date;
  updatedAt: Date;
}
