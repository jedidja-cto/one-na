import { useState } from 'react';

export function useToast() {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState('default');

  const showToast = (msg, type = 'default') => {
    setMessage(msg);
    setType(type);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };

  return { message, isVisible, type, showToast };
}
