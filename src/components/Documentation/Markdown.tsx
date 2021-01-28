import React from "react"
import { renderMarkdown } from "../../_core/utils"



export const Markdown = (props: { markdown: string, narrow?: boolean }) => {
    return <div className={`markdown-body ${props.narrow ? 'narrow' : ''}`} dangerouslySetInnerHTML={{
        __html: renderMarkdown(props.markdown)
    }}></div>
};