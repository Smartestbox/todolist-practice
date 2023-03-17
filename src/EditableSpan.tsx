import React, {ChangeEvent, useState} from 'react';
import styles from "./App.module.css";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    updateTitleHandler: (title: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsType> = ({
                                                           title,
                                                           updateTitleHandler,
                                                       }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [spanTitle, setSpanTitle] = useState(title)
    const onSpanClick = () => {
        setEditMode(true)
    }
    const onInputBlur = () => {
        setEditMode(false)
        updateTitleHandler(spanTitle)
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSpanTitle(e.currentTarget.value)
    }

    return (
        <>
            {
                editMode ?
                    <TextField
                        onBlur={onInputBlur}
                        onChange={onInputChange}
                        value={spanTitle}
                        autoFocus
                    /> :
                    <span
                        onDoubleClick={onSpanClick}
                    >
                        {spanTitle}
                    </span>
            }
        </>
    );
};

export default EditableSpan;