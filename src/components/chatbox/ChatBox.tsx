import React, { useState } from 'react';
import './ChatBox.scss';

import { Send as SendIcon } from 'react-feather';

interface ChatBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    placeholder?: string;
    buttonLabel?: string;
    onSend?: (message: string) => void;
    buttonStyle?: 'regular' | 'action' | 'alert' | 'flush';
    iconColor?: 'red' | 'green' | 'grey';
}

export function ChatBox({
    placeholder = 'Type a message...',
    buttonLabel = 'Send',
    onSend = () => { },
    buttonStyle = 'regular',
    iconColor = 'grey',
    ...rest
}: ChatBoxProps) {
    const [message, setMessage] = useState('');

    const handleSendClick = () => {
        if (message.trim()) {
            onSend(message);
            setMessage(''); // Clear input after sending
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendClick();
        }
    };

    const buttonClassList = [`chatbox-button`, `button-style-${buttonStyle}`, `icon-${iconColor}`];

    return (
        <div data-component="ChatBox" className="chatbox" {...rest}>
            <input
                type="text"
                className="chatbox-input"
                placeholder={placeholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className={buttonClassList.join(' ')}
                onClick={handleSendClick}
                aria-label="Send message"
            >
                <span className="button-icon">
                    <SendIcon />
                </span>
                <span className="button-label">{buttonLabel}</span>
            </button>
        </div>
    );
}
