import React, { useState, FormEvent } from 'react';
interface PollOption {
  id: string;
  text: string;
}
interface PollFormData {
  question: string;
  options: PollOption[];
  allowMultipleAnswers: boolean;
  deadline?: Date;
}
export default function Index() {
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [polls, setPolls] = useState<PollFormData[]>([]);
  const [formData, setFormData] = useState<PollFormData>({
    question: '',
    options: [
      { id: '1', text: 'Yes ! it will increase' },
      { id: '2', text: 'No ! There wont be no rise' }
    ],
    allowMultipleAnswers: false,
  });
  const handleAddOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { id: String(Date.now()), text: '' }]
    }));
  };
  const handleRemoveOption = (id: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== id)
    }));
  };
  const handleUpdateOption = (id: string, text: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map(opt =>
        opt.id === id ? { ...opt, text } : opt
      )
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.question.trim() === '') {
      alert('Please enter a question');
      return;
    }
    if (formData.options.length < 2) {
      alert('Please add at least two options');
      return;
    }
    if (formData.options.some(opt => opt.text.trim() === '')) {
      alert('Please fill in all options');
      return;
    }
    setPolls(prev => [...prev, formData]);
    setShowPollCreator(false);
    setFormData({
      question: '',
      options: [
        { id: '1', text: 'Yes ! it will increase' },
        { id: '2', text: 'No ! There wont be no rise' }
      ],
      allowMultipleAnswers: false,
    });
  };
  const handleCancel = () => {
    setShowPollCreator(false);
    setFormData({
      question: '',
      options: [
        { id: '1', text: 'Yes ! it will increase' },
        { id: '2', text: 'No ! There wont be no rise' }
      ],
      allowMultipleAnswers: false,
    });
  };
  return (
    <main className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-center">Poll Creator</h1>
      {showPollCreator ? (
        <section className="relative z-10">
          <form
            onSubmit={handleSubmit}
            className="w-[319px] h-[403px] relative bg-white rounded-lg max-md:w-full max-md:max-w-[319px] max-md:mx-auto max-md:my-0 max-sm:w-full max-sm:max-w-[319px] max-sm:mx-auto max-sm:my-0"
            role="dialog"
            aria-labelledby="poll-creator-title"
          >
            <header>
              <div className="flex h-11 items-center w-full box-border bg-neutral-100 pt-3 pb-[11px] px-6 max-sm:pt-3 max-sm:pb-[11px] max-sm:px-4">
                <button 
                  onClick={handleCancel}
                  type="button"
                  className="flex items-center gap-2 text-black"
                  aria-label="Close poll creator"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.85062 10.3274L15.3447 16.8215L14.1662 18L7.67212 11.506L1.17804 18L-0.000463486 16.8215L6.49362 10.3274L-0.000463486 3.83337L1.17804 2.65479L7.67212 9.14888L14.1662 2.65479L15.3447 3.83337L8.85062 10.3274Z" fill="#555555"/>
                  </svg>
                  <span className="font-['Linear_Grotesk'] text-sm">Create poll</span>
                </button>
              </div>
            </header>
            <main className="p-6 max-sm:p-4">
              <div className="mb-6">
                <label className="text-black text-xs font-medium block mb-2">
                  Question
                </label>
                <div className="relative w-full">
                  <textarea
                    value={formData.question}
                    onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                    className="w-full h-[60px] rounded border box-border bg-white border-solid border-[rgba(158,158,158,0.50)] p-2 text-[#555] text-[10px] font-normal resize-none"
                    placeholder="Enter your question"
                    maxLength={500}
                  />
                  <div className="text-[#9E9E9E] text-[8px] italic font-normal absolute right-2 bottom-2">
                    {formData.question.length}/500
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-[9px]">
                  <span className="text-black text-xs font-medium">Options</span>
                  <button
                    onClick={handleAddOption}
                    type="button"
                    className="text-black text-[8px] font-medium hover:opacity-80"
                  >
                    + Add another option
                  </button>
                </div>
                {formData.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-4 h-6 mb-3">
                    <button type="button" className="text-[#555]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.01294 13.2419C7.06334 12.4407 7.25521 11.6778 7.56387 10.9781C6.5405 10.8831 5.6121 10.4575 4.8884 9.80974L5.77761 8.81621C6.36779 9.34447 7.14554 9.66487 7.99967 9.66487C8.11721 9.66487 8.23307 9.65881 8.34707 9.64701C9.48434 8.14427 11.2437 7.13854 13.2419 7.01294C12.7791 4.53885 10.6081 2.66634 7.99967 2.66634C5.05415 2.66634 2.66634 5.05415 2.66634 7.99967C2.66634 10.6081 4.53885 12.7791 7.01294 13.2419Z" fill="#555555"/>
                      </svg>
                    </button>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleUpdateOption(option.id, e.target.value)}
                      className="text-black text-[8px] font-normal h-6 rounded border flex-1 box-border bg-neutral-100 pt-1.5 pb-[7px] px-4 border-solid border-[rgba(158,158,158,0.30)]"
                    />
                    <button
                      onClick={() => handleRemoveOption(option.id)}
                      type="button"
                      className="text-[#555] hover:opacity-80"
                      aria-label="Delete option"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66634 2.66634C4.66634 2.31272 4.80682 1.97358 5.05687 1.72353C5.30691 1.47348 5.64605 1.33301 5.99967 1.33301H9.99967C10.3533 1.33301 10.6924 1.47348 10.9425 1.72353C11.1925 1.97358 11.333 2.31272 11.333 2.66634V3.99967H13.9997C14.1765 3.99967 14.3461 4.06991 14.4711 4.19494C14.5961 4.31996 14.6663 4.48953 14.6663 4.66634C14.6663 4.84315 14.5961 5.01272 14.4711 5.13775C14.3461 5.26277 14.1765 5.33301 13.9997 5.33301H13.287L12.709 13.4277C12.6851 13.7641 12.5345 14.0789 12.2878 14.3087C12.041 14.5386 11.7162 14.6663 11.379 14.6663H4.61967C4.28243 14.6663 3.95772 14.5386 3.71093 14.3087C3.46414 14.0789 3.31362 13.7641 3.28967 13.4277L2.71301 5.33301H1.99967C1.82286 5.33301 1.65329 5.26277 1.52827 5.13775C1.40325 5.01272 1.33301 4.84315 1.33301 4.66634C1.33301 4.48953 1.40325 4.31996 1.52827 4.19494C1.65329 4.06991 1.82286 3.99967 1.99967 3.99967H4.66634V2.66634Z" fill="#555555"/>
                      </svg>
                    </button>
                    <button type="button" className="text-[#555]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.66699 4.66699C6.21928 4.66699 6.66699 4.21928 6.66699 3.66699C6.66699 3.11471 6.21928 2.66699 5.66699 2.66699C5.11471 2.66699 4.66699 3.11471 4.66699 3.66699C4.66699 4.21928 5.11471 4.66699 5.66699 4.66699Z" fill="#555555"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center h-[34px] mb-3">
                  <div className="flex flex-col gap-[5px]">
                    <div className="text-black text-[10px] font-medium">
                      Allow multiple answers
                    </div>
                    <div className="text-[#9E9E9E] text-[10px] font-medium">
                      Let people choose more than one option
                    </div>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, allowMultipleAnswers: !prev.allowMultipleAnswers }))}
                    type="button"
                    className={`w-[18px] h-[11px] relative ${
                      formData.allowMultipleAnswers ? 'bg-black' : 'bg-gray-300'
                    } rounded-full transition-colors`}
                    role="switch"
                    aria-checked={formData.allowMultipleAnswers}
                  >
                    <span
                      className={`block w-[10px] h-[10px] bg-white rounded-full absolute top-[0.5px] transition-transform ${
                        formData.allowMultipleAnswers ? 'translate-x-[8px]' : 'translate-x-[0.5px]'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex justify-between items-center h-[34px] mb-3">
                  <div className="flex flex-col gap-[5px]">
                    <div className="text-black text-[10px] font-medium">
                      Set deadline
                    </div>
                    <div className="text-[#9E9E9E] text-[10px] font-medium">
                      Choose when the poll will end
                    </div>
                  </div>
                  <button
                    onClick={() => {
                    }}
                    type="button"
                    className="h-6 px-2 rounded border border-[#9E9E9E] text-[#9E9E9E] text-[8px] flex items-center gap-2"
                  >
                    <span>Date</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M39.8571 7.14286V6H41V7.14286H44.4286V6H45.5714V7.14286H47.8571C48.1727 7.14286 48.4286 7.3987 48.4286 7.71429V10.5714H47.2857V8.28571H45.5714V9.42857H44.4286V8.28571H41V9.42857H39.8571V8.28571H38.1429V16.2857H41.5714V17.4286H37.5714C37.2558 17.4286 37 17.1727 37 16.8571V7.71429C37 7.3987 37.2558 7.14286 37.5714 7.14286H39.8571Z" fill="#9E9E9E"/>
                    </svg>
                  </button>
                </div>
              </div>
            </main>
            <footer>
              <div className="flex h-[45px] justify-between items-center shadow-[0px_-1px_3px_0px_rgba(0,0,0,0.25)] absolute w-full box-border bg-neutral-100 pt-[9px] pb-2 px-6 border-t-[rgba(158,158,158,0.40)] border-t border-solid left-0 bottom-0 max-sm:pt-[9px] max-sm:pb-2 max-sm:px-4">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="text-[#555] text-[10px] font-medium h-7 rounded border p-2.5 border-solid border-[#555] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white text-[10px] font-medium h-7 rounded bg-black p-2.5 hover:bg-gray-900"
                >
                  Create Poll
                </button>
              </div>
            </footer>
          </form>
        </section>
      ) : (
        <section className="text-center">
          <p className="text-gray-600 mb-4">Create and manage polls with ease</p>
          <button
            onClick={() => setShowPollCreator(true)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
            aria-label="Create new poll"
          >
            Create New Poll
          </button>
          {polls.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Your Polls</h2>
              <div className="space-y-4">
                {polls.map((poll, index) => (
                  <article
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto"
                  >
                    <h3 className="font-medium text-lg mb-2">{poll.question}</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {poll.options.map((option, optIndex) => (
                        <li key={optIndex}>{option.text}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-500 mt-2">
                      {poll.allowMultipleAnswers ? 'Multiple answers allowed' : 'Single answer only'}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}