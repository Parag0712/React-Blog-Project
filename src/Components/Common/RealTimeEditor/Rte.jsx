import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import config from '../../../config/config'


function Rte({ name, control, label = 'Parag', defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && (
                <label htmlFor="" className="self-start mb-2 inline-block text-base font-medium text-white-900">
                    {label}
                </label>
            )
            }
            
            <Controller
                name={name || "content"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={config.appwrite_rte_apiKey}
                        initialValue={defaultValue}
                        init={
                            {
                                resize: false,
                                branding: false,
                                menubar: true,
                                height:280,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px  }"
                            }
                        }
                        onEditorChange={onChange}
                    />

                 )} 
            /> 
        </div>
    )
}

export default Rte