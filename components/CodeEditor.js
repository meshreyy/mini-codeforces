'use client'
import CodeMirror from "@uiw/react-codemirror"
import { cpp } from "@codemirror/lang-cpp"

export function CodeEditor({ code, onChange }) {
  return (
    <CodeMirror
      value={code}
      height="400px"
      extensions={[cpp()]}
      onChange={onChange}
      theme="dark"
    />
  )
}
