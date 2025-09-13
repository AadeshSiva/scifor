import React from 'react';
interface SidebarProps {
  userName: string;
}
export const Sidebar: React.FC<SidebarProps> = ({ userName }) => {
  return (
    <nav className="flex flex-col h-full text-xl text-black font-semibold bg-neutral-100 overflow-hidden">
      <div className="flex items-center gap-2.5 pl-6 pr-2.5 py-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/9423a9cec9d13b5b154d9c0c6904e0dc617b6ae5?placeholderIfAbsent=true"
          alt="User avatar"
          className="aspect-[1] object-contain w-8 shrink-0 rounded-[50%]"
        />
        <div>
          Welcome {userName} 👋
        </div>
      </div>
      <div className="bg-white flex items-center gap-[7px] px-6 py-3.5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/60755bcb802b09767a2545870d77e77b69c19046?placeholderIfAbsent=true"
          alt="Chat icon"
          className="aspect-[1] object-contain w-6 shrink-0"
        />
        <div className="grow">
          Anonymous Group Chat
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {Array(10).fill(null).map((_, index) => (
          <div key={index} className="bg-neutral-100 flex items-center gap-2.5 pl-6 pr-2.5 py-3.5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/314922202740eafaa2e58e27e387fcecfb9e9c69?placeholderIfAbsent=true"
              alt="Menu item icon"
              className="aspect-[0.75] object-contain w-[18px] shrink-0"
            />
            <div>
              {index === 0 ? 'Exit Wealth Calculator' : 
              index === 1 ? 'Item Title (coming soon)' : 
              'Item Title'}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="flex items-center gap-3 font-normal whitespace-nowrap pl-6 py-3">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/d38e9da07ffa3f59d30db3530ebd18677e54ca24?placeholderIfAbsent=true"
            alt="Home icon"
            className="aspect-[1] object-contain w-6 shrink-0"
          />
          <div>Home</div>
        </div>
        <div className="flex items-center gap-[7px] whitespace-nowrap pl-6 py-3.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/9a9a9175193c7b712664e43f419a6b7636f26735?placeholderIfAbsent=true"
            alt="Settings icon"
            className="aspect-[1] object-contain w-6 shrink-0"
          />
          <div>Settings</div>
        </div>
      </div>
    </nav>
  );
};