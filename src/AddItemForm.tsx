import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./App.module.css";

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
                <input
                    className={error ? styles.error : ''}
                    type="text"
                    value={itemTitle}
                    onChange={onInputChange}
                    onKeyPress={onEnter}
                />
                <button onClick={addItemHandler}>+</button>
            </div>
            {
                error &&
                <div className={styles.errorMessage}>
                    Task shouldn't be empty
                </div>
            }
        </>
    );
};

export default AddItemForm;