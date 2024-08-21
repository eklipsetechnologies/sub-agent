import React from 'react'
import PropTypes from 'prop-types'

function SearchStorage(props) {

    const onChange = (text) => {
        if (text) {
            let query = props.data?.filter(e => {
                let match = e?.name?.toLowerCase()
                let queriedValue = text?.toLowerCase()
                if (match?.match(queriedValue)) {
                    return e;
                }
            })
            props.stateSetter(query)
        } else {
            props.onLoadData()
        }
    }
    return <input type="text" onInput={e => onChange(e.target.value)} placeholder="Search Storage" className="form-control w-100" />
}

SearchStorage.propTypes = {
    onLoadData: PropTypes.func.isRequired,
    stateSetter: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
}

export default SearchStorage

