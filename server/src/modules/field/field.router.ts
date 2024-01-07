import { t } from "../../trpc";
import { authProcedure } from "../../trpc/procedures";
import {
  addFieldImages,
  createField,
  getFieldImages,
  removeFieldImages,
} from "./field.handler";
import {
  addFieldImagesSchema,
  createFieldSchema,
  fieldIdSchema,
  removeFieldImagesSchema,
} from "./field.schema";

const fieldRouter = t.router({
  createField: authProcedure.input(createFieldSchema).mutation(createField),
  addFieldImages: authProcedure
    .input(addFieldImagesSchema)
    .mutation(addFieldImages),
  getFieldImages: authProcedure.input(fieldIdSchema).query(getFieldImages),
  removeFieldImages: authProcedure
    .input(removeFieldImagesSchema)
    .mutation(removeFieldImages),
});

export default fieldRouter;
