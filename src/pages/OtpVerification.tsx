
import React, { useState, useEffect, useRef } from 'react';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // If backspace is pressed and current field is empty, focus previous field
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendCode = () => {
    // Reset OTP fields
    setOtp(['', '', '', '', '', '']);
    // Reset timer
    setTimer(300);
    // Focus first input
    inputRefs.current[0].focus();
    console.log('Resending code...');
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    console.log('Verifying OTP:', otpCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max mx-auto bg-white p-8 rounded-3xl shadow-sm">
      <h1 className="text-center text-3xl font-bold mb-6">OTP Verification</h1>
      
      <p className="text-center mb-4 text-lg">
        An OTP has been sent to your provided email address.
      </p>
      
      <p className="text-center mb-8 text-gray-600">
        Please check your inbox (and spam/junk folder just in case)
        <br />and enter the code below to continue.
      </p>
      
      <div className="flex justify-between mb-8">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-14 h-14 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
        ))}
      </div>
      
      <div className="flex justify-between items-center mb-8 text-sm">
        <div className="text-gray-600">
          Remaining Time: {formatTime(timer)}s
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Didn't receive code?</span>
          <button 
            onClick={handleResendCode}
            className="text-black font-medium"
          >
            Resend code
          </button>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full h-14 text-white text-base cursor-pointer bg-black mt-1 mb-4 mx-0 rounded-lg border-[none]"
      >
        Verify Now
      </button>
    </div>
    </div>
  );
};

export default OTPVerification;