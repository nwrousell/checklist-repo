import Select from 'react-select'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import useTags from "../hooks/useTags";

import { FirebaseContext, DarkModeContext } from './Layout';
import { BiSearch } from 'react-icons/bi';
import { StylesConfig } from 'react-select';

const MAX_TAGS = 3

export default function Search({ }) {
    const { db } = useContext(FirebaseContext)
    const { darkMode } = useContext(DarkModeContext)
    const [selectedTag, setSelectedTag] = useState([])
    const router = useRouter()
    const tags = useTags(db)

    const handleTagChange = (value) => {
        const temp = value.value.replace(" ", '-')
        // for(let tag of values) temp.push(tag.value.replace(' ', '-'))
        setSelectedTag(temp)
    }

    const handleSearch = async () => {
        // const url = `/?tags=${selectedTag.join('+')}`
        if(selectedTag.length == 0) return
        const url = `/?tag=${selectedTag}`
        await router.push(url)
        router.reload()
    }

    const selectCustomStyles = {
        container: (provided, state) => ({
            width: 400,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: darkMode ? '#e5e7eb !important' : '#374151 !important',
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: darkMode ? '#1f2937' : 'white',
            borderWidth: 2,
            borderRadius: state.isFocused ? '0.25rem 0.25rem 0 0' : '0.25rem',
            outline: 'none',
            boxShadow: 'none',
            borderColor: state.isFocused ? '#15803d !important' : darkMode ? '#374151 !important' : '#d1d5db !important',
          }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#dcfce7' : darkMode ? '#1f2937' : 'white',
            color: state.isFocused ? 'black' : darkMode ? '#e5e7eb' : 'black'
        }),
        menu: (provided, state) => ({
            position: 'absolute',
            width: '100%',
            maxWidth: '400px',
            border: '2px solid #d1d5db',
            borderTop: '0',
            borderRadius: '0 0 0.25rem 0.25rem',
            backgroundColor: darkMode ? '#1f2937' : 'white',
        }),
        dropdownIndicator: (provided, state) => ({
            color: darkMode ? '#374151 !important' : '#d1d5db !important',
            marginRight: '0.5em'
        }),
        indicatorSeparator: (provided, state) => ({
            display: 'none'
        })
    }

    return (
        <div className="flex items-center">
            <Select onChange={handleTagChange} placeholder='Search' styles={selectCustomStyles as StylesConfig<any, false, any>} options={tags} />
            <BiSearch size={28} onClick={handleSearch} className="ml-2 text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-400" />
        </div>
    )
}
