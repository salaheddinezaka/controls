import Fuse from 'fuse.js'
import { useEffect, useMemo } from 'react'
import { updateSuggestions } from '../controls/student-loan-v2/state/actions'
import { usePSLContext } from '../controls/student-loan-v2/state/context'

export default function useFuzzySearch(data, options) {
  const {
    state: { searchValue },
    dispatch
  } = usePSLContext()

  const searcher = useMemo(() => {
    const defaultOptions = { tokenize: true, threshold: 0.1 }
    return new Fuse(data, { ...defaultOptions, ...options })
  }, [data, options])

  useEffect(() => {
    dispatch(updateSuggestions(searcher.search(searchValue)))
  }, [searchValue])
}
