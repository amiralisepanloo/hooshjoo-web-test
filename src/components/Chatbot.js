// src/components/Chatbot.js
import React, { useState } from 'react';
import styles from './Chatbot.module.css';

function Chatbot() {
  // State برای نگهداری لیست پیام‌ها
  const [messages, setMessages] = useState([]);

  // State برای نگهداری متن پیام فعلی کاربر
  const [inputText, setInputText] = useState('');

  // تابعی که وقتی کاربر روی دکمه "ارسال" کلیک می‌کنه، صدا زده میشه
  const handleSendMessage = () => {
    // اگه پیام خالی بود، کاری نمی‌کنیم
    if (inputText.trim() === '') {
      return;
    }

    // یه پیام جدید می‌سازیم
    const newMessage = {
      text: inputText,
      sender: 'user', // پیام از طرف کاربره
      id: Date.now(), // یه ID یکتا برای پیام (برای key توی لیست)
    };

    // پیام جدید رو به لیست پیام‌ها اضافه می‌کنیم
    setMessages([...messages, newMessage]);

    // فیلد ورود متن رو خالی می‌کنیم
    setInputText('');

    // --- اینجا بعداً باید کد مربوط به ارسال پیام به بک‌اند رو اضافه کنیم ---
  };

  // تابعی که وقتی کاربر توی فیلد ورود متن تایپ می‌کنه، صدا زده میشه
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // تابعی که وقتی کاربر کلید Enter رو توی فیلد ورود متن فشار میده، صدا زده میشه
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatHeader}>
        {/* می‌تونیم اینجا یه عکس پروفایل کوچیک برای چت‌بات بذاریم */}
        <span>چت‌بات هوشجو</span>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.sender === 'user'
                ? styles.userMessage
                : styles.botMessage
            }
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="پیام خود را تایپ کنید..."
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // برای ارسال پیام با Enter
          className={styles.inputField}
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          ارسال
        </button>
      </div>
    </div>
  );
}

export default Chatbot;