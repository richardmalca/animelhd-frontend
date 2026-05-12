import { useEffect } from 'react';

interface ChatbroWindow extends Window {
    Chatbro?: unknown;
}

export function useChatbro(chatId: string = process.env.NEXT_PUBLIC_CHATBRO_ID || '197ap') {
    useEffect(() => {
        const win = window as unknown as ChatbroWindow;
        if (typeof window === 'undefined' || win.Chatbro) return;

        const loadChatbro = (chats: Record<string, unknown> | Record<string, unknown>[], async: boolean = true) => {
            const params = {
                embedChatsParameters: Array.isArray(chats) ? chats : [chats],
                lang: navigator.language,
                needLoadCode: typeof win.Chatbro === 'undefined',
                embedParamsVersion: localStorage.getItem('embedParamsVersion'),
                chatbroScriptVersion: localStorage.getItem('chatbroScriptVersion')
            };

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onload = function() {
                try {
                    const script = document.createElement('script');
                    script.text = xhr.responseText;
                    document.head.appendChild(script).parentNode?.removeChild(script);
                } catch {
                }
            };
            
            const encodedParams = btoa(unescape(encodeURIComponent(JSON.stringify(params))));
            xhr.open('GET', `https://www.chatbro.com/embed.js?${encodedParams}`, async);
            xhr.send();
        };

        loadChatbro({ encodedChatId: chatId });
    }, [chatId]);
}

