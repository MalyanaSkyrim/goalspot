import { t } from "../../trpc";
import { authProcedure } from "../../trpc/procedures";
import { createField } from "./field.handler";
import { createFieldSchema } from "./field.schema";

const fieldRouter = t.router({
  createField: authProcedure.input(createFieldSchema).mutation(createField),
});

export default fieldRouter;
