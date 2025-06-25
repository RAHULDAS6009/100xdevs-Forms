import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { LabelBlock } from "./custom/Label";
import { InputBlock } from "./custom/Input";
import { SelectBlock } from "./custom/Select";
import SubmitBlock from "./custom/Submit";
const { audio, image, ...remainingBlockSpecs } = defaultBlockSpecs;
export const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Label block.
    label: LabelBlock,
    input: InputBlock,
    select: SelectBlock,
    submit: SubmitBlock,
  },
});

export type CustomSchema = typeof schema;
