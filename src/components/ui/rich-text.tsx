import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';

interface InputProps {
    control: any;
    name: string;
    rules?: Object;
}

const RichTextEditor = ({ name, control, rules, ...rest}: InputProps) => {
    const [value, setValue] = useState('');
    const [ReactQuill, setReactQuill] = useState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('react-quill').then((mod) => {
                setReactQuill(mod)
            })
        }
    }, [])

    if (ReactQuill) {
        return (
            <Controller
                name={name}
                control={control}
                rules={{...rules, onChange: setValue}}
                {...rest}
                render={({ field }) => 
                    <ReactQuill.default
                        {...field} 
                        theme="snow" 
                        value={value} 
                        onChange={setValue}
                    />}
            />
        );
    }
    return null;
}
export default RichTextEditor;
