import { useState } from 'react';

function useClipboardCopy() {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
    }
  };
  return [isCopied, handleCopyClick];
}

export default useClipboardCopy;
