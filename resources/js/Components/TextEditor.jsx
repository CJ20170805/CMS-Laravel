import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const TinyMCEEditor = ({value='', onChange}) => {
    const editorRef = useRef(null);

    const handleEditorChange = (content) => {
        if (onChange) {
            onChange(content);
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setContent(value);
        }
    }, [value]);


    return (
        <div>
            <Editor
                apiKey='as6m9p8vd6te20wmrkqnoy1eds83xbwvo1mfmydhutmppnwk'
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
                value={value}
            />
        </div>
    );
};

export default TinyMCEEditor;
