import Select from 'react-select'

const selectCustomStyles = {
    control: (provided, state) => ({
        // ...provided,
        // border: '2px solid #d1d5db',
        // borderWidth: 2,
        // outline: 'none',
        // boxShadow: 'none',
        // borderColor: state.isFocused ? '#15803d !important' : '#d1d5db !important',
      }),
    option: (provided, state) => ({
        // ...provided,
        // backgroundColor: '#15803d'
    })
}

export default function Search({ tags, onSearch }) {
    const [selectedTags, setSelectedTags] = useState([])

    const handleTagChange = (newValue) => {
        let temp = newValue.map(({value}) => value)
        setSelectedTags(temp)
    }

    return (
        <div className="flex items-center">
            <Select onChange={handleTagChange} styles={selectCustomStyles} options={tags} isMulti />
        </div>
    )
}