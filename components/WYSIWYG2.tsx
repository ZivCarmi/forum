import React from "react";
import { EditorProps } from "react-draft-wysiwyg";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

type WYSIWYGProps = {
  control: any;
  name: string;
};

const WYSIWYG2: React.FC<WYSIWYGProps> = ({ control, name }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <FormLabel>Message</FormLabel>
          <FormControl>
            <Editor
              toolbarClassName="wysiwyg-toolbar toolbar"
              wrapperClassName="wysiwyg-wrapper"
              editorClassName="wysiwyg-editor"
              editorStyle={{ minHeight: "225px" }}
              editorState={value}
              onEditorStateChange={onChange}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "history",
                  "embedded",
                  "emoji",
                  "image",
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WYSIWYG2;
