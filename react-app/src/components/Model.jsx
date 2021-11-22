import React, { useRef } from "react";
import ReactInputDateMask from 'react-input-date-mask';
import { Editor } from '@tinymce/tinymce-react';

const Modal = (props) => {

    const editorRef = useRef(null);

    const handleDateChange = (value) => {
        props.onChange({ target: { name: 'date', value: value } });
    };

    const handleEditorChange = (e) => {
        props.onChange({ target: { name: 'content', value: e.target.getContent() } });
    };

    return (
        <div>
            <div style={ { display: 'block' } } className="modal fade show" tabIndex={ -1 } role="dialog" aria-labelledby="myModalLabel" >
                <div className="modal-dialog w-40p" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Blog</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={ props.modelToggle } aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body mx-3">
                            <div className="row">

                                <div className="col-md-6 form-group">
                                    <input name="title" type="text" className="form-control" placeholder="Blog Title" onChange={ (e) => props.onChange(e) } />
                                    { props.errors.title && <div className="error p-1">{ props.errors.title }</div> }
                                    { props.errors.slug && <div className="error p-1">{ 'Title' + props.errors.slug }</div> }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col form-group">
                                    <ReactInputDateMask
                                        mask='dd/mm/yyyy'
                                        showMaskOnFocus={ true }
                                        className="form-control"
                                        value={ props.blog_date }
                                        onChange={ handleDateChange }
                                        showMaskOnHover={ true }
                                        placeholder="Time" />
                                    { props.errors.date && <div className="error p-1">{ props.errors.date }</div> }
                                </div>
                            </div>

                            <div className="row">
                                <div className="col form-group">
                                    <Editor
                                        apiKey='1tsxysty45bl6b71ocsspgqz8211i5uckhku5unk6ffod760'
                                        onInit={ (evt, editor) => editorRef.current = editor }

                                        init={ {
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image',
                                                'charmap print preview anchor help',
                                                'searchreplace visualblocks code',
                                                'insertdatetime media table paste wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent'
                                        } }
                                        onChange={ handleEditorChange }
                                    />
                                    { props.errors.content && <div className="error p-1">{ props.errors.content }</div> }
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <button type="submit" className="btn btn-primary" onClick={ props.handleSubmit }>Submit</button>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

};

export default Modal;