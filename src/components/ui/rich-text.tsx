import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';

interface InputProps {
    control: any;
    name: string;
    rules?: Object;
}

const RichTextEditor = ({ name, control, rules, ...rest}: InputProps) => {
    const [ReactQuill, setReactQuill] = useState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('react-quill').then((mod) => {
                setReactQuill(mod)
            })
        }
    }, [])

    if (ReactQuill) {
        const Editor = React.forwardRef((props, ref) => {
            return <ReactQuill.default
                theme="snow" 
                {...props}
                ref={ref}
            />
        })

        return (
            <Controller
                name={name}
                control={control}
                rules={rules}
                {...rest}
                render={({ field }) => 
                    <Editor {...field} />
                }
            />
        );
    }
    return null;
}
export default RichTextEditor;
