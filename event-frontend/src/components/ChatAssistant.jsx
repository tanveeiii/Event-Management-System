import { useEffect } from 'react';

const ChatAssistant = () => {
useEffect(() => {

    const divElement = document.createElement('div');
    const iframe = document.createElement('iframe');

    divElement.appendChild(iframe);
    document.body.appendChild(divElement);


    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write( `
    <body>
        <script>
        document.addEventListener('DOMContentLoaded', function () {
            const e = 'lipy-chat';
            if (document.getElementById(e)) return;
            const t = document.createElement('script');
            t.id = e;
            t.src = 'https://cdn.lipy.ai/packages/webchat.js';
            t.onload = function () {
            window.LipyWebchat({
                apiKey: 'GrQJIvoHOUx6IWdXu0pJUKj7YTscQE', // Add your API Key
                orgId: 'nmGlPoYzXdw3l4mz', // Add your Org ID
            });
            };
            t.onerror = function () {
            console.error('Failed to load the Lipy webchat script.');
            };
            document.body.appendChild(t);
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