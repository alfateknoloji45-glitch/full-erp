import React, { useState, useEffect, useRef } from 'react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Merhaba! Size nasıl yardımcı olabilirim? 😊', time: '14:30' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulated bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'Mesajınızı aldık! Bir temsilcimiz en kısa sürede size dönüş yapacak. 🙏',
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: '24px', right: '24px',
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            fontSize: '28px', zIndex: 9999
          }}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '380px', height: '550px',
          background: 'white', borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column',
          zIndex: 9999
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white', padding: '20px',
            borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: '700', fontSize: '18px' }}>💬 Canlı Destek</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Genellikle 2 dk içinde yanıt</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)', border: 'none',
                color: 'white', width: '32px', height: '32px',
                borderRadius: '50%', cursor: 'pointer', fontSize: '20px'
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '20px',
            display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: msg.sender === 'user' ? '#667eea' : '#f3f4f6',
                  color: msg.sender === 'user' ? 'white' : '#1f2937'
                }}>
                  <div style={{ fontSize: '14px', lineHeight: '1.5' }}>{msg.text}</div>
                  <div style={{
                    fontSize: '11px', marginTop: '4px',
                    opacity: 0.7, textAlign: 'right'
                  }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '16px', borderTop: '1px solid #e5e7eb',
            display: 'flex', gap: '12px'
          }}>
            <input
              type="text"
              placeholder="Mesajınızı yazın..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              style={{
                flex: 1, padding: '12px', border: '2px solid #e5e7eb',
                borderRadius: '8px', fontSize: '14px'
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: '12px 20px', background: '#667eea', color: 'white',
                border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Gönder
            </button>
          </div>
        </div>
      )}
    </>
  );
}
