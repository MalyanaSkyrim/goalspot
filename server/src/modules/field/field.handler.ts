import { removeImage, uploadImage } from "../../services/storage";
import { Context } from "../../trpc/context";
import {
  AddFieldImagesInput,
  CreateFieldInput,
  FieldIdInput,
  RemoveFieldImagesInput,
} from "./field.schema";

export const createField = ({
  ctx,
  input,
}: {
  input: CreateFieldInput;
  ctx: Context;
}) => {
  const userId = ctx.req.userId;
  return ctx.db.pitch.create({ data: { ...input, userId } });
};

export const addFieldImages = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: AddFieldImagesInput;
}) => {
  await Promise.all(
    input.images.map(async (image) => {
      const imageUrl = await uploadImage(image, input.fieldId);
      await ctx.db.pitchImage.upsert({
        create: { pitchId: input.fieldId, url: imageUrl, index: image.index },
        update: { url: imageUrl },
        where: { index: image.index },
      });
    })
  );
};

export const getFieldImages = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: FieldIdInput;
}) => {
  const images = await ctx.db.pitchImage.findMany({
    where: { pitchId: input.fieldId },
  });
  return images;
};

export const removeFieldImages = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: RemoveFieldImagesInput;
}) => {
  const { fieldId, indexes } = input;

  indexes.forEach(async (index) => {
    await removeImage(fieldId, index.toString());
  });

  await ctx.db.pitchImage.deleteMany({
    where: { index: { in: indexes } },
  });
};
