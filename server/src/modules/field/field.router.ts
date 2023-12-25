import { t } from "../../trpc";
import { authProcedure } from "../../trpc/procedures";
import { addFieldImages, createField, getFieldImages } from "./field.handler";
import {
  addFieldImagesSchema,
  createFieldSchema,
  fieldIdSchema,
} from "./field.schema";

const fieldRouter = t.router({
  createField: authProcedure.input(createFieldSchema).mutation(createField),
  addFieldImages: authProcedure
    .input(addFieldImagesSchema)
    .mutation(addFieldImages),
  getFieldImages: authProcedure.input(fieldIdSchema).query(getFieldImages),
});

export default fieldRouter;
