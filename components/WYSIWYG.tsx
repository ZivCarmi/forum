"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { EditorProps } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const WYSIWYG = ({ htmlContent }: { htmlContent?: string }) => {
  const [editorState, setEditorState] = useState(() => {
    if (!htmlContent) {
      return EditorState.createEmpty();
    }

    const blocksFromHTML = convertFromHTML(htmlContent);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    return EditorState.createWithContent(state);
  });
  const {
    setValue,
    formState: { isSubmitted },
  } = useFormContext();

  const onEditorStateChange = (editor: EditorState) => {
    const currentEditor = editor.getCurrentContent();
    const isEditorEmpty = currentEditor.getPlainText().trim() === "";

    setEditorState(editor);

    if (isEditorEmpty) {
      return setValue("message", "", {
        shouldValidate: isSubmitted && true,
      });
    }

    return setValue("message", draftToHtml(convertToRaw(currentEditor)), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <Editor
      toolbarClassName="wysiwyg-toolbar toolbar"
      wrapperClassName="wysiwyg-wrapper"
      editorClassName="wysiwyg-editor"
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorStyle={{ minHeight: "225px" }}
    />
  );
};

export default WYSIWYG;
