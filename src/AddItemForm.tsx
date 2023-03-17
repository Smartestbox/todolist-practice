import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBoxOutlined} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = ({
                                                         addItem,
                                                     }) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setItemTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        if (itemTitle.trim()) {
            addItem(itemTitle.trim())
            setItemTitle('')
        }
        if (itemTitle.trim() === '') {
            setError(true)
        }
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (itemTitle.trim() && e.key === 'Enter') {
            addItem(itemTitle.trim())
            setItemTitle('')
        }
        if (itemTitle.trim() === '') {
            setError(true)
        }
    }


    return (
        <>
            <div>
                <TextField
                    variant={'outlined'}
                    label={'Type value'}
                    error={error}
                    helperText={error ? 'Title is required' : ''}
                    type="text"
                    value={itemTitle}
                    onChange={onInputChange}
                    onKeyPress={onEnter}
                />
                <IconButton
                    onClick={addItemHandler}
                    color='primary'
                >
                    <AddBoxOutlined />
                </IconButton>
            </div>
        </>
    );
};

export default AddItemForm;