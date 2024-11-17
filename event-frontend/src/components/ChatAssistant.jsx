import { useEffect } from 'react';

const ChatAssistant = () => {
  useEffect(() => {
    const divElement = document.createElement('div');
    const iframe = document.createElement('iframe');

    divElement.style.position = 'fixed';
    divElement.style.bottom = '20px';
    divElement.style.right = '20px';
    divElement.style.zIndex = '1000';

    iframe.style.width = '300px';
    iframe.style.height = '400px';
    iframe.style.border = 'none';

    divElement.appendChild(iframe);
    document.body.appendChild(divElement);

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(`
      <body>
        <script>
          document.addEventListener('DOMContentLoaded', function () {
            const scriptId = 'lipy-chat';
            if (document.getElementById(scriptId)) return;
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://cdn.lipy.ai/packages/webchat.js';
            script.onload = function () {
              window.LipyWebchat({
                apiKey: "GrQJIvoHOUx6IWdXu0pJUKj7YTscQE", // Add your API Key
                orgId: "nmGlPoYzXdw3l4mz", // Add your Org ID
              });
            };
            script.onerror = function () {
              console.error('Failed to load the Lipy webchat script.');
            };
            document.body.appendChild(script);
          });
        </script>
      </body>
    `);
    iframe.contentWindow.document.close();

    return () => {
      document.body.removeChild(divElement);
      const lipyWebchatDiv = document.getElementById('lipy-webchat');
      if (lipyWebchatDiv) {
        document.body.removeChild(lipyWebchatDiv);
      }
    };
  }, []);

  return null;
};

export default ChatAssistant;
