import { useEffect } from "react"

window.LipyWebchat = function (val) {
  console.log("LipyWebchat initialized with:", val);
};

const ChatAssistant = () => {
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const existingScript = document.getElementById("lipy-webchat-script")

      if (!existingScript) {
        const script = document.createElement("script")
        script.id = "lipy-webchat-script"
        script.src = "https://cdn.lipy.ai/packages/webchat.js"
        script.async = true

        const initializeChatAssistant = () => {
          window.LipyWebchat({
            apiKey: "GrQJIvoHOUx6IWdXu0pJUKj7YTscQE",
            orgId: "nmGlPoYzXdw3l4mz",
          })
        }

        script.onload = initializeChatAssistant
        document.body.appendChild(script)
      }
    }, 100)
    return () => {
      clearTimeout(debounceTimeout)
      const script = document.getElementById("lipy-webchat-script")
      if (script) {
        script.onload = null
        document.body.removeChild(script)
      }
    }
  }, [])

  return null
}

export default ChatAssistant