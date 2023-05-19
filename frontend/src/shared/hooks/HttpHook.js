import { useCallback, useState } from "react"
import axios from "axios"
export const useHttpHook = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const sendRequest = useCallback(async (url, method = "get", body, headers) => {
    try {
      setIsLoading(true)
      const response = await axios({
        url,
        method,
        data: body,
        headers,
      })
      setIsLoading(false)
      return response.data
    } catch (error) {
      setIsLoading(false)
      setErrorMessage(error.response ? error.response.message : error.message)
      throw error
    }
  }, [])

  return { isLoading, errorMessage, sendRequest }
}
