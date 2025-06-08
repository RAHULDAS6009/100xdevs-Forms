import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { LabelBlock } from "./custom/Label";
import { Input } from "./custom/Input";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Label block.
    label: LabelBlock,
    input: Input,
  },
});
