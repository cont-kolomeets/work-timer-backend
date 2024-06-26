import { removeMissingProperties } from "../utils/json-util";
import { toNumberOrUndefined } from "../utils/number-util";
import { Request } from "../utils/query/interfaces";
import { requestToParams } from "../utils/query/request-util";
import { CollectionItem } from "./intefaces-collections";

export const TASKS_COLLECTION = {
  name: "tasks",
  tasks_by_user_year_month: "tasks_by_user_year_month",
};

export type TaskCollectionItemData = {
  user: string;
  year: number;
  month: number;
  link: string;
  label: string;
  time: number;
  type: "task" | "bug" | "unset";
  created: number;
  modified: number;
};

export const taskToJson = (
  task: CollectionItem<TaskCollectionItemData>
): TaskCollectionItemData & { id: string } => {
  return {
    id: task.ref.id,
    ...task.data,
  };
};

export type TaskRequestParams = Partial<{
  token: string;
  year: number;
  month: number;
  link: string;
  label: string;
  time: number;
  type: "task" | "bug" | "unset";
  created: number;
  modified: number;
}>;

export const taskDataFromReq = (req: Request<TaskRequestParams>) => {
  const { year, month, link, label, time, type, created, modified } =
    requestToParams(req);
  return removeMissingProperties({
    year: toNumberOrUndefined(year),
    month: toNumberOrUndefined(month),
    link,
    label,
    time: toNumberOrUndefined(time),
    type,
    created: toNumberOrUndefined(created),
    modified: toNumberOrUndefined(modified),
  });
};
