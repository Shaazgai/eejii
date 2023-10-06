import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import React, { useEffect, useRef } from 'react';
// import SimpleuploadPlugin from 'ckeditor5-simple-upload/src/simpleupload';

interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string;
}

export default function CKeditor({
  onChange,
  editorLoaded,
  name,
  value,
}: CKeditorProps) {
  const editorRef = useRef<{
    CKEditor: typeof CKEditor;
    ClassicEditor: typeof ClassicEditor;
  }>();
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
  }, []);
  // ClassicEditor.create(document.querySelector('#editor'), {
  //   plugins: [SimpleUploadAdapter /* ... */],
  //   toolbar: [
  //     /* ... */
  //   ],
  //   simpleUpload: {
  //     // The URL that the images are uploaded to.
  //     uploadUrl: 'http://example.com',
  //
  //     // Enable the XMLHttpRequest.withCredentials property.
  //     withCredentials: true,
  //
  //     // Headers sent along with the XMLHttpRequest to the upload server.
  //     headers: {
  //       'X-CSRF-TOKEN': 'CSRF-Token',
  //       Authorization: 'Bearer <JSON Web Token>',
  //     },
  //   },
  // })
  //   .then(/* ... */)
  //   .catch(/* ..*/);
  //
  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={{
            toolbar: [
              'heading',
              'imageUpload',
              'link',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              'blockQuote',
            ],
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}
