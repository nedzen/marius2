/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useRef, useState } from 'react';

const Subscribe = () => {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();

    // 3. Send a request to our API with the user's email address.
    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error);

      return;
    }

    // 5. Clear the input value and show a success message.
    inputEl.current.value = '';
    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
  };

  return (
    <form onSubmit={subscribe} className="subscribeForm">
      <div className="subscribeWrap">
        <input
          id="email-input"
          name="email"
          placeholder="Get my newsletter"
          ref={inputEl}
          required
          type="email"
          className="textInput"
        />
        <button className="btn" type="submit">
          Subscribe
        </button>
      </div>
      <div className="message">{message ? <mark>{message}</mark> : ``}</div>
    </form>
  );
};

export default Subscribe;
